const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",

  entry: "./src/index.tsx",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
  },

  devtool: "eval-cheap-module-source-map",
 
  devServer: {
    port: 3000,
    hot: true,
    open: true,
    proxy: [
      {
        context: ["/api"],
        target: "https://nesine-case-study.onrender.com",
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
      },
    ],
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
 
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              esModule: false,
              importLoaders: 1,
              modules: {
                auto: /\.module\.css$/,
                localIdentName: "[name]__[local]--[hash:base64:5]",
              },
            },
          },
          "postcss-loader",
        ],
      },
    ],
  },
 
  plugins: [
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
  ],
};