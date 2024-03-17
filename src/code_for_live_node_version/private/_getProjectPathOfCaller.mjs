import callsites from "callsites"
import {fileURLToPath} from "node:url"
import path from "node:path"
import nodeFsFindNearestFile from "@anio-node-foundation/fs-find-nearest-file"

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
	const vipen_config_path = nodeFsFindNearestFile.sync("vipen.config.mjs", caller_dir)

	if (!vipen_config_path) {
		throw new Error(`Could not determine caller's project root path. Does vipen.config.mjs exist in the project root?`)
	}

	return path.dirname(vipen_config_path)
}
