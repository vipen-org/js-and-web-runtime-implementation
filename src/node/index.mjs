//
// this file gets imported by a live process
// and/or when bundling the target
//
import generateRuntimeData_impl from "./generateRuntimeData.mjs"
import searchForProjectResources_impl from "./searchForProjectResources.mjs"

export const generateRuntimeData = generateRuntimeData_impl
export const searchForProjectResources = searchForProjectResources_impl
