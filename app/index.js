import React from 'react';
import {render} from 'react-dom';
import './index.less';
import Root from './Componets/Root';
import {AppContainer} from 'react-hot-loader';

render(
    <AppContainer>
    <Root />
    </AppContainer>
    ,
    document.getElementById("container"));
    
//实现浏览器不刷新
if(module.hot){
    module.hot.accept("./Componets/Root",()=>{
        const Root = require("./Componets/Root").default;
        render(
            <AppContainer>
            <Root />
            </AppContainer>
            ,
            document.getElementById("container"));
    });
}

console.log(React.version);