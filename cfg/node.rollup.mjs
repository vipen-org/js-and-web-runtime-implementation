import resolve from "@rollup/plugin-node-resolve"

export default {
	input: "./src/code_for_live_node_version/index.mjs",

	output: {
		file: "./dist/node.mjs",
		format: "es"
	},

	plugins: [resolve()]
}
