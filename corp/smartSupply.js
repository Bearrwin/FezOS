/** @param {NS} ns */
import * as corp from "FezOS/func/corpFunc.js";
import * as cc from "FezOS/data/corpConstants.js";

export async function main(ns) {
	ns.ui.openTail();
	ns.ui.resizeTail(300, 130);
	ns.ui.moveTail(1225, 485);
	// ns.disableLog('ALL');
	ns.disableLog('sleep');
	ns.ui.setTailTitle("Smart Supply")

	let divisions = ns.corporation.getCorporation().divisions;
	let cities = cc.cities;
	let city = "";
	let div = divisions[0]
	let div2 = divisions[1]

	while (true) {

		await corp.corpState(ns, "START");
		divisions = ns.corporation.getCorporation().divisions;
		div = divisions[0]
		div2 = divisions[1]

		if (div != undefined) {
			for (city of cities) {
				corp.smartSupplyAgri(ns, div, city)
			}
		}

		if (div2 != undefined) {
			for (city of cities) {
				corp.smartSupplyChem(ns, div2, city)
			}
		}

	}
}