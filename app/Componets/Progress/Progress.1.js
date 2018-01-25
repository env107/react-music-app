import React from 'React';
import './Progress.less';

class Progress extends React.Component{

    constructor(props) {

        super(props);

        console.log(props);

    } 

    render(){
        return (
            <div className={'prorgress-Component'}>
                <div className={'progress-media-name'}>媒体位置:{this.props.info.media}</div>
                <div className={'progress-media-progress'}>播放进度:{this.props.info.progress.current}s/{this.props.info.progress.duration}s({this.props.info.progress.percent}%)</div>
                
                <div className="progress"></div>
            </div>
        );
    }

}

export default Progress;