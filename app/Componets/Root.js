import React from 'React';
import Header from './Header/Header';
import Progress from './Progress/Progress';
class Root extends React.Component{


    constructor(props) {

        super(props);

        this.state = {
            player:{
                media:"/media/周杰伦 - 等你下课 (with 杨瑞代).flac",
                progress:{
                    current:'0',
                    duration:'0',
                    percent:'0'
                }
            }
        };

    } 


    componentWillUnmount(){
        $("#player").unbind($.jPlayer.event.timeupdate);
    }

    componentDidMount(){
        //初始化jplayer
        var state = this.state;
        $("#player").jPlayer({
            ready:function(){
                $(this).jPlayer("setMedia",{
                    mp3:state.player.media,
                    flac:state.player.media
                }).jPlayer("play");
            },
            supplied:"mp3,flac",
            wmode:"window",
        });
        $("#player").bind($.jPlayer.event.timeupdate,(e)=>{
            var jPlayer = e.jPlayer
            var now = Math.round(jPlayer.status.currentTime);
            var long = Math.round(jPlayer.status.duration);
            var percent = Math.round(jPlayer.status.currentPercentAbsolute);
      
            this.setState({
                player:Object.assign(this.state.player,{
                    progress:{
                        current:now,
                        duration:long,
                        percent:percent
                    } 
                })
            });

           // 
        });
    }

    render(){
        return (
            <div>
                <Header />
                <Progress info={this.state.player} progress={this.state.player.progress.percent}  />
            </div>
            
        );
    }

}

export default Root;