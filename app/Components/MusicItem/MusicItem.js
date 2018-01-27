import React from "react";
import "./MusicItem.less";

class MusicItem extends React.Component{


    OnItemSelect(itemid){
        typeof(this.props.OnItemSelect)=="function" && this.props.OnItemSelect(itemid);
    }

    OnItemRemove(itemid){
        typeof(this.props.OnItemRemove)=="function" && this.props.OnItemRemove(itemid);
    }

    render(){
        const {Item,Active,Index} = this.props; 
        return (
                <li className={`music-list-item ${Active?'music-list-item-active':''}`}>
                    <div className="item-text"  onClick={()=>this.OnItemSelect(Index)} >
                    {Item.title} - {Item.art}
                    </div>
                    <div className="item-control">
                        <div onClick={()=>this.OnItemRemove(Index)} className="item-delete-button">x</div>
                    </div>
                </li>
        );
    }

}

export default MusicItem;