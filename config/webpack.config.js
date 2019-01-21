const path = require('path');
const SpritesmithPlugin = require('webpack-spritesmith');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.export = {
  mode: 'production',
  entry: './src/sprite_webpack.html',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /png$/,
        loader:[
          'file-loader?name=i/[hash].[ext]'
        ]
      },
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader']
        })
      }
    ]
  },

  resolve: {
      modules: [
        'node_modules',
        'src/img/sprite' //css在哪里能找到sprite图
      ]
  },

  plugins: [
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, 'src/img/sprite'),  //准备合并成sprit的图片存放文件夹
        glob: '*.png'  //哪类图片
      },
      target: {
        image: path.resolve(__dirname, 'src/assets/sprites.png'),  // sprite图片保存路径
        css: path.resolve(__dirname, 'src/assets/_sprites.scss')  // 生成的sass保存在哪里
      },
      apiOptions: {
        cssImageRef: "~sprite.png" //css根据该指引找到sprite图
      }
    })
  ]
}