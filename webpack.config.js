const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const autoprefixer = require("autoprefixer");
const webpack = require("webpack");
const path = require("path");

module.exports = {
  watch: true,
  mode: "development",
  context: path.resolve(__dirname, ""),
  entry: {
    app: ["./app.js"],
    stylesheets: ["./app.scss"]
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    port: 3000,
    historyApiFallback: {
      rewrites: [{ from: /^\/app/, to: "/index.html" }]
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new HtmlWebpackPlugin({
      chunks: ["app"],
      template: "./index.html",
      filename: "./index.html"
    }),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ["tooltipsApp"],
      filename: "./tooltips.html"
    }),
    new CopyPlugin([{ from: "./assets", to: "assets" }])
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "bundle.css"
            }
          },
          { loader: "extract-loader" },
          { loader: "css-loader" },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [autoprefixer()]
            }
          },
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                includePaths: ["./node_modules"]
              }
            }
          }
        ]
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        query: {
          presets: ["@babel/preset-env"]
        }
      },
      {
        test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]"
        }
      }
    ]
  }
};
