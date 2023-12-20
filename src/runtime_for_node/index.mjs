import makeDefaultContext from "../shared/makeDefaultContext.mjs"
import getProjectInformationFromCaller from "./private/getProjectInformationFromCaller.mjs"

export async function createDefaultContextAsync() {
	const project = getProjectInformationFromCaller()

	return await makeDefaultContext(project)
}

// same as for bundle
export {
	default as loadResource
} from "./loadResource.mjs"

export {
	default as loadProjectPackageJSON
} from "./loadProjectPackageJSON.mjs"

export {
	default as getBundlerInformation
} from "./getBundlerInformation.mjs"
