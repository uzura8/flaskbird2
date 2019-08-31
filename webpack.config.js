'use strict';
const webpack = require('webpack');
const path = require('path');
const root = path.join(__dirname, './');

const nodeExternals = require('webpack-node-externals')
//const HtmlWebPackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = [
  {
    entry: {
      app: './src/server/app.js',
    },
    output: {
      path: path.join(__dirname, 'server'),
      publicPath: '/',
      filename: '[name].js'
    },
    target: 'node',
    node: {
      // Need this when working with express, otherwise the build fails
      __dirname: false,   // if you don't put this is, __dirname
      __filename: false,  // and __filename return blank or /
    },
    externals: [nodeExternals()], // Need this to avoid error when working with Express
    module: {
      rules: [
        {
          // Transpiles ES6-8 into ES5
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          // Loads the javacript into html template provided.
          // Entry point is set below in HtmlWebPackPlugin in Plugins
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              //options: { minimize: true }
            }
          ]
        }
      ]
    },
    plugins: [
      //new HtmlWebPackPlugin({
      //  template: './src/server/views/index.html',
      //  filename: './views/index.html',
      //  excludeChunks: [ 'app' ]
      //})
    ]
  },
  {
    devtool: 'source-map',
    entry: {
      index: path.join(root, 'src/client/js/index.js')
    },
    output: {
      path: path.join(root, 'public/assets/js'),
      filename: '[name].js'
    },
    optimization: {
      //splitChunks: {
      //  name: 'vendor',
      //  chunks: 'initial'
      //},
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
              loader: 'vue-loader'
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
          test: /\.css$/,
          use: [
            'style-loader',
            {loader: 'css-loader', options: {url: false}}
          ],
        }
      ]
    },
    resolve: {
      modules: [
        path.join(root, '/src/client'),
        'node_modules'
      ],
      extensions: ['*', '.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        'vue-router$': 'vue-router/dist/vue-router.esm.js'
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
      style: path.join(root, 'src/client/scss/style.scss')
    },
    output: {
      path: path.join(root, 'public/assets/css'),
      filename: '[name].css'
    },
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            // Output as css file not included js
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                url: false,
                //minimize: true,
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',// Setting for PostCSS
              options: {
                plugins: (loader) => [
                  // Enable Autoprefixer
                  // Add vendor prefix
                  require('autoprefixer')({
                    grid: true, // use CSS Grid Layout
                    //browsers: ['Android >= 4.4', "IE 11"],
                  })
                ],
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                outputStyle: 'compressed',
                sourceMap: true
              }
            },
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        // prefix is output.path
        filename: '[name].min.css'
      })
    ]
  }
];
