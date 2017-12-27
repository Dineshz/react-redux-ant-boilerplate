const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const LessToJs = require("less-vars-to-js");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const fs = require("fs");
const babelLoaderOptions = JSON.parse(fs.readFileSync(".babelrc"));
const themeVariables = LessToJs(
  fs.readFileSync(
    path.join(__dirname, "./client/assets/less/ant-theme.less"), "utf8"
  )
);
const publicPath = "/";
//Webpack Plugins
let HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: "./client/index.html",
  filename: "index.html",
  inject: "body"
});
let FaviconPlugin = new FaviconsWebpackPlugin({
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
let env = new webpack.DefinePlugin({
  "process.env": {
    "NODE_ENV": JSON.stringify("development")
  }
});
module.exports = {
  devtool: "eval-source-map",
  entry: [
    "react-hot-loader/patch",
    "./client/index.js"
  ],
  output: {
    path: path.resolve(__dirname, "public"),
    publicPath,
    filename: "bundle.js",
    sourceMapFilename: "bundle.js.map"
  },
  plugins: [
    new CleanWebpackPlugin(["public"], {verbose: true}),
    env,
    HtmlWebpackPluginConfig,
    FaviconPlugin,
    new ExtractTextPlugin("bundle.css"),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ["react-hot-loader/webpack", {
          loader: "babel-loader",
          options: babelLoaderOptions,
        }]
      },
      {
        test: /\.scss$/,
        loader: ["css-hot-loader"].concat(
          ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader!sass-loader"
          })
        ),
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
        loader: ["css-hot-loader"].concat(
          ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
          })
        ),
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
      }
    ]
  },
  node: {
    fs: "empty"
  },
  stats: {
    colors: true,
    errors: true,
    errorDetails: true,
  },
  // webpack-dev-server options
  devServer: {
    open: true,
    port: 8088,
    overlay: {
      warnings: true,
      errors: true,
    },
    proxy: [
      {
        context: ["/api", "/auth"],
        target: "http://localhost:3000",
        secure: false
      }
    ],
    publicPath,
    hot: true,
    inline: true,
    disableHostCheck: true,
    historyApiFallback: {
      index: "/index.html"
    },
    stats: {colors: true}
  },
};
