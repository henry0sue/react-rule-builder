// production config
const { merge } = require("webpack-merge");
const { resolve } = require("path");

const commonConfig = require("./common");
commonConfig.plugins = undefined;
module.exports = merge(commonConfig, {
  mode: "development",
  context: resolve(__dirname, "../../src"),
  entry: "./components/rule-builder/RuleBuilder.tsx",
  output: {
    filename: "js/bundle.[contenthash].min.js",
    path: resolve(__dirname, "../../dist"),
    publicPath: "/",
  },
  devtool: "source-map",
  plugins: [],
  externals: [ /^[a-z\-0-9]+$/, /^lodash\.[a-z\-0-9]+$/]
});
