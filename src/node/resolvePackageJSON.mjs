import fs from "node:fs/promises"

export default async function(project_root) {
	return JSON.parse(await fs.readFile(`${project_root}/package.json`))
}
