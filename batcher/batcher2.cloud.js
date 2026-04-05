/** @param {NS} ns */
export async function main(ns) {

		
	ns.ui.openTail(50, 50);
	//ns.ui.moveTail(1450, 540);
	ns.ui.resizeTail(500, 150);
	let currTarg = ns.peek(10020201);
	let currWeak = ns.peek(10020202);
	let currGrow = ns.peek(10020203);
	let currHack = ns.peek(10020204);
	let currDelay = ns.peek(10020205);
	let currBurst = ns.peek(10020206);
	ns.ui.setTailTitle("Batcher 1 " + currTarg + " " + currWeak + " " + currGrow + " " + currHack +" " + currDelay + " " + currBurst + " ");

	let sec = ns.getServerSecurityLevel(currTarg);
	let minSec = ns.getServerMinSecurityLevel(currTarg);
	let money = ns.getServerMoneyAvailable(currTarg);
	if (money === 0) {
		money = 1;
	}
	let maxMoney = ns.getServerMaxMoney(currTarg);

	let burstcounter = currBurst;

		let nextHost = false;
		let haveHost = false;
		let purchServList = ns.getPurchasedServers();
		let scriptOne = "FezOS/ammo/cw1.single.js";
		let scriptTwo = "FezOS/ammo/cg1.single.js";
		let scriptThree = "FezOS/ammo/ch1.single.js";
		let scriptRam = ((ns.getScriptRam(scriptOne) * currWeak ) + (ns.getScriptRam(scriptTwo) * currGrow) + (ns.getScriptRam(scriptThree) * currHack));
		let reserveHomeRam = 64;

		//await ns.sleep(5000);
		while (true) {
			sec = ns.getServerSecurityLevel(currTarg);
			minSec = ns.getServerMinSecurityLevel(currTarg);
			money = ns.getServerMoneyAvailable(currTarg);
			if (money === 0) {
				money = 1;
			}
			maxMoney = ns.getServerMaxMoney(currTarg);

			burstcounter = currBurst;
	currTarg = ns.peek(10020201);
	currWeak = ns.peek(10020202);
	currGrow = ns.peek(10020203);
	currHack = ns.peek(10020204);
	currDelay = ns.peek(10020205);
	currBurst = ns.peek(10020206);
	ns.ui.setTailTitle("Batcher 1 " + currTarg + " " + currWeak + " " + currGrow + " " + currHack +" " + currDelay + " " + currBurst + " ");

			while (burstcounter > 0) {

				purchServList = ns.getPurchasedServers()
					for (let server of purchServList) {
						if (haveHost == false) {
							if (Math.floor(ns.getServerMaxRam(server) - ns.getServerUsedRam(server)) > (scriptRam)) {
								haveHost = true;
									nextHost = server;
							} else {
								haveHost = false;
							}
						}
					}
					if (haveHost == false) {
						if ((Math.floor(ns.getServerMaxRam("home") - ns.getServerUsedRam("home")) - reserveHomeRam) > (scriptRam * 2)) {
							haveHost = true;
								nextHost = "home";
						} else {
							haveHost = false;
						}
					}
					if (haveHost == true) {

						if (sec < (minSec + 5) && money > (maxMoney * 0.5)) {
							ns.exec("FezOS/ammo/ch1.single.js", (nextHost), (currHack), (currTarg));
						}
						if (sec < (minSec + 5)) {
							ns.exec("FezOS/ammo/cg1.single.js", (nextHost), (currGrow), (currTarg));
						}
						ns.exec("FezOS/ammo/cw1.single.js", (nextHost), (currWeak), (currTarg));

						haveHost = false;

					}
					burstcounter--;
			}
			await ns.sleep(currDelay);
		}

}
