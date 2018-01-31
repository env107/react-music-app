import React from "react";
import "./MusicItem.less";
import Pubsub from "pubsub-js";
class MusicItem extends React.Component{

    

    OnItemSelect(item,e){
       e.stopPropagation();
       e.preventDefault();
       Pubsub.publish("PLAY_MUSIC",item);
    }

    OnItemRemove(item,e){
        e.stopPropagation();
        e.preventDefault();
        Pubsub.publish("DELETE_MUSIC",item);
    }

    render(){
        const {Item,Active,Index} = this.props; 
        return (
                <li className={`music-list-item ${Active?'music-list-item-active':''}`}>
                    <div className="item-text"  onClick={(e)=>this.OnItemSelect(Item,e)} >
                    {Item.title} - {Item.art}
                    </div>
                    <div className="item-control">
                        <div onClick={(e)=>this.OnItemRemove(Item,e)} className="item-delete-button">x</div>
                    </div>
                </li>
        );
    }

}

export default MusicItem;