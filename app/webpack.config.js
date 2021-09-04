const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  mode: "development",
  entry: {
    app: "./src/index.jsx",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index_bundler.js",
  },
  node: { fs: "empty" },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@api": path.resolve(__dirname, "./src/api"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@modules": path.resolve(__dirname, "./src/modules"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react"],
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg)$/i,
        use: {
          loader: "url-loader",
          options: {
            name: "[name].[ext]",
          },
        },
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "main.css",
    }),
    new HtmlWebpackPlugin({
      favicon: "./public/favicon.ico",
      template: "./public/index.html",
    }),
    new webpack.DefinePlugin({
      "process.env": {
        REACT_APP_MAPBOX: JSON.stringify(process.env.REACT_APP_MAPBOX),
        REACT_APP_CHILDCARE_KEY: JSON.stringify(
          process.env.REACT_APP_CHILDCARE_KEY
        ),
        REACT_APP_API_SERVER: JSON.stringify(process.env.REACT_APP_API_SERVER),
      },
    }),
    new WebpackManifestPlugin(),
  ],
};
