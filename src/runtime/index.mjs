import parseResourceURL from "./parseResourceURL.mjs"
import makeDefaultContext from "./makeDefaultContext.mjs"

function prepareResource(type, resource) {
	return resource
}

export function initializeRuntimeFromData(js_runtime_data) {
	const runtime = {
		version: `%%%VIPEN_RUNTIME_VERSION%%%`,

		getRuntimeVersion() {
			return `%%%VIPEN_RUNTIME_VERSION%%%`
		},

		createDefaultContext() {
			return makeDefaultContext(
				JSON.parse(JSON.stringify(js_runtime_data.package_json))
			)
		},

		loadResource(url) {
			const {type, path} = parseResourceURL(url)

			for (const resource of js_runtime_data.resources) {
				if (resource.type !== type) continue
				if (resource.relative_path !== path) continue

				return prepareResource(type, resource.resource)
			}

			throw new Error(`Unable to locate resource ${type}://${path}.`)
		},

		loadProjectPackageJSON() {
			return JSON.parse(JSON.stringify(js_runtime_data.package_json))
		},

		loadVipenConfiguration() {
			return JSON.parse(JSON.stringify(js_runtime_data.vipen_config))
		}
	}

	//
	// static resources are allowed to be imported by other resources
	// located in resources/esmodule
	//
	runtime.loadStaticResource = (url) => {
		// since this is the runtime version of "loadStaticResource"
		// this is just an alias to "loadResource"
		return runtime.loadResource(url)
	}

	return runtime
}
