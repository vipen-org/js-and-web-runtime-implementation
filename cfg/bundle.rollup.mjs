import resolve from "@rollup/plugin-node-resolve"

export default {
	input: "./src/code_for_bundled_version/index.mjs",

	output: {
		file: "./dist/virtual.mjs",
		format: "es"
	},

	plugins: [resolve()]
}
