import React from 'React';
import Header from './Header/Header';
import Player from "../Page/Player";
import {data} from "../Config/Data";
import MusicList from "../Page/MusicList";
import url from "url";
import {BrowserRouter as Router,Route,Link,Switch} from "react-router-dom";

class App extends React.Component{
    constructor(props) {

        super(props);

        this.state = {
            CurrentItem:0,
            data:data.list,
        };


    } 
    //选择项目
    OnItemChange(id){

        this.setState(
            Object.assign({},this.state,{CurrentItem:id})
       );
      
    }
    //删除项目
    OnItemRemove(id){
        console.log("删除ID:"+id);
    }

    shouldComponentUpdate(preState,nextState){
        console.log("更新:",nextState)
        return true;
    }


    componentWillUnmount(){
        $("#player").unbind($.jPlayer.event.timeupdate);
    }

    componentDidMount(){
        //初始化jplayer
        var state = this.state;
        let playObj = {};
        let media = state.data[state.CurrentItem];
        let supportType = "mp3";
        if(media == undefined){
            alert("该链接不存在!");
            return false;
        }
        if(media.type != undefined){
            playObj["mp3"] = media.url;
        }
        //播放
         $("#player").jPlayer({
                ready:function(){
                    if(state.CurrentItem==1){
  
                        $(this).jPlayer("stop");
                        return false;
                    }
                    
                    $(this).jPlayer("setMedia",playObj).jPlayer("play");
                },
                supplied:supportType,
                wmode:"window",
        });
        
        
    }

    render(){
        const {CurrentItem,data} = this.state;
        return (
            <div>
                <Header />
                 <Router>
                 <div>
                    <Switch>
                    <Route path="/List" render={()=>{
                         return (
                            <MusicList 
                                OnItemChange={(index)=>{this.OnItemChange(index)}} 
                                OnItemRemove = {(index)=>{this.OnItemRemove(index)}}
                                DataContainer={data} 
                                CurrentItem={CurrentItem}      
                            />
                         );
                    }} /> 
                     <Route  path="/" render={()=>{
                        return (
                            <Player data={data[CurrentItem]}></Player>
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