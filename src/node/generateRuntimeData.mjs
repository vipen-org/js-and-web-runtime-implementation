import resolvePackageJSON from "./resolvePackageJSON.mjs"
import resolveVipenConfig from "./resolveVipenConfig.mjs"
import searchForProjectResources from "./searchForProjectResources.mjs"

//
// generates runtime data for project located at "project_root"
//
export default async function(project_root) {
	// resolve project package.json
	const package_json = await resolvePackageJSON(project_root)
	// resolve vipen config
	const vipen_config = await resolveVipenConfig(project_root)

	return {
		package_json,
		vipen_config,
		resources: await searchForProjectResources(project_root)
	}
}
