import React from "react";
import "./MusicList.less";
import MusicItem from "../Components/MusicItem/MusicItem";
import {Link} from "react-router-dom";
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
                    <Link to="/" key={index} >
                    <MusicItem 
                        OnItemSelect={(index)=>this.OnItemChange(index)} 
                        OnItemRemove={(index)=>this.OnItemRemove(index)} 
                        Index={index} 
                        Item={item} 
                        Active={CurrentItem === index} 
                     />
                     </Link>
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