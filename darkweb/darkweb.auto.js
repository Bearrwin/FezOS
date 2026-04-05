/** @param {NS} ns */
export async function main(ns) {

	// ns.ui.openTail();
	// ns.disableLog('ALL');
	// ns.ui.resizeTail(300, 130);
	// ns.ui.moveTail(1225, 485);

	if (!ns.hasTorRouter()) {
		ns.singularity.purchaseTor();
	}

	if (!ns.fileExists("BruteSSH.exe", "home") && ns.getServerMoneyAvailable("home") > ns.singularity.getDarkwebProgramCost("BruteSSH.exe")) {
		ns.singularity.purchaseProgram("BruteSSH.exe");
	}
	if (!ns.fileExists("FTPCrack.exe", "home") && ns.getServerMoneyAvailable("home") > ns.singularity.getDarkwebProgramCost("FTPCrack.exe")) {
		ns.singularity.purchaseProgram("FTPCrack.exe");
	}
	if (!ns.fileExists("relaySMTP.exe", "home") && ns.getServerMoneyAvailable("home") > ns.singularity.getDarkwebProgramCost("relaySMTP.exe")) {
		ns.singularity.purchaseProgram("relaySMTP.exe");
	}
	if (!ns.fileExists("HTTPWorm.exe", "home") && ns.getServerMoneyAvailable("home") > ns.singularity.getDarkwebProgramCost("HTTPWorm.exe")) {
		ns.singularity.purchaseProgram("HTTPWorm.exe");
	}
	if (!ns.fileExists("SQLInject.exe", "home") && ns.getServerMoneyAvailable("home") > ns.singularity.getDarkwebProgramCost("SQLInject.exe")) {
		ns.singularity.purchaseProgram("SQLInject.exe");
	}
	if (!ns.fileExists("ServerProfiler.exe", "home") && ns.getServerMoneyAvailable("home") > ns.singularity.getDarkwebProgramCost("ServerProfiler.exe")) {
		ns.singularity.purchaseProgram("ServerProfiler.exe");
	}
	if (!ns.fileExists("DeepscanV1.exe", "home") && ns.getServerMoneyAvailable("home") > ns.singularity.getDarkwebProgramCost("DeepscanV1.exe")) {
		ns.singularity.purchaseProgram("DeepscanV1.exe");
	}
	if (!ns.fileExists("DeepscanV2.exe", "home") && ns.getServerMoneyAvailable("home") > ns.singularity.getDarkwebProgramCost("DeepscanV2.exe")) {
		ns.singularity.purchaseProgram("DeepscanV2.exe");
	}
	if (!ns.fileExists("AutoLink.exe", "home") && ns.getServerMoneyAvailable("home") > ns.singularity.getDarkwebProgramCost("AutoLink.exe")) {
		ns.singularity.purchaseProgram("AutoLink.exe");
	}
	if (!ns.fileExists("Formulas.exe", "home") && ns.getServerMoneyAvailable("home") > ns.singularity.getDarkwebProgramCost("Formulas.exe")) {
		ns.singularity.purchaseProgram("Formulas.exe");
	}
	await ns.sleep(1000)
	ns.run("FezOS/worm/worm.nuke.js");
}