import path from "node:path"

export default async function(project_root) {
	const vipen_config_path = path.join(project_root, "vipen.config.mjs")
	const {default: vipen_config} = await import(vipen_config_path)
	let resolved_vipen_config = vipen_config

	if (typeof vipen_config === "function") {
		resolved_vipen_config = await vipen_config()
	}

	return resolved_vipen_config
}
