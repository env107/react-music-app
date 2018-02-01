import React from 'React';
import Header from './Header/Header';
import Player from "../Page/Player";
import {data} from "../Config/Data";
import MusicList from "../Page/MusicList";
import url from "url";
import {BrowserRouter as Router,Route,Link,Switch} from "react-router-dom";
import Pubsub from "pubsub-js";
class App extends React.Component{
    constructor(props) {

        super(props);

        this.state = {
            CurrentItem:data.list[0],
            data:data.list,
            mode:"loop"
        };


    } 
    //播放音乐
    playMusic(item){
        const {url} = item;
        $("#player").jPlayer("setMedia",{mp3:url}).jPlayer("play");
    }
    //打乱数组
    boomArray(arr){
        let newArr = arr;
        newArr.sort(function(){ return 0.5 - Math.random() });
        return newArr;
    }

    shouldComponentUpdate(preState,nextState){
        console.log(nextState);
        return true;
    }

    componentWillUnmount(){
        $("#player").unbind($.jPlayer.event.timeupdate);
        Pubsub.unsubscribe("PLAY_MUSIC");
        Pubsub.unsubscribe("DELETE_MUSIC");
        Pubsub.unsubscribe("CHANGE_MODE");
    }

    componentDidMount(){
        //初始化jplayer
        var {CurrentItem} = this.state;
        var that = this;
         $("#player").jPlayer({
                supplied:"mp3",
                wmode:"window",
                volume:"100"
        });
        if(CurrentItem.url == undefined){
            alert("该链接不存在!");
            return false;
        }
        //事件监听
        Pubsub.subscribe("PLAY_MUSIC",(msg,item)=>{
        
            if(item.url == undefined){
                alert("该链接不存在!");
                return false;
            }
            that.setState(Object.assign({},that.state,{CurrentItem:item}));
            that.playMusic(item);
        });
        Pubsub.subscribe("DELETE_MUSIC",(msg,item)=>{
            if(CurrentItem === item){
                alert("当前正在播放，无法删除!");
                return false;
            }
            that.setState(Object.assign({},that.state,{data:that.state.data.filter(filterItem=>{
                return filterItem !== item;
            })}));
            
        });
        Pubsub.subscribe("CHANGE_MODE",(msg,mode)=>{
            let modes = ["loop","queue","random"];
            let modeIndex = modes.indexOf(mode);
            let nowData = this.state.data;
    
            if(modeIndex == -1){
                return false;
                console.warn("无效播放模式");
            }
            if(++modeIndex >= modes.length){
                mode = modes[0];
            }else{
                mode = modes[modeIndex];
            }
            switch(mode){
                case "loop":
                case "queue":{
                     this.setState(Object.assign({},this.state,{
                         data:nowData
                     }))
                    break;   
                }
                case "random":{
                    this.setState(Object.assign({},this.state,{
                        data:this.boomArray(nowData)
                    }));
                    break;
                }
                
            }
            that.setState(Object.assign({},that.state,{mode}));
            
        });
        that.playMusic(CurrentItem);
        
        
    }

    render(){
        const {CurrentItem,data,mode} = this.state;
        return (
            <div>
                <Header />
                 <Router>
                 <div>
                    <Switch>
                    <Route path="/List" render={()=>{
                         return (
                            <MusicList 
                                DataContainer={data} 
                                CurrentItem={CurrentItem}      
                            />
                         );
                    }} /> 
                     <Route  path="/" render={()=>{
                        return (
                            <Player data={CurrentItem} mode={mode}></Player>
                        );
                    }} /> 
                  
                    </Switch>
                    </div>
                    </Router>
              
            </div>
            
        );
    }
}


class Root extends React.Component{

    render(){
        return (
           
                <div>   
                   <App />
                </div>
            
            
        );
    }

}

export default Root;