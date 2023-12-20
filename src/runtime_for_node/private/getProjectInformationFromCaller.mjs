import _getProjectPathOfCaller from "./_getProjectPathOfCaller.mjs"
import fs from "node:fs"
import path from "node:path"

export default function() {
	const project_root = _getProjectPathOfCaller()
	const package_json = JSON.parse(fs.readFileSync(
		path.join(project_root, "package.json")
	).toString())

	return {
		root: project_root,
		package_json
	}
}
