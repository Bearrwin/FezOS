/** @param {NS} ns */
import * as bb from "FezOS/func/func.js";
import * as corp from "FezOS/func/corpFunc.js";

export async function main(ns) {

	ns.ui.openTail();
	ns.ui.resizeTail(670, 185);
	ns.disableLog('ALL');

	let cities = ["Aevum", "Chongqing", "Ishima", "New Tokyo", "Sector-12", "Volhaven"];
	let city = "";
	let corpName = "MegaloManie Inc.";
	ns.ui.setTailTitle(corpName + " setup.");
	let ag = "MegaCrops";
	let chem = "MegaChem";
	let baccy = "MegaSmoke"


	// Round 1 

	let rpAgriGoal1 = 55;
	let hwAgriGoal1 = 1791;
	let roAgriGoal1 = 0;
	let aiAgriGoal1 = 1562;
	let reAgriGoal1 = 98470;


	// Round 2

	let rpAgriGoal2 = 700
	let rpChemGoal2 = 390

	let hwAgriGoal2 = 10146;
	let roAgriGoal2 = 1416;
	let aiAgriGoal2 = 9081;
	let reAgriGoal2 = 459400;

	let hwChemGoal2 = 3194;
	let roChemGoal2 = 54;
	let aiChemGoal2 = 1717;
	let reChemGoal2 = 54917;



	await corp.createCorp(ns, corpName);
	await corp.createDiv(ns, "Agriculture", ag);
	await corp.expandDiv(ns, ag);
	await corp.firstWare(ns, ag);
	await corp.wareSpace(ns, ag, 5);
	ns.run("FezOS/corp/teaParty.js");
	ns.run("FezOS/corp/corpMonitor.js");
	await corp.officeSpace(ns, ag, 4);
	corp.hiring(ns, ag);
	await corp.smartStorage(ns, 8);
	await corp.smartFactories(ns, 2);
	await corp.adVerts(ns, ag, 2);

	await corp.hrAll(ns, ag, 0, 0, 0, 0, 4);
	await corp.rpool(ns, ag, rpAgriGoal1);
	await corp.hrAll(ns, ag, 1, 1, 1, 1, 0);
	
	for (city of cities) {
		ns.corporation.sellMaterial(ag, city, "Plants", "Max", "MP")
		ns.corporation.sellMaterial(ag, city, "Food", "Max", "MP")
	}

	ns.run("FezOS/corp/smartSupply.js");

	await corp.drPepper(ns, ag, 0.99);
	await corp.boostMatsMax(ns, ag, hwAgriGoal1, roAgriGoal1, aiAgriGoal1, reAgriGoal1);

	await corp.investOffer(ns);

	try {
		ns.corporation.purchaseUnlock("Export")
	} catch {
	}

	await corp.officeSpace(ns, ag, 8);
				corp.hiring(ns, ag);
	await ns.sleep(100)
		
	await corp.hrAll(ns, ag, 0, 0, 0, 0, 8);
	await corp.wareSpace(ns, ag, 17);
	await corp.adVerts(ns, ag, 8);

	// Create Chemical division

	await corp.createDiv(ns, "Chemical", chem);
	await corp.expandDiv(ns, chem);
	await corp.firstWare(ns, chem);
				corp.hiring(ns, chem);
	await ns.sleep(100)

	await corp.hrAll(ns, chem, 0, 0, 0, 0, 3);
	await corp.wareSpace(ns, chem, 2);

	await corp.smartStorage(ns, 27);
	
	await corp.exportOpt(ns, ag, chem, "Plants");
	await corp.exportOpt(ns, chem, ag, "Chemicals");

	await corp.rpool(ns, ag, rpAgriGoal2);
	await corp.rpool(ns, chem, rpChemGoal2);
	
	await corp.hrAll(ns, ag, 3, 1, 2, 2, 0);
	await corp.hrAll(ns, chem, 1, 1, 0, 1, 0);
	await corp.drPepper(ns, chem, 0.99);
		
	await corp.smartFactories(ns, 14);

	await corp.boostMatsMax(ns, chem, hwChemGoal2, roChemGoal2, aiChemGoal2, reChemGoal2);
	await corp.corpStateWaitCycles(ns, 5)
	await corp.boostMatsMax(ns, ag, hwAgriGoal2, roAgriGoal2, aiAgriGoal2, reAgriGoal2);

	await corp.investOffer(ns);

	
	
	/*
		await corp.salesBots(ns, goal)
		await corp.adVerts(ns, div, goal)
		await corp.smartStorage(ns, goal)
		await corp.smartFactories(ns, goal)
		await corp.wilson(ns, goal)
		corp.hiring(ns, div)
		corp.bulkPurch(ns, div, wa, fo, pl, hw, ch, ro, ai, re)
		await corp.hr(ns, div, city, op, en, bu, ma, rd)
		await corp.boostMatsMax(ns, div, hw, ro, ai, re)
		await corp.officeSpace(ns, div, goal)
		await corp.rp(ns, div, goal)
		await corp.exportOpt(ns, sourceDiv, destDiv, mat);
		await corp.corpStateWaitCycles(ns, cycles)
	
		
	*/


}