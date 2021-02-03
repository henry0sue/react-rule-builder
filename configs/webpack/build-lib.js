// production config
const { merge } = require("webpack-merge");
const { resolve } = require("path");

const commonConfig = require("./common");
commonConfig.plugins = undefined;
module.exports = merge(commonConfig, {
  mode: "development",
  context: resolve(__dirname, "../../src"),
  entry: "./index.tsx",
  /* output: {
    filename: "index.js",
    path: resolve(__dirname, "../../dist"),
    publicPath: "/",
  }, */
  output: {
    path: resolve(__dirname, '../../dist'),
    filename: 'index.js',
    libraryTarget: 'umd',
    library: 'react-rule-builder',
    umdNamedDefine: true,
  },
  devtool: "source-map",
  plugins: [],
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
  }
});
