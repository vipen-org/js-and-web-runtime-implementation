import _getProjectPathOfCaller from "./_getProjectPathOfCaller.mjs"
import fs from "node:fs"
import path from "node:path"

export default function() {
	const project_root = _getProjectPathOfCaller()
	const package_json = JSON.parse(fs.readFileSync(
		path.join(project_root, "package.json")
	).toString())

	/* does not use await so this function can be used in synchronous contexts */
	const anio_project_config = import(
		path.join(project_root, "anio_project.mjs")
	).then(cfg => {
		return cfg.default
	}).then(cfg => {
		return typeof cfg === "function" ? cfg() : cfg
	})

	return {
		root: project_root,
		package_json,
		anio_project_config
	}
}
