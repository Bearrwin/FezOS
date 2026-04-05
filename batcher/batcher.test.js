/** @param {NS} ns */
export async function main(ns) {

	// 	run batcher.pservPool.js phantasy 1 2 1 1000 10

	await ns.sleep(1000)
	ns.ui.openTail(50, 50)
	//ns.ui.moveTail(1450, 540)
	ns.ui.resizeTail(500, 150)

	let target = ns.args[0];
	let weakThreads = ns.args[1];
	let growThreads = ns.args[2];
	let hackThreads = ns.args[3];
	let delayms = ns.args[4];
	let burstSize = ns.args[5];
	let burstcounter = burstSize


	/* 		let target = ns.getServer(hackTarget)
			let player = ns.getPlayer()
			target.hackDifficulty = target.minDifficulty
			let addHMSec = ns.formulas.hacking.weakenTime(target, player) - ns.formulas.hacking.hackTime(target, player)
			let addGMSec = ns.formulas.hacking.weakenTime(target, player) - ns.formulas.hacking.growTime(target, player)
			//ns.print(addHMSec)
			//ns.print(addGMSec)
	 */

	let addHMSec = ns.getWeakenTime(target) - ns.getHackTime(target)
	let addGMSec = ns.getWeakenTime(target) - ns.getGrowTime(target)

	let sec = ns.getServerSecurityLevel(target);
	let minSec = ns.getServerMinSecurityLevel(target);
	let money = ns.getServerMoneyAvailable(target);
	if (money === 0) {
		money = 1;
	}
	let maxMoney = ns.getServerMaxMoney(target);




	let nextHost = false
	let haveHost = false
	let purchServList = ns.getPurchasedServers()
	let scriptOne = "FezOS/ammo/cw1.single.js"
	let scriptTwo = "FezOS/ammo/cg1.single.js"
	let scriptThree = "FezOS/ammo/ch1.single.js"
	let scriptRam = ((ns.getScriptRam(scriptOne) * weakThreads) + (ns.getScriptRam(scriptTwo) * growThreads) + (ns.getScriptRam(scriptThree) * hackThreads))
	let reserveHomeRam = 64

	//await ns.sleep(5000);
	while (true) {
		sec = ns.getServerSecurityLevel(target);
		minSec = ns.getServerMinSecurityLevel(target);
		money = ns.getServerMoneyAvailable(target);
		if (money === 0) {
			money = 1;
		}
		maxMoney = ns.getServerMaxMoney(target);

		burstcounter = burstSize
		while (burstcounter > 0) {
			purchServList = ns.getPurchasedServers()
			for (let server of purchServList) {
				if (haveHost == false) {
					if (Math.floor(ns.getServerMaxRam(server) - ns.getServerUsedRam(server)) > (scriptRam)) {
						haveHost = true
						nextHost = server
					} else {
						haveHost = false
					}
				}
			}
			if (haveHost == false) {
				if ((Math.floor(ns.getServerMaxRam("home") - ns.getServerUsedRam("home")) - reserveHomeRam) > (scriptRam * 3)) {
					haveHost = true
					nextHost = "home"
				} else {
					haveHost = false
				}
			}
			if (haveHost == true) {
				//ns.exec("FezOS/ammo/ch1.single.js", (nextHost), (hackThreads), (target), (addHMSec));
				//ns.exec("FezOS/ammo/cg1.single.js", (nextHost), (growThreads), (target), (addGMSec));


 				if (sec < (minSec + 5) && money > (maxMoney * 0.5)){
 				ns.exec("FezOS/ammo/ch1.single.js", (nextHost), (hackThreads), (target));
			}
			if (sec < (minSec +5)) {
				ns.exec("FezOS/ammo/cg1.single.js", (nextHost), (growThreads), (target));
			}
			ns.exec("FezOS/ammo/cw1.single.js", (nextHost), (weakThreads), (target));

			haveHost = false

		}
		burstcounter--
	}
	await ns.sleep(delayms);
}




}