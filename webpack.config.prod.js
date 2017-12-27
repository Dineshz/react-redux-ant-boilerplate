const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const LessToJs = require("less-vars-to-js");
const fs = require("fs");
const babelLoaderOptions = JSON.parse(fs.readFileSync(".babelrc"));
const CleanWebpackPlugin = require("clean-webpack-plugin");
const themeVariables = LessToJs(
  fs.readFileSync(
    path.join(__dirname, "./client/assets/less/ant-theme.less"), "utf8"
  )
);
const publicPath = "/";
//Webpack Plugins
babelLoaderOptions.plugins.push(
  ["import", {"libraryName": "antd", "style": true}]
);
let HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: "./client/index.html",
  filename: "index.html",
  inject: "body"
});
let UglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
  mangle: true,
  compress: {
    "warnings": false,
    "pure_getters": true,
    "unsafe": true,
    "unsafe_comps": true,
    "screw_ie8": true
  },
  output: {
    comments: false,
  },
  exclude: [/\.min\.js$/gi]
});
let production = new webpack.DefinePlugin({
  "process.env": {
    "NODE_ENV": JSON.stringify("production")
  }
});
let cssminify = new OptimizeCssAssetsPlugin({
  assetNameRegExp: /\.min\.css$/,
  cssProcessorOptions: {discardComments: {removeAll: true}}
});
let favicons = new FaviconsWebpackPlugin({
  logo: "./client/assets/images/favicon.png",
  emitStats: false,
  persistentCache: true,
  icons: {
    android: false,
    appleIcon: false,
    appleStartup: false,
    coast: false,
    favicons: true,
    firefox: false,
    opengraph: false,
    twitter: false,
    yandex: false,
    windows: false
  }
});

module.exports = {
  entry: ["./client/index.js"],
  output: {
    path: path.resolve(__dirname, "public"),
    publicPath,
    filename: "bundle.js"
  },
  plugins: [
    new CleanWebpackPlugin(["public"], {verbose: true}),
    HtmlWebpackPluginConfig,
    production,
    favicons,
    cssminify,
    new ExtractTextPlugin("bundle.min.css"),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.NoEmitOnErrorsPlugin(),
    UglifyJsPlugin,
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules(?!\/webpack-dev-server)/,
        loaders: [{
          loader: "babel-loader",
          options: babelLoaderOptions,
        }]
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            "css-loader",
            {
              loader: "less-loader",
              options: {
                modifyVars: themeVariables
              }
            }
          ]
        })
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              query: {
                hash: "sha512",
                digest: "hex",
                name: "[hash].[ext]"
              }
            }
          },
          {
            loader: "image-webpack-loader",
            options: {
              query: {
                optimizationLevel: 7,
                interlaced: false
              }
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader!sass-loader"
        })
      }
    ]
  },
  node: {
    fs: "empty"
  },
  devServer: {
    open: true,
    port: 8088,
    proxy: [
      {
        context: ["/api", "/auth"],
        target: "http://localhost:3000",
        secure: false
      }
    ],
    publicPath,
    disableHostCheck: true,
    historyApiFallback: {
      index: "/index.html"
    },
    stats: {colors: true}
  },
  stats: {
    colors: true,
    errors: true,
    errorDetails: true,
  }
};
