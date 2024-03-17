import getJSRuntimeData from "./private/getJSRuntimeData.mjs"

const {bundler_meta} = getJSRuntimeData()

export default function getBundlerInformation() {
	return bundler_meta
}
