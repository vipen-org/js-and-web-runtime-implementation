import resolve from "@rollup/plugin-node-resolve"

export default {
	input: "./src/index.mjs",

	output: {
		file: "./dist/runtime.mjs",
		format: "es"
	},

	plugins: [resolve()]
}
