import React from 'React';
import './Header.less';

class Header extends React.Component{


    render(){
        return (
            <div className={'header-Component'}>
                <img src="/static/images/logo.png" className={'logo-img'} />
                <div className={'header-title'}>React 音乐播放器</div>
            </div>
        );
    }

}

export default Header;