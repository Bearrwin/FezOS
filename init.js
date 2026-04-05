/** @param {NS} ns */
export async function main(ns) {

	ns.ui.openTail();
	ns.ui.resizeTail(300, 130);
	ns.ui.moveTail(1225, 485);
	ns.disableLog('ALL');

	ns.run("FezOS/init/init.reset.savedVar.js");
	await ns.sleep(1000);
	ns.run("FezOS/init/init.get.BNMults.js");
	await ns.sleep(1000);
	ns.run("FezOS/init/init.getSF.js");
	await ns.sleep(1000);
	ns.run("FezOS/init/init.getBN.js");
	await ns.sleep(1000);
	ns.run("FezOS/init/init.useParam.js");
	await ns.sleep(1000);
	ns.run("FezOS/init/init.ports.js");
	await ns.sleep(1000);
	ns.run("FezOS/start.js");

	ns.tprint("Initialisation complete, starting main operations.");

}