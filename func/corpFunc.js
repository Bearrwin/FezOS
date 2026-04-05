// let cities = ["Aevum", "Chongqing", "Ishima", "New Tokyo", "Sector-12", "Volhaven"];
// let city = "";
// let materials = ["Hardware", "Robors", "AI Cores", "Real Estate"];

import * as cc from "FezOS/data/corpConstants.js";

export function cityRawProd(ns, div, city) {

	let hwMult = "";
	let roMult = "";
	let aiMult = "";
	let reMult = "";

	let divType = ns.corporation.getDivision(div).type
	ns.print(divType)

	switch (divType) {

		case "Agriculture":

			hwMult = cc.Agriculture.hardwareFactor
			roMult = cc.Agriculture.robotFactor
			aiMult = cc.Agriculture.aiCoreFactor
			reMult = cc.Agriculture.realEstateFactor

		break;

		case "Chemical":

			hwMult = cc.Chemical.hardwareFactor
			roMult = cc.Chemical.robotFactor
			aiMult = cc.Chemical.aiCoreFactor
			reMult = cc.Chemical.realEstateFactor

		break;
		}

	let hwStored = ns.corporation.getMaterial(div, city, "Hardware").stored
	let roStored = ns.corporation.getMaterial(div, city, "Robots").stored
	let aiStored = ns.corporation.getMaterial(div, city, "AI Cores").stored
	let reStored = ns.corporation.getMaterial(div, city, "Real Estate").stored

		ns.print(hwMult)
		ns.print(aiMult)
		ns.print(roMult)
		ns.print(reMult)

	const cityMultiplier =
		Math.pow(0.002 * aiStored + 1, aiMult) *
		Math.pow(0.002 * hwStored + 1, hwMult) *
		Math.pow(0.002 * reStored + 1, reMult) *
		Math.pow(0.002 * roStored + 1, reMult);

	let divisionProductionMultiplier = Math.max(Math.pow(cityMultiplier, 0.73), 1) * 6;

	let sfCurrQty = ns.corporation.getUpgradeLevel("Smart Factories");
	let sfLevelMult = 0.03
	let office = ns.corporation.getOffice(div, city);
	let empProd = office.employeeProductionByJob;
	let operationEmployeesProduction = empProd.Operations;
	let engineerEmployeesProduction = empProd.Engineer;
	let managementEmployeesProduction = empProd.Management;
	let totalEmployeesProduction = operationEmployeesProduction + engineerEmployeesProduction + managementEmployeesProduction

	const managementFactor = 1 + managementEmployeesProduction / (1.2 * totalEmployeesProduction);

	const employeesProductionMultiplier = (Math.pow(operationEmployeesProduction, 0.4) + Math.pow(engineerEmployeesProduction, 0.3)) * managementFactor;

	const balancingMultiplier = 0.05;

	let officeMultiplier = balancingMultiplier * employeesProductionMultiplier

	const upgradeMultiplier = 1 + sfCurrQty * sfLevelMult;

	let researchMultiplier = 1;

	return officeMultiplier * divisionProductionMultiplier * upgradeMultiplier * researchMultiplier;

}



export async function exportOpt(ns, sourceDiv, destDiv, mat) {

	let cities = cc.cities;
	let city = "";
	let exportString = "(IPROD+IINV/10)*(-1)"

	await corpState(ns, "START")

	for (city of cities) {
		ns.corporation.exportMaterial(sourceDiv, city, destDiv, city, mat, exportString)
	}

	await corpState(ns, "START")
}


export async function drPepper(ns, div, goal) {

	let office = ns.corporation.getOffice("MegaCrops", "Volhaven")
	let energyThresh = office.maxEnergy * goal
	let moraleThresh = office.maxMorale * goal

	while (office.avgEnergy < energyThresh || office.avgMorale < moraleThresh) {
		office = ns.corporation.getOffice("MegaCrops", "Volhaven")
		energyThresh = office.maxEnergy * goal
		moraleThresh = office.maxMorale * goal
		await ns.sleep(1000);
	}
}

export async function rpool(ns, div, goal) {

	let rpool = ns.corporation.getDivision(div).researchPoints
	while (rpool < goal) {
		await corpState(ns, "START")
		rpool = ns.corporation.getDivision(div).researchPoints
	}
}


export async function hrAll(ns, div, op, en, bu, ma, rd) {

	let cities = cc.cities;
	let city = "";

	await corpState(ns, "START");

	for (city of cities) {
		ns.corporation.setAutoJobAssignment(div, city, "Operations", 0)
		ns.corporation.setAutoJobAssignment(div, city, "Engineer", 0)
		ns.corporation.setAutoJobAssignment(div, city, "Business", 0)
		ns.corporation.setAutoJobAssignment(div, city, "Management", 0)
		ns.corporation.setAutoJobAssignment(div, city, "Research & Development", 0)
	}

	await corpState(ns, "START");

	for (city of cities) {
		ns.corporation.setAutoJobAssignment(div, city, "Operations", op)
		ns.corporation.setAutoJobAssignment(div, city, "Engineer", en)
		ns.corporation.setAutoJobAssignment(div, city, "Business", bu)
		ns.corporation.setAutoJobAssignment(div, city, "Management", ma)
		ns.corporation.setAutoJobAssignment(div, city, "Research & Development", rd)
	}

	await corpState(ns, "START");
}


export async function hr(ns, div, city, op, en, bu, ma, rd) {

	await corpState(ns, "START");

	ns.corporation.setAutoJobAssignment(div, city, "Operations", 0)
	ns.corporation.setAutoJobAssignment(div, city, "Engineer", 0)
	ns.corporation.setAutoJobAssignment(div, city, "Business", 0)
	ns.corporation.setAutoJobAssignment(div, city, "Management", 0)
	ns.corporation.setAutoJobAssignment(div, city, "Research & Development", 0)

	await corpState(ns, "START");

	ns.corporation.setAutoJobAssignment(div, city, "Operations", op)
	ns.corporation.setAutoJobAssignment(div, city, "Engineer", en)
	ns.corporation.setAutoJobAssignment(div, city, "Business", bu)
	ns.corporation.setAutoJobAssignment(div, city, "Management", ma)
	ns.corporation.setAutoJobAssignment(div, city, "Research & Development", rd)

	await corpState(ns, "START");
}

export function bulkPurch(ns, div, wa, fo, pl, hw, ch, ro, ai, re) {


	let divData = ns.corporation.getDivision(div);
	let cities = divData.cities;
	let city = "";

	for (city of cities) {
		ns.corporation.bulkPurchase(div, city, "Water", wa)
		ns.corporation.bulkPurchase(div, city, "Plants", pl)
		ns.corporation.bulkPurchase(div, city, "Hardware", hw)
		ns.corporation.bulkPurchase(div, city, "Chemicals", ch)
		ns.corporation.bulkPurchase(div, city, "Robots", ro)
		ns.corporation.bulkPurchase(div, city, "AI Cores", ai)
		ns.corporation.bulkPurchase(div, city, "Real Estate", re)
	}
}

export function hiring(ns, div) {

	let divData = ns.corporation.getDivision(div);
	let cities = divData.cities;
	let city = "";
	let size = 0;
	let numEmployees = 0;

	for (city of cities) {
		size = ns.corporation.getOffice(div, city).size;
		numEmployees = ns.corporation.getOffice(div, city).numEmployees;
		let posLeft = size - numEmployees;
		while (posLeft > 0) {
			ns.corporation.hireEmployee(div, city)
			size = ns.corporation.getOffice(div, city).size;
			numEmployees = ns.corporation.getOffice(div, city).numEmployees;
			posLeft = size - numEmployees;
		}
		ns.corporation.hireEmployee(div, city)
	}
}

export async function officeSpace(ns, div, goal) {

	let cost = 0;
	let divData = ns.corporation.getDivision(div);
	let cities = divData.cities;
	let city = "";
	let size = 0;
	let upgCount = upgOfficeLeft(ns, div, goal);

	while (upgCount > 0) {

		upgCount = upgOfficeLeft(ns, div, goal);
		cost = upgOfficeCost(ns, div, goal);
		let funds = ns.corporation.getCorporation().funds
		while (funds < cost) {
			funds = ns.corporation.getCorporation().funds
			await ns.sleep(1000)
		}
		for (city of cities) {
			size = ns.corporation.getOffice(div, city).size
			if (size < goal) {
				ns.corporation.upgradeOfficeSize(div, city, 1)
			}
		}
		await ns.sleep(100)
	}
}

export function upgOfficeCost(ns, div, goal) {

	let cost = 0
	let divData = ns.corporation.getDivision(div);
	let cities = divData.cities;
	let city = "";

	for (city of cities) {
		let citySize = ns.corporation.getOffice(div, city).size
		let cityUpgCost = ns.corporation.getOfficeSizeUpgradeCost(div, city, 1)
		if (citySize < goal) {
			cost += cityUpgCost
		}
	}
	return cost;
}

export function upgOfficeLeft(ns, div, goal) {

	let upgCount = 0
	let divData = ns.corporation.getDivision(div);
	let cities = divData.cities;
	let city = "";

	for (city of cities) {
		let citySize = ns.corporation.getOffice(div, city).size
		if (citySize < goal) {
			upgCount++
		}
	}
	return upgCount;
}

export async function speechPI(ns, goal) {

	let spiCurrQty = ns.corporation.getUpgradeLevel("Speech Processor Implants");
	let funds = ns.corporation.getCorporation().funds
	let cost = await ns.corporation.getUpgradeLevelCost("Speech Processor Implants");
	while (spiCurrQty < goal) {
		cost = await ns.corporation.getUpgradeLevelCost("Speech Processor Implants");
		funds = ns.corporation.getCorporation().funds
		while (funds < cost) {
			await ns.sleep(1000)
			funds = ns.corporation.getCorporation().funds
		}
		ns.corporation.levelUpgrade("Speech Processor Implants")
		spiCurrQty = ns.corporation.getUpgradeLevel("Speech Processor Implants");
	}
	ns.print("Buying Speech Processor Implants, our level is now " + spiCurrQty)
}

export async function focuswires(ns, goal) {

	let fCurrQty = ns.corporation.getUpgradeLevel("FocusWires");
	let funds = ns.corporation.getCorporation().funds
	let cost = await ns.corporation.getUpgradeLevelCost("FocusWires");
	while (fCurrQty < goal) {
		cost = await ns.corporation.getUpgradeLevelCost("FocusWires");
		funds = ns.corporation.getCorporation().funds
		while (funds < cost) {
			await ns.sleep(1000)
			funds = ns.corporation.getCorporation().funds
		}
		ns.corporation.levelUpgrade("FocusWires")
		fCurrQty = ns.corporation.getUpgradeLevel("FocusWires");
	}
	ns.print("Buying FocusWires, our level is now " + fCurrQty)
}

export async function nNII(ns, goal) {

	let nniiCurrQty = ns.corporation.getUpgradeLevel("Nuoptimal Nootropic Injector Implants");
	let funds = ns.corporation.getCorporation().funds
	let cost = await ns.corporation.getUpgradeLevelCost("Nuoptimal Nootropic Injector Implants");
	while (nniiCurrQty < goal) {
		cost = await ns.corporation.getUpgradeLevelCost("Nuoptimal Nootropic Injector Implants");
		funds = ns.corporation.getCorporation().funds
		while (funds < cost) {
			await ns.sleep(1000)
			funds = ns.corporation.getCorporation().funds
		}
		ns.corporation.levelUpgrade("Nuoptimal Nootropic Injector Implants")
		nniiCurrQty = ns.corporation.getUpgradeLevel("Nuoptimal Nootropic Injector Implants");
	}
	ns.print("Buying Nuoptimal Nootropic Injector Implants, our level is now " + nniiCurrQty)
}

export async function projectInsight(ns, goal) {

	let piCurrQty = ns.corporation.getUpgradeLevel("Project Insight");
	let funds = ns.corporation.getCorporation().funds
	let cost = await ns.corporation.getUpgradeLevelCost("Project Insight");
	while (piCurrQty < goal) {
		cost = await ns.corporation.getUpgradeLevelCost("Project Insight");
		funds = ns.corporation.getCorporation().funds
		while (funds < cost) {
			await ns.sleep(1000)
			funds = ns.corporation.getCorporation().funds
		}
		ns.corporation.levelUpgrade("Project Insight")
		piCurrQty = ns.corporation.getUpgradeLevel("Project Insight");
	}
	ns.print("Buying Project Insight, our level is now " + piCurrQty)
}

export async function neuralAcc(ns, goal) {

	let naCurrQty = ns.corporation.getUpgradeLevel("Neural Accelerators");
	let funds = ns.corporation.getCorporation().funds
	let cost = await ns.corporation.getUpgradeLevelCost("Neural Accelerators");
	while (naCurrQty < goal) {
		cost = await ns.corporation.getUpgradeLevelCost("Neural Accelerators");
		funds = ns.corporation.getCorporation().funds
		while (funds < cost) {
			await ns.sleep(1000)
			funds = ns.corporation.getCorporation().funds
		}
		ns.corporation.levelUpgrade("Neural Accelerators")
		naCurrQty = ns.corporation.getUpgradeLevel("Neural Accelerators");
	}
	ns.print("Buying Neural Accelerators, our level is now " + naCurrQty)
}


export async function wilson(ns, goal) {

	let wCurrQty = ns.corporation.getUpgradeLevel("Wilson Analytics");
	let funds = ns.corporation.getCorporation().funds
	let cost = await ns.corporation.getUpgradeLevelCost("Wilson Analytics");
	while (wCurrQty < goal) {
		cost = await ns.corporation.getUpgradeLevelCost("Wilson Analytics");
		funds = ns.corporation.getCorporation().funds
		while (funds < cost) {
			await ns.sleep(1000)
			funds = ns.corporation.getCorporation().funds
		}
		ns.corporation.levelUpgrade("Wilson Analytics")
		wCurrQty = ns.corporation.getUpgradeLevel("Wilson Analytics");
	}
	ns.print("Buying Wilson Analytics, our level is now " + wCurrQty)
}

export async function wareSpace(ns, div, goal) {

	let cost = 0;
	let divData = ns.corporation.getDivision(div);
	let cities = divData.cities;
	let city = "";
	let upgCount = upgWarehouseLeft(ns, div, goal);

	while (upgCount > 0) {

		upgCount = upgWarehouseLeft(ns, div, goal);
		cost = upgWarehouseCost(ns, div, goal);
		let funds = ns.corporation.getCorporation().funds
		while (funds < cost) {
			funds = ns.corporation.getCorporation().funds
			await ns.sleep(1000)
		}
		for (city of cities) {
			if (ns.corporation.getWarehouse(div, city).level < goal) {
				ns.corporation.upgradeWarehouse(div, city, 1)
			}
		}
		await ns.sleep(100)
	}
}

export function upgWarehouseCost(ns, div, goal) {

	let cost = 0
	let divData = ns.corporation.getDivision(div);
	let cities = divData.cities;
	let city = "";

	for (city of cities) {
		let citySize = ns.corporation.getWarehouse(div, city).level
		let cityUpgCost = ns.corporation.getUpgradeWarehouseCost(div, city)
		if (citySize < goal) {
			cost += cityUpgCost
		}
	}
	return cost;
}

export function upgWarehouseLeft(ns, div, goal) {

	let upgCount = 0
	let divData = ns.corporation.getDivision(div);
	let cities = divData.cities;
	let city = "";


	for (city of cities) {
		let citySize = ns.corporation.getWarehouse(div, city).level
		if (citySize < goal) {
			upgCount++
		}
	}
	return upgCount;
}

export async function smartFactories(ns, goal) {

	let sfCurrQty = ns.corporation.getUpgradeLevel("Smart Factories");
	let funds = ns.corporation.getCorporation().funds
	let cost = await ns.corporation.getUpgradeLevelCost("Smart Factories");
	while (sfCurrQty < goal) {
		cost = await ns.corporation.getUpgradeLevelCost("Smart Factories");
		funds = ns.corporation.getCorporation().funds
		while (funds < cost) {
			await ns.sleep(1000)
			funds = ns.corporation.getCorporation().funds
		}
		ns.corporation.levelUpgrade("Smart Factories")
		sfCurrQty = ns.corporation.getUpgradeLevel("Smart Factories");
	}
	ns.print("Buying Smart Factories, our level is now " + sfCurrQty)
}

export async function smartStorage(ns, goal) {

	let ssCurrQty = ns.corporation.getUpgradeLevel("Smart Storage");
	let funds = ns.corporation.getCorporation().funds
	let cost = await ns.corporation.getUpgradeLevelCost("Smart Storage");
	while (ssCurrQty < goal) {
		cost = await ns.corporation.getUpgradeLevelCost("Smart Storage");
		funds = ns.corporation.getCorporation().funds
		while (funds < cost) {
			await ns.sleep(1000)
			funds = ns.corporation.getCorporation().funds
		}
		ns.corporation.levelUpgrade("Smart Storage")
		ssCurrQty = ns.corporation.getUpgradeLevel("Smart Storage");
	}
	ns.print("Buying Smart Storage, our level is now " + ssCurrQty)
}

export async function salesBots(ns, goal) {

	let botCurrQty = ns.corporation.getUpgradeLevel("ABC SalesBots");
	let funds = ns.corporation.getCorporation().funds
	let cost = await ns.corporation.getUpgradeLevelCost("ABC SalesBots");
	while (botCurrQty < goal) {
		cost = await ns.corporation.getUpgradeLevelCost("ABC SalesBots");
		funds = ns.corporation.getCorporation().funds
		while (funds < cost) {
			await ns.sleep(1000)
			funds = ns.corporation.getCorporation().funds
		}
		ns.corporation.levelUpgrade("ABC SalesBots")
		botCurrQty = ns.corporation.getUpgradeLevel("ABC SalesBots");
	}
	ns.print("Buying ABC Sales Bots we now have " + botCurrQty)
}

export async function adVerts(ns, div, goal) {

	let adCurrQty = ns.corporation.getHireAdVertCount(div);
	let funds = ns.corporation.getCorporation().funds
	let cost = await ns.corporation.getHireAdVertCost(div);;
	while (adCurrQty < goal) {
		cost = await ns.corporation.getHireAdVertCost(div);;
		funds = ns.corporation.getCorporation().funds
		while (funds < cost) {
			await ns.sleep(1000)
			funds = ns.corporation.getCorporation().funds
		}
		ns.corporation.hireAdVert(div)
		adCurrQty = ns.corporation.getHireAdVertCount(div);
	}
	ns.print("Hiring adVert for " + div + " our adVert level is now " + adCurrQty)
}

export async function investOffer(ns) {

	let round1Funds = cc.offerFuundsReq.round1;
	let round2Funds = cc.offerFuundsReq.round2;
	let round3Funds = cc.offerFuundsReq.round3;
	let round4Funds = cc.offerFuundsReq.round4;
	let round = ns.corporation.getInvestmentOffer().round;
	let offer = ns.corporation.getInvestmentOffer().funds;
	let req = 0;

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

	while (offer < req) {
		round = ns.corporation.getInvestmentOffer().round;
		offer = ns.corporation.getInvestmentOffer().funds;
		await ns.sleep(50)
	}
	ns.print(`Accepting an investment offer for $${ns.formatNumber(offer, 2)} `);
	ns.corporation.acceptInvestmentOffer();
	round = ns.corporation.getInvestmentOffer().round;
	ns.print(`We are now in round ${ns.formatNumber(round, 0)} `);
}

export async function trafficManagement(ns) {

	let busy = ns.peek(10050101);
	let counter = 0;
	while (busy == "true") {
		ns.print("Waiting, waiting, always with the waiting!")
		await ns.sleep(1000)
		counter++
		ns.print(counter)
		busy = ns.peek(10050101);
	}
	ns.print("Green light, let's go!")
}

export function teaParty(ns) {

	let divisions = ns.corporation.getCorporation().divisions
	let city = "";
	let cost = 100000


	for (let div of divisions) {
		let divData = ns.corporation.getDivision(div);
		let cities = divData.cities;

		for (city of cities) {
			let office = ns.corporation.getOffice(div, city)
			let energyThresh = office.maxEnergy * .99
			let moraleThresh = office.maxMorale * .99
			if (office.numEmployees > 0) {
				if (office.avgEnergy < energyThresh) {
					try {
						ns.corporation.buyTea(div, city)
						ns.print("Fancy a cop 'o tea? in " + city + " at " + div)
					} catch {

					}
				}
				if (office.avgMorale < moraleThresh) {
					try {
						ns.corporation.throwParty(div, city, cost)
						ns.print("Time to Paaaaaaaarrrrrrty! in " + city + " at " + div)
					} catch {

					}
				}
			}
		}
	}
}

export async function boostMatsMax(ns, div, hw, ro, ai, re) {

	let divData = ns.corporation.getDivision(div);
	let cities = divData.cities;
	let city = "";
	let citiesComplete = [];
	let compCounter = 0;

	while (compCounter < 6) {

		await corpState(ns, "START")

		for (city of cities) {
			if (citiesComplete.includes != city) {

				// ns.print("Managing boost materials for:- " + div + ":" + city)

				let hwN = "Hardware";
				let roN = "Robots";
				let aiN = "AI Cores";
				let reN = "Real Estate";

				let hwQty = ns.corporation.getMaterial(div, city, "Hardware").stored;
				let roQty = ns.corporation.getMaterial(div, city, "Robots").stored;
				let aiQty = ns.corporation.getMaterial(div, city, "AI Cores").stored;
				let reQty = ns.corporation.getMaterial(div, city, "Real Estate").stored;

				let finished = 0;

				if (hwQty < hw || hwQty > hw * 1.02) {
					manHW(ns, div, city, hw)
				} else {
					ns.corporation.buyMaterial(div, city, hwN, 0)
					ns.corporation.sellMaterial(div, city, hwN, 0, "MP");
					finished++
				}
				if (roQty < ro || roQty > ro * 1.02) {
					manRo(ns, div, city, ro)
				} else {
					ns.corporation.buyMaterial(div, city, roN, 0)
					ns.corporation.sellMaterial(div, city, roN, 0, "MP");
					finished++
				}
				if (aiQty < ai || aiQty > ai * 1.02) {
					manAI(ns, div, city, ai)
				} else {
					ns.corporation.buyMaterial(div, city, aiN, 0)
					ns.corporation.sellMaterial(div, city, aiN, 0, "MP");
					finished++
				}
				if (reQty < re || reQty > re * 1.02) {
					manRE(ns, div, city, re)
				} else {
					ns.corporation.buyMaterial(div, city, reN, 0)
					ns.corporation.sellMaterial(div, city, reN, 0, "MP");
					finished++
				}
				if (finished == 4) {
					citiesComplete.push(city);
					}
			}
		}
		compCounter = 0;
		for (let place of citiesComplete) {
			compCounter++
		}
	}
		ns.print("Completed buyimg Boost Materials in " + div + " for " + citiesComplete)
}

export function manHW(ns, div, city, maxQty) {

	let mat = "Hardware"
	let matQty = ns.corporation.getMaterial(div, city, mat).stored
	let purQty = 0;

	if (matQty < maxQty) {
		purQty = (maxQty - matQty) / 10
		//	if (matQty > maxQty * .8) {
		//	purQty = (maxQty - matQty) / 100
		//}
		ns.corporation.sellMaterial(div, city, mat, 0, "MP");
		ns.corporation.buyMaterial(div, city, mat, purQty)
	} else if (matQty > maxQty * 1.02) {
		ns.corporation.buyMaterial(div, city, mat, 0)
		ns.corporation.sellMaterial(div, city, mat, (matQty - maxQty) / 100, "MP");
	} else {
		ns.corporation.buyMaterial(div, city, mat, 0)
	}
}

export function manRo(ns, div, city, maxQty) {

	let mat = "Robots"
	let matQty = ns.corporation.getMaterial(div, city, mat).stored
	let purQty = 0;

	if (matQty < maxQty) {
		purQty = (maxQty - matQty) / 10
		//if (matQty > maxQty * .8) {
		//purQty = (maxQty - matQty) / 100
		//}
		ns.corporation.sellMaterial(div, city, mat, 0, "MP");
		ns.corporation.buyMaterial(div, city, mat, purQty)
	} else if (matQty > maxQty * 1.02) {
		ns.corporation.buyMaterial(div, city, mat, 0)
		ns.corporation.sellMaterial(div, city, mat, (matQty - maxQty) / 100, "MP");
	} else {
		ns.corporation.buyMaterial(div, city, mat, 0)
	}
}

export function manAI(ns, div, city, maxQty) {

	let mat = "AI Cores"
	let matQty = ns.corporation.getMaterial(div, city, mat).stored
	let purQty = 0;

	if (matQty < maxQty) {
		purQty = (maxQty - matQty) / 10
		//if (matQty > maxQty * .8) {
		//purQty = (maxQty - matQty) / 100
		//}
		ns.corporation.sellMaterial(div, city, mat, 0, "MP");
		ns.corporation.buyMaterial(div, city, mat, purQty)
	} else if (matQty > maxQty * 1.02) {
		ns.corporation.buyMaterial(div, city, mat, 0)
		ns.corporation.sellMaterial(div, city, mat, (matQty - maxQty) / 100, "MP");
	} else {
		ns.corporation.buyMaterial(div, city, mat, 0)
	}
}

export function manRE(ns, div, city, maxQty) {

	let mat = "Real Estate"
	let matQty = ns.corporation.getMaterial(div, city, mat).stored
	let purQty = 0;

	if (matQty < maxQty) {
		purQty = (maxQty - matQty) / 10
		//if (matQty > maxQty * .8) {
		//purQty = (maxQty - matQty) / 100
		//}
		ns.corporation.sellMaterial(div, city, mat, 0, "MP");
		ns.corporation.buyMaterial(div, city, mat, purQty);
	} else if (matQty > maxQty * 1.02) {
		ns.corporation.buyMaterial(div, city, mat, 0)
		ns.corporation.sellMaterial(div, city, mat, (matQty - maxQty) / 100, "MP");
	} else {
		ns.corporation.buyMaterial(div, city, mat, 0);
	}
}
/*
export async function cloggedPipes(ns, div, city) {

		corpState(ns, state)

	let divType = ns.corporation.getDivision(div).type
	
	switch (divType) {

		case "Agriculture":

		let size = ns.corporation.getWarehouse().size
		let sizeUsed = ns.corporation.getWarehouse().sizeUsed
		let perc = sizeUsed / size
		

		if (

			hwMult = cc.Agriculture.hardwareFactor
			roMult = cc.Agriculture.robotFactor
			aiMult = cc.Agriculture.aiCoreFactor
			reMult = cc.Agriculture.realEstateFactor

		break;

		case "Chemical":

			hwMult = cc.Chemical.hardwareFactor
			roMult = cc.Chemical.robotFactor
			aiMult = cc.Chemical.aiCoreFactor
			reMult = cc.Chemical.realEstateFactor

		break;
		}




}
*/

export async function corpStateWaitCycles(ns, cycles) {

	let counter = 0

	while (counter < cycles){

	let last = await ns.corporation.nextUpdate();
	while (last != "START") {
		await ns.sleep(20)
		last = await ns.corporation.nextUpdate();
	}
	counter++
	ns.print(counter)
	}
}


export async function corpState(ns, state) {

	let last = await ns.corporation.nextUpdate();
	while (last != state) {
		await ns.sleep(20)
		last = await ns.corporation.nextUpdate();
	}
	//ns.print("Go!")
}

export function smartSupplyAgri(ns, div, city) {

	let input1 = "Water"
	let input2 = "Chemicals"
	let pur1Mult = cc.Agriculture.requiredMaterials.Water
	let pur2Mult = cc.Agriculture.requiredMaterials.Chemicals
	let input1Stored = ns.corporation.getMaterial(div, city, input1).stored
	let input2Stored = ns.corporation.getMaterial(div, city, input2).stored
	let pur1 = 0
	let pur2 = 0

	let prod = cityRawProd(ns, div, city)
	pur1 = ((prod * pur1Mult * 10) - input1Stored) / 10
	if (pur1 > 0) {
		ns.corporation.buyMaterial(div, city, input1, pur1)
	} else {
		ns.corporation.buyMaterial(div, city, input1, 0)
	}

	pur2 = ((prod * pur2Mult * 10) - input2Stored) / 10
	if (pur2 > 0) {
		ns.corporation.buyMaterial(div, city, input2, pur2)
	} else {
		ns.corporation.buyMaterial(div, city, input2, 0)
	}
}

export function smartSupplyChem(ns, div, city) {

	let input1 = "Water"
	let input2 = "Plants"
	let pur1Mult = cc.Chemical.requiredMaterials.Water
	let pur2Mult = cc.Chemical.requiredMaterials.Plants
	let input1Stored = ns.corporation.getMaterial(div, city, input1).stored
	let input2Stored = ns.corporation.getMaterial(div, city, input2).stored
	let pur1 = 0
	let pur2 = 0

	let prod = cityRawProd(ns, div, city)
	pur1 = ((prod * pur1Mult * 10) - input1Stored) / 10
	if (pur1 > 0) {
		ns.corporation.buyMaterial(div, city, input1, pur1)
	} else {
		ns.corporation.buyMaterial(div, city, input1, 0)
	}

	pur2 = ((prod * pur2Mult * 10) - input2Stored) / 10
	if (pur2 > 0) {
		ns.corporation.buyMaterial(div, city, input2, pur2)
	} else {
		ns.corporation.buyMaterial(div, city, input2, 0)
	}
}

export async function createCorp(ns, name) {

	let bn = ns.getResetInfo().currentNode
	let poss = "";

	if (bn == 3) {
		poss = ns.corporation.canCreateCorporation(false);
		if (poss == "Success") {
			ns.corporation.createCorporation(name, false)
		}
	} else {
		poss = ns.corporation.canCreateCorporation(true)
		if (poss == "Success") {
			ns.corporation.createCorporation(name, true)
		}
	}
	ns.print(poss)
	await ns.sleep(200)
}

export async function createDiv(ns, divType, name) {

	let divisions = ns.corporation.getCorporation().divisions;
	let create = true;

	for (let div of divisions) {
		let type = ns.corporation.getDivision(div).type;
		if (type == divType) {
			create = false;
		}
	}
	if (create == true) {
		ns.corporation.expandIndustry(divType, name)
	}
	await ns.sleep(100);
}

export async function expandDiv(ns, div) {

	let expCities = cc.expCities;
	let city = "";

	for (city of expCities) {
		if (ns.corporation.hasWarehouse(div, city) == false) {
			let funds = ns.corporation.getCorporation().funds
			let cost = 4.0e9
			while (funds < cost) {
				await ns.sleep(1000)
				funds = ns.corporation.getCorporation().funds
			}
			try {
				ns.corporation.expandCity(div, city)
			} catch {
			}
		}
	}
}

export async function firstWare(ns, div) {

	let expCities = cc.expCities;
	let city = "";

	for (city of expCities) {
		if (ns.corporation.hasWarehouse(div, city) == false) {
			let funds = ns.corporation.getCorporation().funds
			let cost = 5.0e9
			while (funds < cost) {
				await ns.sleep(1000)
				funds = ns.corporation.getCorporation().funds
			}
			ns.corporation.purchaseWarehouse(div, city)
		}
	}
}
