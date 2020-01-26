const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
	entry: "./src/main.ts",
	mode: "production",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "build.js"
	},
	module: {
		rules: [
			{
				test: /\.ts?$/,
				loader: "ts-loader",
				exclude: /node_modules/
			},
			{
				test: /\.vue$/,
				loader: "vue-loader"
			},
			{
				test: /\.css$/,
				use: ["vue-style-loader", "css-loader"]
			}
		]
	},
	devServer: {
		historyApiFallback: true,
		noInfo: true,
		overlay: true,
		port: 3000
	},
	performance: {
		hints: false
	},
	plugins: [new VueLoaderPlugin()]
};
