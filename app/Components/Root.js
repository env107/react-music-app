import React from 'React';
import Header from './Header/Header';
import Player from "../Page/player";
import {data} from "../Config/Data";
class Root extends React.Component{


    constructor(props) {

        super(props);

        this.state = {
            player:{
                media:data.list[0].url,
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
        
    }

    render(){
        return (
            <div>
                <Header />
                <Player data={data.list[0]}></Player>
            </div>
            
        );
    }

}

export default Root;