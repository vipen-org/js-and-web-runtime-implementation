import getProjectInformationFromCaller from "./private/getProjectInformationFromCaller.mjs"

export default function loadProjectPackageJSONFromDisk() {
	const project = getProjectInformationFromCaller()

	return project.package_json
}
