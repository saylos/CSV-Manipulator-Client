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
				test: /\.vue$/,
				loader: "vue-loader"
			},
			{
				test: /\.ts?$/,
				loader: "ts-loader"
			},
			{
				test: /\.css$/,
				use: ["vue-style-loader", "css-loader"]
			}
		]
	},
	resolve: {
		extensions: [".js", ".vue", ".json", ".ts"]
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
