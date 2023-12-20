import getBuildContext from "./private/getBuildContext.mjs"

const {package_json} = getBuildContext()

export default function loadProjectPackageJSONFromBundle() {
	return package_json
}
