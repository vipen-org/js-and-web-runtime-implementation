import printDebugMessage from "../shared/printDebugMessage.mjs"
import normalizePath from "../shared/normalizePath.mjs"

import getBuildContext from "./private/getBuildContext.mjs"

export default function loadResourceFromBundle(resource_path) {
	const {short_bundle_id, bundled_resources} = getBuildContext()

	resource_path = normalizePath(resource_path)

	printDebugMessage(`Requested resource '${resource_path}' from bundle.`)

	if (!(resource_path in bundled_resources)) {
		throw new Error(
			`Unable to locate resource '${resource_path}' in bundle '${short_bundle_id}'.`
		)
	}

	return bundled_resources[resource_path]
}
