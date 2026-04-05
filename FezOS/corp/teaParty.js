/** @param {NS} ns */
import * as corp from "FezOS/func/corpFunc.js";

export async function main(ns) {

	ns.ui.openTail();
	ns.ui.resizeTail(300, 130);
	ns.ui.moveTail(1225, 485);
	// ns.disableLog('ALL');
	ns.disableLog('sleep');
	ns.ui.setTailTitle("TeaParty")

	while (true) {

		await corp.corpState(ns, "START");
		
		corp.teaParty(ns)
	}
}
