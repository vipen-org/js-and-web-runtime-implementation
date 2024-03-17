import makeDefaultContext from "../shared/makeDefaultContext.mjs"
import getJSRuntimeData from "./private/getJSRuntimeData.mjs"

export async function createDefaultContextAsync() {
	const project = getJSRuntimeData()

	return await makeDefaultContext({
		package_json: project.package_json,
		vipen_config: project.vipen_config,
		bundle: {
			id: project.bundle_id
		}
	})
}

// same as for node
export {
	default as loadResource
} from "./loadResource.mjs"

export {
	default as loadProjectPackageJSON
} from "./loadProjectPackageJSON.mjs"

export {
	default as getBundlerInformation
} from "./getBundlerInformation.mjs"
