import getProjectInformationFromCaller from "./private/getProjectInformationFromCaller.mjs"

export async function createDefaultContextAsync() {
	const project = getProjectInformationFromCaller()

	return {
		log(...args) {
			console.log(
				project.root, "log()", ...args
			)
		}
	}
}

// same as for bundle
export {
	default as loadResource
} from "./loadResource.mjs"

export {
	default as createDefaultContext
} from "../shared/createDefaultContext.mjs"

export {
	default as loadProjectPackageJSON
} from "./loadProjectPackageJSON.mjs"

export {
	default as getBundlerInformation
} from "./getBundlerInformation.mjs"
