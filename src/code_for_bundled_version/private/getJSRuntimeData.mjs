// $vipen_js_runtime_data will be replaced by vipen
let js_runtime_data = JSON.parse(`$vipen_js_runtime_data`)

const {vipen_config} = js_runtime_data

js_runtime_data.vipen_config = new Promise((resolve) => {
	setTimeout(resolve, 1, vipen_config)
})

export default function() {
	return js_runtime_data
}
