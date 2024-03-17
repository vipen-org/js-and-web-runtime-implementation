export default function printDebugMessage(msg) {
	let lines = msg.split("\n")
	let output = ``
	let start = `<vipen js-runtime> `

	for (let i = 0; i < lines.length; ++i) {
		if (i === 0) {
			output += `${start}${lines[i]}\n`
		} else {
			output += " ".repeat(start.length) + lines[i] + "\n"
		}
	}

	if (typeof process === "object") {
		process.stderr.write(output)
	} else if (typeof console === "object") {
		console.log(output)
	}
}
