'use strict';
const webpack = require('webpack');
const path = require('path');
const root = path.join(__dirname, '../');

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const cssLoaderConfig = require('./css-loader-config');
const postcssLoaderConfig = require('./postcss-loader-config');
const sassLoaderConfig = require('./sass-loader-config');

module.exports = [
  {
    devtool: 'source-map',
    entry: {
      index: path.join(root, 'src/client/js/index.js'),
    },
    output: {
      path: path.join(root, 'app/statics/js'),
      filename: '[name].js'
    },
    optimization: {
      splitChunks: {
        name: 'vendor',
        chunks: 'initial'
      },
      minimizer: [
        new TerserPlugin()
      ],
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: [
            {
              loader: 'vue-loader',
              options: {
                loaders: {
                  scss: [
                    'vue-style-loader',
                    cssLoaderConfig,
                    postcssLoaderConfig,
                    sassLoaderConfig,
                  ],
                }
              }
            }
          ]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            },
          ]
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            'style-loader',
            cssLoaderConfig,
            postcssLoaderConfig,
            sassLoaderConfig,
          ],
        },
      ]
    },
    resolve: {
      modules: [
        path.join(root, '/src/client'),
        'node_modules'
      ],
      extensions: ['*', '.js', '.vue', '.json'],
      alias: {
        '@': path.join(root, 'src/client/js'),
        'vue$': 'vue/dist/vue.esm.js',
        'vue-router$': 'vue-router/dist/vue-router.esm.js',
      }
    },
    plugins: [
      new VueLoaderPlugin(),
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
  },
  {
    devtool: 'source-map',
    entry: {
      style: path.join(root, 'src/client/scss/style.scss'),
    },
    output: {
      path: path.join(root, 'app/statics/css'),
      filename: '[name].css'
    },
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            cssLoaderConfig,
            postcssLoaderConfig,
            sassLoaderConfig,
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].min.css'
      })
    ]
  },
  {
    devtool: 'source-map',
    entry: {
      style2: path.join(root, 'src/client/styl/style2.styl'),
    },
    output: {
      path: path.join(root, 'app/statics/css'),
      filename: '[name].css'
    },
    module: {
      rules: [
        {
          test: /\.styl$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            cssLoaderConfig,
            postcssLoaderConfig,
            'stylus-loader',
          ]
        },
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].min.css'
      })
    ]
  }
];
