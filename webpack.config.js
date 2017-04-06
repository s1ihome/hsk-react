var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');

var staticPath = 'assets';
var config = {
    devtool: 'eval-source-map',
    entry: [
        'webpack-hot-middleware/client?reload=true',
        './app/Main'
    ],
    output: {
        path: path.join(__dirname, staticPath),
        filename: "js/bundle.[hash].js",
        publicPath: '/',
        chunkFilename: '[name].[chunkhash].js',
    },
    resolve: {
        extensions: ['', '.js', '.jsx', 'less']
    },
    module: {
        loaders: [
            {
              test: /\.js?$/,
              exclude: /node_modules/,
              loader: 'babel',
              query: {
                "presets": ["react", "es2015", "stage-0", "react-hmre" ],
                 "plugins": [
                     "transform-decorators-legacy",
                     "syntax-async-functions",
                     ["import", {"libraryName": "antd", "style": true,}]
                 ]
              }
            },
            {
              test: /\.css$/,
              loaders: ['style','css']
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: ['url?limit=8192&name=imgs/[hash:8].[ext]']
            }
        ]
    },
    postcss: function() {
        return [px2rem({remUnit: 75})];
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new HtmlWebpackPlugin({
             filename:'./index.html',
             template:'./app/index.html',
             inject: 'body',
             hash: false,
             minify:{
                 removeComments:false,
                 collapseWhitespace:false
             }
         })
    ]
}


module.exports = config
