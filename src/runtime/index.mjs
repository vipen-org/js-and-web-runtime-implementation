import parseResourceURL from "./parseResourceURL.mjs"
import makeDefaultContext from "./makeDefaultContext.mjs"
import createResourceURLs from "./createResourceURLs.mjs"

function prepareResource(type, resource) {
	return resource
}

//
// add .asURL modifier for loadResource and
// loadStaticResource
//
function extendRuntimeWithLoadResourceAsURL(runtime) {
	const lookupResourceURL = (url) => {
		const {type, path} = parseResourceURL(url)

		const resource_absolute_url = `${type}://${path}`

		if (!runtime.resource_urls.has(resource_absolute_url)) {
			throw new Error(`No such resource '${resource_absolute_url}'.`)
		}

		return runtime.resource_urls.get(resource_absolute_url)
	}

	runtime.loadResource.asURL = function(url) {
		return lookupResourceURL(url)
	}

	runtime.loadStaticResource.asURL = function(url) {
		// always deny loading esmodules
		if (url.startsWith("esmodule://")) {
			throw new Error(`esmodules cannot be loaded via loadStaticResource.asURL, use loadResource.asURL instead!`)
		}

		return lookupResourceURL(url)
	}
}

export function initializeRuntimeFromData(js_runtime_data) {
	const resource_urls = createResourceURLs(js_runtime_data.resources)

	const runtime = {
		version: `%%%VIPEN_RUNTIME_VERSION%%%`,
		resource_urls,

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
		// always deny loading esmodules
		if (url.startsWith("esmodule://")) {
			throw new Error(`esmodules cannot be loaded via loadStaticResource, use loadResource instead!`)
		}

		// since this is the runtime version of "loadStaticResource"
		// this is just an alias to "loadResource"
		return runtime.loadResource(url)
	}

	extendRuntimeWithLoadResourceAsURL(runtime)

	return runtime
}
