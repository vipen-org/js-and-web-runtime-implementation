import findNearestFile from "./_findNearestFile.mjs"

import path from "node:path"
import {fileURLToPath} from "node:url"
import callsites from "callsites"
import fs from "node:fs"

export default function loadProjectPackageJSONFromDisk() {
	// origin_dirname is path of calling script
	const origin_dirname = path.dirname(
		fileURLToPath(callsites()[1].getFileName())
	)

	const anio_project_config_path = findNearestFile(
		"anio_project.mjs", origin_dirname
	)

	const anio_project_root = path.dirname(anio_project_config_path)
	const absolute_package_json_path = path.resolve(anio_project_root, "package.json")

	return JSON.parse((
		fs.readFileSync(
			absolute_package_json_path
		)
	).toString())
}
