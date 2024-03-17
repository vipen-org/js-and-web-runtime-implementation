import getJSRuntimeData from "./private/getJSRuntimeData.mjs"

const {package_json} = getJSRuntimeData()

export default function loadProjectPackageJSONFromBundle() {
	return package_json
}
