import printDebugMessage from "../shared/printDebugMessage.mjs"
import normalizePath from "../shared/normalizePath.mjs"
import findNearestFile from "./_findNearestFile.mjs"

import path from "node:path"
import {fileURLToPath} from "node:url"
import callsites from "callsites"
import fs from "node:fs"

export default function loadResourceFromDisk(resource_path) {
	resource_path = normalizePath(resource_path)

	printDebugMessage(
		`Requested resource '${resource_path}' from disk.`
	)

	// origin_dirname is path of calling script
	const origin_dirname = path.dirname(
		fileURLToPath(callsites()[1].getFileName())
	)

	const anio_project_config_path = findNearestFile(
		"anio_project.mjs", origin_dirname
	)

	const anio_project_root = path.dirname(anio_project_config_path)
	const absolute_resource_path = path.resolve(anio_project_root, "bundle.resources", resource_path)

	return (
		fs.readFileSync(
			absolute_resource_path
		)
	).toString()
}
