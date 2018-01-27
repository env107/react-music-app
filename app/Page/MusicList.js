import React from "react";
import "./MusicList.less";
import MusicItem from "../Components/MusicItem/MusicItem";

class MusicList extends React.Component{

    constructor(props){
        super(props);
    }

    OnItemChange(itemid){
        typeof(this.props.OnItemChange)=="function" && this.props.OnItemChange(itemid);
    }

    OnItemRemove(itemid){
        typeof(this.props.OnItemRemove)=="function" && this.props.OnItemRemove(itemid);
    }

    render(){

        const {CurrentItem,DataContainer} = this.props;
        const data = DataContainer.map((item,index)=>{
            
            return (
                    <MusicItem 
                        OnItemSelect={(index)=>this.OnItemChange(index)} 
                        OnItemRemove={(index)=>this.OnItemRemove(index)} 
                        Index={index} 
                        key={index} 
                        Item={item} 
                        Active={CurrentItem === index} 
                     />
            );
        });

        return (
            <ul>
                {data}
            </ul>
        );
    }

}

export default MusicList;