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
            CurrentItem:data.list[0],   //当前播放项目
            data:data.list, //数据列表
            playlist:data.list, //播放列表
            mode:"queue" //播放模式
        };


    } 
    //播放音乐
    playMusic(item){
        const {url} = item;
        $("#player").jPlayer("setMedia",{mp3:url}).jPlayer("play");
        this.setState(Object.assign({},this.state,{CurrentItem:item}));
    }
    //打乱数组
    boomArray(arr){
        let newArr = this.cloneArray(arr);
        newArr.sort(function(){ return 0.5 - Math.random() });
        return newArr;
    }

    //克隆数组
    cloneArray(arr){
        let newArr = [];
        for(var i = 0,len = arr.length;i<len;i++){
            newArr[i] = arr[i];
        }
        
        return newArr;
    }

    shouldComponentUpdate(preState,nextState){
        return true;
    }

    componentWillUnmount(){
        $("#player").unbind($.jPlayer.event.timeupdate);
        $("#player").unbind($.jPlayer.event.ended);
        Pubsub.unsubscribe("PLAY_MUSIC");
        Pubsub.unsubscribe("DELETE_MUSIC");
        Pubsub.unsubscribe("CHANGE_MODE");
        Pubsub.unsubscribe("CHANGE_MUSIC");  
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
        $("#player").bind($.jPlayer.event.ended,(e)=>{
            Pubsub.publish("CHANGE_MUSIC");
        });
        if(CurrentItem.url == undefined){
            alert("该链接不存在!");
            return false;
        }
        //播放音乐
        Pubsub.subscribe("PLAY_MUSIC",(msg,item)=>{
        
            if(item.url == undefined){
                alert("该链接不存在!");
                return false;
            }
            that.setState(Object.assign({},that.state,{CurrentItem:item}));
            that.playMusic(item);
        });
        //删除音乐
        Pubsub.subscribe("DELETE_MUSIC",(msg,item)=>{
            CurrentItem = this.state.CurrentItem;
            if(CurrentItem === item){
                alert("当前正在播放，无法删除!");
                return false;
            }
            that.setState(Object.assign({},that.state,{
                data:that.state.data.filter(filterItem=>{
                    return filterItem !== item;
                }),
                playlist:that.state.playlist.filter(filterItem=>{
                    return filterItem !== item;
                })}
            ));
            
        });
        //改变播放模式
        Pubsub.subscribe("CHANGE_MODE",(msg,mode)=>{
            let modes = ["loop","queue","random"];
            let modeIndex = modes.indexOf(mode);
            let nowData = this.state.data;
            if(modeIndex == -1){
                console.warn("无效播放模式");
                return false;
            }
            if(++modeIndex >= modes.length){
                mode = modes[0];
            }else{
                mode = modes[modeIndex];
            }
            switch(mode){
                case "loop":{
                    this.setState(Object.assign({},this.state,{
                         playlist:nowData
                     }))
                    break;
                }
                case "queue":{
                     this.setState(Object.assign({},this.state,{
                         playlist:nowData
                     }))
                    break;   
                }
                case "random":{
                    this.setState(Object.assign({},this.state,{
                        playlist:this.boomArray(nowData)
                    }));
                    break;
                }
                
            }
            that.setState(Object.assign({},that.state,{mode}));
            
        });
        //更改音乐
        Pubsub.subscribe("CHANGE_MUSIC",(msg,type = "next")=>{
            let index = 0;
            let {CurrentItem,data,mode,playlist} = this.state;
            let nextCurrentItem = null;
            let nextIndex = 0;
            if(mode == "loop"){
                nextCurrentItem = CurrentItem;
            }else if(mode == "queue" || mode == "random"){
                playlist.map((item,key)=>{
                    if(item === CurrentItem){
                        index = key;
                    }
                });
                if(playlist.length < 1){
                    return false;
                }
                if(type == "next"){
                    nextIndex = (index + 1) % playlist.length;
                }else if(type == "prev"){
                    nextIndex = (index - 1 + playlist.length) % playlist.length; 
                }
       
                nextCurrentItem = playlist[nextIndex];
            }

            
            that.playMusic(nextCurrentItem);
        });
        that.playMusic(CurrentItem);
        
        
    }

    render(){
        return (
            <div>
                <Header />
                 <Router>
                 <div>
                    <Switch>
                    <Route path="/List" render={()=>{
                         return (
                            <MusicList 
                                DataContainer={this.state.data} 
                                CurrentItem={this.state.CurrentItem}      
                            />
                         );
                    }} /> 
                     <Route  path="/" render={()=>{
                        return (
                            <Player data={this.state.CurrentItem} mode={this.state.mode}></Player>
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