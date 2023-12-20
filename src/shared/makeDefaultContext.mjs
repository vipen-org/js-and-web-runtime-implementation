function default_logLine(line) {
	if (typeof process === "object") {
		process.stderr.write(`${line}\n`)
	} else if (typeof console === "object") {
		console.log(line)
	}
}

const log_levels = {
	"error": 3,
	"warn" : 4,
	"info" : 5,
	"debug": 6,
	"trace": 7
}

function default_getCurrentLogLevel() {
	let current_log_level = "info"

	if (typeof process === "object") {
		if ("ANIO_JSBUNDLER_LOG_LEVEL" in process.env) {
			current_log_level = process.env["ANIO_JSBUNDLER_LOG_LEVEL"].toLowerCase()
		}
	} else if (typeof window === "object") {
		if ("ANIO_JSBUNDLER_LOG_LEVEL" in window) {
			current_log_level = window.ANIO_JSBUNDLER_LOG_LEVEL.toLowerCase()
		}
	}

	if (!(current_log_level in log_levels)) {
		logLine(`Warning: invalid log level '${current_log_level}'`)

		current_log_level = "info"
	}

	return current_log_level
}

function logWithLevel(ctx, level, args) {
	const message_log_level = log_levels[level]
	const current_log_level = log_levels[ctx.getCurrentLogLevel()]

	if (message_log_level > current_log_level) return

	let first_line = `[${level.padStart(5, " ")}] <${ctx.package_json.name}> `
	let padding = " ".repeat(first_line.length)

	const log_message = args.map(arg => {
		return arg.toString()
	}).join("\n")

	const log_lines = log_message.split("\n")

	let str = ``

	for (let i = 0; i < log_lines.length; ++i) {
		let current_line = padding

		if (i === 0) {
			current_line = first_line
		}

		current_line += log_lines[i]

		str += `${current_line}\n`
	}

	ctx.logLine(str.slice(0, str.length - 1))
}

export default async function(meta) {
	const anio_project_config = await meta.anio_project_config

	let the_context = {
		package_json: meta.package_json,
		anio_project_config,
		getCurrentLogLevel: default_getCurrentLogLevel,
		logLine: default_logLine
	}

	the_context.log = (...args) => {
		// todo: add async mutex?
		logWithLevel(the_context, "debug", args)
	}

	for (const log_level of Object.keys(log_levels)) {
		the_context.log[log_level] = function(...args) {
			logWithLevel(the_context, log_level, args)
		}
	}

	return the_context
}
