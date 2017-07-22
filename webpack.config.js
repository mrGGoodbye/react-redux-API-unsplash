const path = require('path');
var webpack = require('webpack'); /*new*/

module.exports = {
    //entry: './src/index.js',


    entry:
    //{
      [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './src/index'
      ]
      //app:["./index.js"]

    // app:["./src/index.js"]

    // bundle: [
    //         "webpack/hot/dev-server",
    //         (`${__dirname}/src/index.js`)
    //   ]
    //}
    ,
    output: {
      path:  path.resolve( __dirname, 'build'),
      publicPath: "/",
      filename: 'my_build.js'

    },

    module:{
      rules: [
        {
          test: /\.js$/,
          use: ['babel-loader']
        }
      ]
    },
    // плагин для Remote DevTool redux
    // plugins: [
    //     new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('development')})
    // ]
};
