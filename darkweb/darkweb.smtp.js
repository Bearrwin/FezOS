/** @param {NS} ns */
export async function main(ns) {
	
	// ns.ui.openTail();
	// ns.disableLog('ALL');
	// ns.ui.resizeTail(300, 130);
	// ns.ui.moveTail(1225, 485);
	
	if (!ns.fileExists("relaySMTP.exe", "home")) {
		ns.singularity.purchaseProgram("relaySMTP.exe");
	}

}