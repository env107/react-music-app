import React from 'React';
import './Progress.less';


class Progress extends React.Component{

    constructor(props) {

        super(props);

   
        this.progressBarChange = this.progressBarChange.bind(this);
    } 

    //进度更改
    progressBarChange(e){
     
        let progressBar = this.progressBar;
        //计算进度
         let progress = parseFloat(((e.clientX - this.getBodyLeft(progressBar)) / progressBar.clientWidth)).toFixed(2);
     
         this.props.UpdateProgress && this.props.UpdateProgress(progress);
    }
    //获取某元素离body左边的距离
     getBodyLeft(obj) { 
        var l = obj.offsetLeft; 

        while (obj = obj.offsetParent) {
            l += obj.offsetLeft; 
        }
        return l;
    }


    render(){
        return (
            <div className="progress-Component" ref={(progressBar)=>{this.progressBar=progressBar}} onClick={this.progressBarChange} >
                <div className="progressBar"    >
                    <div className="progress" style={{width:`${this.props.progress}%`,background:`${this.props.color}`}} ></div>
                </div>
            </div>
        );
    }

}

export default Progress;