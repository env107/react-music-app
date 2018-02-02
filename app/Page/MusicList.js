import React from "react";
import "./MusicList.less";
import MusicItem from "../Components/MusicItem/MusicItem";
import {Link} from "react-router-dom";
class MusicList extends React.Component{

    constructor(props){
        super(props);
    }

    render(){

        const {CurrentItem,DataContainer} = this.props;
        const data = DataContainer.map((item,index)=>{
            
            return (
                    <Link to="/" key={index} >
                    <MusicItem 
                        Index={index} 
                        Item={item} 
                        Active={CurrentItem === item} 
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