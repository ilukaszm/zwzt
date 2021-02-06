const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPartialsPlugin = require("html-webpack-partials-plugin");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: "./app.js",
  output: {
    filename: "app.js",
  },
  devServer: {
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    new HtmlWebpackPartialsPlugin({
      path: path.join(__dirname, "./templates/home.html"),
      location: "home",
      template_filename: "index.html",
    }),
    new HtmlWebpackPartialsPlugin({
      path: path.join(__dirname, "./templates/success.html"),
      location: "success",
      template_filename: "index.html",
    }),
    new HtmlWebpackPartialsPlugin({
      path: path.join(__dirname, "./templates/pageNotFound.html"),
      title: "pageNotFound",
      location: "pageNotFound",
      template_filename: "index.html",
    }),
  ],
};
