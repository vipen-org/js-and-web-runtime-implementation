import fs from "node:fs/promises"
import {fileURLToPath} from "node:url"
import path from "node:path"

const __dirname = path.dirname(
	fileURLToPath(import.meta.url)
)

const project_package_json = JSON.parse(
	await fs.readFile(path.join(__dirname, "package.json"))
)

let dist_runtime_path = path.join(__dirname, "dist", "runtime.mjs")
let dist_runtime = (await fs.readFile(dist_runtime_path)).toString()

dist_runtime = dist_runtime.split(`%%%VIPEN_RUNTIME_VERSION%%%`).join(`v${project_package_json.version}`)

await fs.writeFile(`${dist_runtime_path}.tmp`, dist_runtime)
await fs.rename(`${dist_runtime_path}.tmp`, dist_runtime_path)
