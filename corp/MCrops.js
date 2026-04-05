/** @param {NS} ns */
import {
	boostMatsMax
} from "FezOS/func/func.js";

export async function main(ns) {


	ns.ui.openTail();
	ns.ui.resizeTail(300, 130);
	ns.ui.moveTail(75, 75);
	ns.disableLog("sleep")

	let type = "Agriculture"
	let div = "MegaCrops"
	let cities = ["Aevum", "Chongqing", "Ishima", "New Tokyo", "Sector-12", "Volhaven"]
	let materials = ["Hardware", "AI Cores", "Robots", "Real Estate"]
	let city = ""
	let rp = 0
	let rpThreshOne = 55

	ns.corporation.expandIndustry(type, div)

	await ns.sleep(100)

	for (city of cities) {
		if (city != "Sector-12") {
			ns.corporation.expandCity(div, city)
		}
		await ns.sleep(10)
	}

	for (city of cities) {
		if (city != "Sector-12") {
			ns.corporation.purchaseWarehouse(div, city)
		}
		await ns.sleep(10)
	}

	await ns.sleep(100)

	for (city of cities) {
		ns.corporation.upgradeWarehouse(div, city, 4)
		await ns.sleep(10)
	}

	ns.corporation.hireAdVert("MegaCrops")
	ns.corporation.hireAdVert("MegaCrops")

	for (city of cities) {
		ns.corporation.upgradeOfficeSize(div, city, 1)
		await ns.sleep(100)
		ns.corporation.hireEmployee(div, city)
		ns.corporation.hireEmployee(div, city)
		ns.corporation.hireEmployee(div, city)
		ns.corporation.hireEmployee(div, city)
		await ns.sleep(100)
		ns.run("FezOS/corp/hr.js", 1, div, city, 0, 0, 0, 0, 4);
	}

	rp = ns.corporation.getDivision(div).researchPoints
	while (rp < rpThreshOne) {
		await ns.sleep(1000)
		rp = ns.corporation.getDivision(div).researchPoints
	}



	for (city of cities) {
		ns.corporation.sellMaterial(div, city, "Plants", "Max", "MP")
		ns.corporation.sellMaterial(div, city, "Food", "Max", "MP")
	}

	for (city of cities) {
		ns.run("FezOS/corp/hr.js", 1, div, city, 1, 1, 1, 1, 0);
	}
	ns.run("FezOS/corp/smartSupply.js");
	ns.run("FezOS/corp/teaParty.js");
	
		let office = ns.corporation.getOffice("MegaCrops", "Sector-12")
			let energyThresh = office.maxEnergy * .98
			let moraleThresh = office.maxMorale * .99

			while (office.avgEnergy < energyThresh || office.avgMorale < moraleThresh) {
			office = ns.corporation.getOffice("MegaCrops", "Sector-12")
			energyThresh = office.maxEnergy * .99
			moraleThresh = office.maxMorale * .99
			await ns.sleep(1000);
			}

	let finished = false
	while (finished == false) {
		let matsDone = 0
		let counter = 0
		let hw = 1791
		let ro = 0
		let ai = 1562
		let re = 98470
					
		let hwQty = ns.corporation.getMaterial(div, "Sector-12", "Hardware").stored
		let roQty = ns.corporation.getMaterial(div, "Sector-12", "Robots").stored
		let aiQty = ns.corporation.getMaterial(div, "Sector-12", "AI Cores").stored
		let reQty = ns.corporation.getMaterial(div, "Sector-12", "Real Estate").stored
			if (hwQty >= hw){
				matsDone++
			}
			if (roQty >= ro){
				matsDone++
			}
			if (aiQty >= ai){
				matsDone++
			}
			if (reQty >= re){
				matsDone++
			}
			if (matsDone == 4) {
				finished = true
			}


		let last = await ns.corporation.nextUpdate();
		while (last != "SALE") {
			await ns.sleep(20)
			last = await ns.corporation.nextUpdate();
		}
		
		boostMatsMax(ns, div, hw, ro, ai, re)
		counter++
		ns.print(counter)

	}


}



/*

	await ns.sleep(15000)
	ns.kill("FezOS/corp/boostMats.js");

		await ns.sleep(15000)

	while (true) {
		for (city of cities) {
			for (let mat of materials) {
				let sold = ns.corporation.getMaterial(div, city, mat).actualSellAmount;
				ns.print(sold)
				let buy = sold

				ns.corporation.sellMaterial(div, city, mat, "Max", "MP");
				ns.corporation.buyMaterial(div, city, mat, buy)
			}
			await ns.sleep(10)
		}
	}
}

	for (city of cities) {
		ns.corporation.buyMaterial(div, city, "Real Estate", 1000)
	}

	let usedSize = 0
	let totalSize = 1000

	while (usedSize < (totalSize * 0.95)) {

		for (let city of cities) {

			try {
				let whouse = ns.corporation.getWarehouse(div, city);
				let wSize = whouse.size
				let uSize = whouse.sizeUsed
				totalSize += wSize
				usedSize += uSize
			} catch {
			}
		}
		await ns.sleep(1000)

	}
}





/*
	ns.corporation.purchaseUnlock("Smart Supply")
	await ns.sleep(100)
	
	ns.corporation.setSmartSupply("MegaCrops", "Aevum", true)
	ns.corporation.setSmartSupply("MegaCrops", "Chongqing", true)
	ns.corporation.setSmartSupply("MegaCrops", "Ishima", true)
	ns.corporation.setSmartSupply("MegaCrops", "New Tokyo", true)
	ns.corporation.setSmartSupply("MegaCrops", "Sector-12", true)
	ns.corporation.setSmartSupply("MegaCrops", "Volhaven", true)
*/
