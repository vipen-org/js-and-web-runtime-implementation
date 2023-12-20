import makeDefaultContext from "../shared/makeDefaultContext.mjs"
import getBuildContext from "./private/getBuildContext.mjs"

export async function createDefaultContextAsync() {
	const project = getBuildContext()

	return makeDefaultContext(project)
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
