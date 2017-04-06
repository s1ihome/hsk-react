var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');
//cannot  ExtractTextPlugin
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var staticPath = 'assets';

var node_env = process.env.NODE_ENV

var bool_env = node_env == 'production' ? true : false;

var config = {
    devtool: false,  // or false
    entry: [
        './app/Main'
    ],
    output: {
        path: path.join(__dirname, staticPath),
        publicPath: '/' + staticPath +'/',
        filename: "js/[chunkhash].js",
        chunkFilename: 'chunk/[name].[chunkhash].js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx', 'sass']
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                  "presets": ["react", "es2015", "stage-0"],
                  "plugins": [
                      "transform-decorators-legacy",
                      "syntax-async-functions",
                  ]
                }
            },
            {
                test: /\.css$/,
                loaders: ['style','css']
                //loader: ExtractTextPlugin.extract('style!css', 'css-loader!')
            }, {
                test: /\.sass$/,
                loader: ExtractTextPlugin.extract('css!sass?indentedSyntax')
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: ['url?limit=8192&name=imgs/[hash:8].[ext]']
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('css/[chunkhash].css'),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(node_env)
        }),
        new webpack.optimize.UglifyJsPlugin({
            output: {
               comments: false,  // remove all comments
            },
            compressor: {
                warnings: false,
                drop_console: true
            }
        }),
        new HtmlWebpackPlugin({
             filename:'../view/index.html',    //生成的html存放路径，相对于path
             template:'./app/index.html',    //html模板路径
             inject: 'body',
             hash: false,
             minify:{
                 removeComments: bool_env,    //移除HTML中的注释
                 collapseWhitespace: bool_env    //删除空白符与换行符
             }
         })
    ]
}

module.exports = config
