import resolve from "@rollup/plugin-node-resolve"

export default {
	input: "./src/runtime/index.mjs",

	output: {
		file: "./dist/runtime.mjs",
		format: "es"
	},

	plugins: [resolve()]
}
