import path from "node:path"

export default async function(project_root) {
	try {
		const {default: dependencies} = await import(
			path.join(project_root, "vipen", "internal", "node_modules", "@vipen", "target-js-dependencies", "index.mjs")
		)

		return dependencies
	} catch (e) {
		throw new Error(
			`Unable to dynamically load target dependencies. Make sure vipen target was initialized first.`
		)
	}
}
