/** @param {NS} ns */
export async function main(ns) {
	let target = ns.args[0];
	let addMsec = ns.args[1]; 

	await ns.hack(target, {additionalMsec: addMsec});
}