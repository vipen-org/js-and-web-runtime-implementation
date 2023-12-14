// $build_context will be replaced by anio-jsbundler
const build_context = JSON.parse(`$build_context$`)

export default function() {
	return build_context
}
