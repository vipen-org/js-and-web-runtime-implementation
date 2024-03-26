// Code is based off of https://rollupjs.org/plugin-development/#a-simple-example
import generateRuntimeData from "../generateRuntimeData.mjs"
import {fileURLToPath} from "node:url"
import path from "node:path"
import fs from "node:fs/promises"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function loadVirtualModule(runtime_data) {
	let virtual_module = ``

	virtual_module  = `const runtime_data = ` + JSON.stringify(runtime_data, null, 4) + ";\n"
	virtual_module += `import {initializeRuntimeFromData} from "@virt-vipen/js-and-web-runtime/bundle"\n`
	virtual_module += `const runtime = initializeRuntimeFromData(runtime_data);\n`

	const runtime_methods = [
		"getRuntimeVersion",
		"loadStaticResource",
		// do not provide "loadResources" here
		//"loadResource",
		"loadProjectPackageJSON",
		"loadVipenConfiguration",
		"createDefaultContext"
	]

	for (const method of runtime_methods) {
		virtual_module += `export function ${method}(...args) { return runtime.${method}(...args); }\n`
	}

	virtual_module += `export default {\n`

	for (const method of runtime_methods) {
		virtual_module += `    ${method},\n`
	}

	virtual_module += `}\n`

	return virtual_module
}

//
// virtual js runtime for resources/
//
export default async function(project_root) {
	const runtime_data = await generateRuntimeData(project_root, true)

	return function VipenStaticJsRuntimePlugin() {
		return {
			name: "vipen-static-js-runtime-plugin",

			resolveId(source) {
				if (source === "@vipen/target-js") {
					// this signals that Rollup should not ask other plugins or check
					// the file system to find this id
					return source
				} else if (source === "@virt-vipen/js-and-web-runtime/bundle") {
					return source
				}

				return null
			},

			async load(id) {
				if (id === "@vipen/target-js") {
					return await loadVirtualModule(runtime_data)
				} else if (id === "@virt-vipen/js-and-web-runtime/bundle") {
					const runtime_bundle = path.join(__dirname, "..", "..", "..", "dist", "runtime.mjs")

					return (await fs.readFile(runtime_bundle)).toString()
				}

				return null // other ids should be handled as usually
			}
		}
	}
}
