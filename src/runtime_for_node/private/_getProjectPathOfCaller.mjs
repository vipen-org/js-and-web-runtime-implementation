import callsites from "callsites"
import {fileURLToPath} from "node:url"
import path from "node:path"
import _findNearestFile from "./_findNearestFile.mjs"

export default function() {
	const entries = callsites()
	const caller_file = fileURLToPath(
		entries[3].getFileName()
	)

	/* debug purposes
	for (let i = 0; i < entries.length; ++i) {
		console.log(i, entries[i].getFileName())
	}
	*/

	const caller_dir = path.dirname(caller_file)
	const anio_project_config_path = _findNearestFile(
		"anio_project.mjs", caller_dir
	)

	if (!anio_project_config_path) {
		throw new Error(`Could not determine caller's project root path. Does anio_project.mjs exist in the project root?`)
	}

	return path.dirname(anio_project_config_path)
}
