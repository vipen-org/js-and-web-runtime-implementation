import getBuildContext from "./_getBuildContext.mjs"

const {bundler_meta} = getBuildContext()

export default function getBundlerInformation() {
	return bundler_meta
}
