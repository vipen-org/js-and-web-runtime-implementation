import resolvePackageJSON from "./resolvePackageJSON.mjs"
import resolveVipenConfig from "./resolveVipenConfig.mjs"
import searchForProjectResources from "./searchForProjectResources.mjs"
import loadVipenTargetDependencies from "./loadVipenTargetDependencies.mjs"

//
// generates runtime data for project located at "project_root"
//
export default async function(project_root, ignore_esmodules = false) {
	// resolve project package.json
	const package_json = await resolvePackageJSON(project_root)
	// resolve vipen config
	const vipen_config = await resolveVipenConfig(project_root)
	// load internal vipen target dependencies
	const target_dependencies = await loadVipenTargetDependencies(project_root)

	const project = {
		root: project_root,
		target_dependencies
	}

	return {
		package_json,
		vipen_config,
		resources: await searchForProjectResources(project, ignore_esmodules)
	}
}
