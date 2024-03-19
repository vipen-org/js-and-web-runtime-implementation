

export function initializeRuntimeFromData(js_runtime_data) {
	console.log("initialize runtime from data", js_runtime_data)

	return {
		package_json: js_runtime_data.package_json
	}
}
