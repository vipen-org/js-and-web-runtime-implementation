function logLine(line) {
	if (typeof process === "object") {
		process.stderr.write(`${line}\n`)
	} else if (typeof console === "object") {
		console.log(line)
	}
}

export default async function(meta) {
	return {
		log(message) {
			const project = `<${meta.package_json.name}>`
			logLine(
				`${project} createDefaultContext.log(${message})`
			)
		}
	}
}
