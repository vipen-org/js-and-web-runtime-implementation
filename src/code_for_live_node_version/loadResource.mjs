import path from "node:path"
import fs from "node:fs"

import printDebugMessage from "../shared/printDebugMessage.mjs"
import normalizePath from "../shared/normalizePath.mjs"
import getProjectInformationFromCaller from "./private/getProjectInformationFromCaller.mjs"

export default function loadResourceFromDisk(resource_path) {
	const project = getProjectInformationFromCaller()

	resource_path = normalizePath(resource_path)

	printDebugMessage(`Requested resource '${resource_path}' from disk.`)

	const absolute_resource_path = path.resolve(
		project.root, "bundle.resources", resource_path
	)

	return (
		fs.readFileSync(
			absolute_resource_path
		)
	).toString()
}
