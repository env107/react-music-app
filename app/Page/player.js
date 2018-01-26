import React,{Component} from "react";
import Progress from '../Components/Progress/Progress';
import "./player.less";
class Player extends Component{

    constructor(props){
        super(props);
        
        this.state = {
            isPlay:true,
            playerState:{},
            data:this.props.data
        };

        
    }
    //更新控件进度
    updateProgress(value){
        if(this.state.isPlay){
           this.play(value)
        }
       
    }
    //音量更新
    updateVolume(value){
        $("#player").jPlayer("volume",value);
    }
    //按钮
    ControlHandler(e){
        var control = $(e.target).data("control");
        if(control == "status"){
            if(this.state.isPlay){
                this.pause();
            }else{
                this.play();
            }   
        }
    }
    //播放
    play(progress){
        var duration = this.state.playerState.duration;
        if(progress == undefined){
            $("#player").jPlayer("play");
        }else{
            $("#player").jPlayer("play",progress*duration);
        }
        
        this.setState(Object.assign({},this.state,{isPlay:true}));
    }
    //暂停
    pause(){
        $("#player").jPlayer("pause");
        this.setState(Object.assign({},this.state,{isPlay:false}));
    }

    componentDidMount(){
        //监听播放事件变更状态
        $("#player").bind($.jPlayer.event.timeupdate,(e)=>{
            var jPlayer = e.jPlayer
            var now = Math.round(jPlayer.status.currentTime);
            var long = Math.round(jPlayer.status.duration);
            var percent = Math.round(jPlayer.status.currentPercentAbsolute);
            var volume = jPlayer.options.volume*100;
           // console.log(jPlayer);
           if(jPlayer.status.ended){
               setTimeout(function(){
                   this.play(0);
               }.bind(this),1000)
               
           }
            this.setState({
                playerState:Object.assign({},this.state.playerState,
                {
                        current:now,
                        duration:long,
                        percent:percent,
                        volume:volume
                })
            });
        });
    }

    formatMusicTime(duration){
        var theTime = parseInt(duration);// 秒
        var theTime1 = 0;// 分
        if(theTime > 60) {
            theTime1 = parseInt(theTime/60);
            theTime = parseInt(theTime%60);
                if(theTime1 > 60) {
                theTime1 = parseInt(theTime1%60);
                }
        }
            var result = ""+this.getFullNumber(parseInt(theTime));
        
            result = ""+this.getFullNumber(parseInt(theTime1))+":"+result;
          

        return result;
    }

    getFullNumber(number){
        return number<10?"0"+number:number;
    }


    render(){

        const {mid,cover,title,art,desc,url,type} = this.state.data;
        const {playerState,isPlay} = this.state;
        let music_duration = this.formatMusicTime(playerState.duration);
        let music_current = this.formatMusicTime(playerState.current);
    
        return (
            <div className="Player-Page">
                <div className="Player-Panel">
                    <div className="Cover-Box">
                        <img src={cover} alt={title} className="CoverImage" />
                    </div>
                    <div className="Info-Box">
                        <div className="info-title">
                            <div className="info-title-text">{title} - {art} </div>
                            <div className="info-time-text">{music_current}/{music_duration}</div>
                        </div>
                        <div className="info-progress">
                            <Progress color="red" UpdateProgress={(value)=>this.updateProgress(value)} progress={playerState.percent}  />
                        </div>
                        <div className="info-control">
                            <div className="control-button-group">
                                <i className="control-button prev"></i>
                                <i className={"control-button " + (isPlay?"play":"pause")} data-control="status" onClick={(e)=>this.ControlHandler(e)}></i>
                                <i className="control-button next"></i>
                            </div>
                            <div className="control-volume-control">
                                <i className="control-button volume"></i>
                                <div className="control-volume">
                                    <Progress color="#aaa" UpdateProgress={(value)=>this.updateVolume(value)} progress={playerState.volume}  />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
           
            </div>
        );
    }

}

export default Player;