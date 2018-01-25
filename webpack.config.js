var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {

    entry:[
        'react-hot-loader/patch',
        path.join(__dirname,'./app/index.js')
    ],
    output:{
        path:__dirname+"/dist",
        filename:"bundle.js",
   
    },
    devServer:{
        contentBase:"./",
        historyApiFallback:true,
        inline:true
    },
    module:{
        loaders:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loader:"babel-loader",
                query:{
                    presets:['react','env']
                }
            },
            {
                test:/\.css$/,
                loader:"style!css"
            },
            {
                test:/\.less/,
                loader:"style-loader!css-loader!less-loader"
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:"./index.tpl.html",
            inject:"body",
            filename:"./index.html",
            showErrors:true
        })
    ]

};