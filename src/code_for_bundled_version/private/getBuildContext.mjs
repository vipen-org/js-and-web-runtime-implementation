// $build_context will be replaced by anio-gyp
let build_context = JSON.parse(`$build_context$`)

const {anio_project_config} = build_context

build_context.anio_project_config = new Promise((resolve) => {
	setTimeout(resolve, 1, anio_project_config)
})

export default function() {
	return build_context
}
