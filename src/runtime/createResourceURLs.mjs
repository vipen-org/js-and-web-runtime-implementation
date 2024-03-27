import createTemporaryResource from "@anio-js-foundation/create-temporary-resource"

export default function(resources) {
	let ret = new Map()

	for (const resource of resources) {
		const resource_absolute_url = `${resource.type}://${resource.relative_path}`

		ret.set(resource_absolute_url, createTemporaryResource(resource.resource).location)
	}

	return ret
}
