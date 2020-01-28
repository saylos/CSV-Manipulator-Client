const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
	entry: "./src/main.ts",
	mode: "production",
	output: {
		path: path.resolve(__dirname, "../wwwroot/js"),
		filename: "build.js"
	},
	module: {
		rules: [
			// Will be added later into server app
			/* {
				test: /\.html$/,
				loader: "file-loader",
				options: {
					name: "index.html",
					outputPath: "../"
				}
			}, */
			{
				test: /\.html$/,
				loader: "file-loader",
				options: {
					name: 'index.html',
					outputPath: "../"
				},
			},
			{
				test: /\.vue$/,
				loader: "vue-loader"
			},
			{
				test: /\.ts?$/,
				loader: "ts-loader",
				options: { appendTsSuffixTo: [/\.vue$/] }
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
