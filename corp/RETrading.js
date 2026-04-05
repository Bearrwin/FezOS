/** @param {NS} ns */
import {
	reTrading
} from "FezOS/func/func.js";

export async function main(ns) {

	ns.ui.openTail();
	ns.ui.resizeTail(300, 130);
	ns.ui.moveTail(75, 75);
	//	ns.disableLog("sleep")

	let sourceDiv = "";
	let sourceCity = "";
	let destDiv = "";
	let destCity = "";

	let cities = ["Aevum", "Chongqing", "Ishima", "New Tokyo", "Sector-12", "Volhaven"]
	let divisions = ns.corporation.getCorporation().divisions;
	//let mat = "Real Estate";
	let materials = ["Hardware", "Robots", "AI Cores", "Real Estate"]
	let div = "";
	let city = "";
	let mat = "";
	let qty = 100;
	
	
	
	while (true) {
	
		for (div of divisions) {
			for (city of cities) {
				for (mat of materials){
					let matDetails = ns.corporation.getMaterial(div, city, mat).exports;
							ns.corporation.sellMaterial(div, city, mat, "Max", "MP")
	
					if (matDetails != ""){
					ns.print(div + ":" + city + " " + mat)
					ns.print(matDetails)
					let expDiv = matDetails[0].division
					let expCity = matDetails[0].city
					let expAmount = matDetails[0].amount
					ns.print(expAmount + " -- " + mat + " from " + div + ":" + city + " to " + expDiv + ":" + expCity)
					
					if (expDiv != undefined) {
							await ns.corporation.cancelExportMaterial(div, city, expDiv, expCity, mat);
							ns.print("Cancelling --------------")
					}
					}
				}
			}
		}
	
	await ns.sleep(12000)



		let last = await ns.corporation.nextUpdate();
		while (last != "PURCHASE") {
			await ns.sleep(20)
			last = await ns.corporation.nextUpdate();
		}

		for (mat of materials) {
			let next = reTrading(ns, mat)
			let sourceDiv = next[0];
			let sourceCity = next[1];
			let lowPrice = next[2];
			let div = "MegaCrops"
			ns.corporation.buyMaterial(div, sourceCity, mat, qty * 5)

			//for (div of divisions) {
				for (city of cities) {
						if (city != sourceCity) {
							ns.corporation.exportMaterial(sourceDiv, sourceCity, div, city, mat, qty)
						ns.print("Starting Export")
						}
					}
				}
			//}
		}
		await ns.sleep(60000)
	}
