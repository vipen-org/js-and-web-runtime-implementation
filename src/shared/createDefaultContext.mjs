function logLine(line) {
	if (typeof process === "object") {
		process.stderr.write(`${line}\n`)
	} else if (typeof console === "object") {
		console.log(line)
	}
}

export default function createDefaultContext() {
	return {
		log(message) {
			logLine(`createDefaultContext.log(${message})`)
		}
	}
}
