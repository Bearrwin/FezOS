/** @param {NS} ns */

import * as cc from "FezOS/data/corpConstants.js";

export async function main(ns) {

	ns.ui.openTail();
	ns.ui.resizeTail(670, 205);
	ns.disableLog('ALL');
	let corpName = ns.corporation.getCorporation().name
	ns.ui.setTailTitle(corpName);

	let round1Funds = cc.offerFuundsReq.round1;
	let round2Funds = cc.offerFuundsReq.round2;
	let round3Funds = cc.offerFuundsReq.round3;
	let round4Funds = cc.offerFuundsReq.round4;
	let req = 0

	
	while (true) {
		let round = ns.corporation.getInvestmentOffer().round;
		let offer = ns.corporation.getInvestmentOffer().funds;
		let funds = ns.corporation.getCorporation().funds
		let profit = (ns.corporation.getCorporation().revenue - ns.corporation.getCorporation().expenses)
		let valuation = ns.corporation.getCorporation().valuation
		let divisions = ns.corporation.getCorporation().divisions
		let sfCurrQty = ns.corporation.getUpgradeLevel("Smart Factories");
		let ssCurrQty = ns.corporation.getUpgradeLevel("Smart Storage");
		let wCurrQty = ns.corporation.getUpgradeLevel("Wilson Analytics");
		let botCurrQty = ns.corporation.getUpgradeLevel("ABC SalesBots");

		switch (round) {
			case 1:
				req = round1Funds;
				break;
			case 2:
				req = round2Funds;
				break;
			case 3:
				req = round3Funds;
				break;
			case 4:
				req = round4Funds;
				break;
		}
		ns.clearLog(corpName);
		ns.print(` Balance:$${ns.formatNumber(funds, 2)}  Profit:$${ns.formatNumber(profit, 2)}  Valuation:$${ns.formatNumber(valuation, 2)}`);
		ns.print(` Round:${round}  Offer:$${ns.formatNumber(offer, 2)}  Req:$${ns.formatNumber(req, 2)} `);
		ns.print(` Factories: ${sfCurrQty}  Storage: ${ssCurrQty}  Wilson: ${wCurrQty}  Bots: ${botCurrQty} `);
		

		for (let div of divisions) {
			let divName = div
			let divType = ns.corporation.getDivision(div).type
			let aware = ns.corporation.getDivision(div).aware
			let pop = ns.corporation.getDivision(div).popularity
			let divProfit = ns.corporation.getDivision(div).lastCycleRevenue - ns.corporation.getDivision(div).lastCycleExpenses
			let divAdQty = ns.corporation.getDivision(div).numAdVerts
			let divRP = ns.corporation.getDivision(div).researchPoints
			let cities = ["Aevum", "Chongqing", "Ishima", "New Tokyo", "Sector-12", "Volhaven"]
			let totalSize = 0
			let usedSize = 0
			let totalOffice = 0
			let usedOffice = 0
			let unassigned = 0

			for (let city of cities) {

				try {

				let whouse = ns.corporation.getWarehouse(div, city);
				let wSize = whouse.size
				let uSize = whouse.sizeUsed
				totalSize += wSize
				usedSize += uSize
				let officeSize = ns.corporation.getOffice(div, city).size
				let officeUsed = ns.corporation.getOffice(div, city).numEmployees
				let officeUn = ns.corporation.getOffice(div, city).employeeJobs.Unassigned
				totalOffice += officeSize
				usedOffice += officeUsed
				unassigned += officeUn
				} catch {
					
				}
			}

			ns.print(`-${div}: ${divType}  Profit:$${ns.formatNumber(divProfit, 2)}  RP: ${ns.formatNumber(divRP, 0)}  Ads: ${ns.formatNumber(divAdQty, 0)} `);
			ns.print(` -Warehouse Space: ${ns.formatNumber(usedSize, 2)}/${ns.formatNumber(totalSize, 2)} Office Size: ${ns.formatNumber(usedOffice, 0)}/${ns.formatNumber(totalOffice, 0)}  Lazy: ${ns.formatNumber(unassigned, 0)}`);
		}
	await ns.sleep(0)
	}
}