/** @param {NS} ns */
export async function main(ns) {

	// run FezOS/batcher/batcher4.cfg.js phantasy 2 10 1 100 100

	// ns.ui.openTail();
	// ns.ui.resizeTail(300, 130);
	// ns.ui.moveTail(1225, 485);
	// ns.disableLog('ALL');

	let currTarg = ns.peek(10020401);
	let currWeak = ns.peek(10020402);
	let currGrow = ns.peek(10020403);
	let currHack = ns.peek(10020404);
	let currDelay = ns.peek(10020405);
	let currBurst = ns.peek(10020406);

	ns.print("Current config for batcher 4");
	ns.print("Current target is " + currTarg);
	ns.print("Current weaken threads are " + currWeak);
	ns.print("Current grow threads are " + currGrow);
	ns.print("Current hack threads are " + currHack);
	ns.print("Current cycle time in ms is " + currDelay);
	ns.print("Current burst size is " + currBurst);

	if (ns.args[0] != undefined) {
		let hackTarget = ns.args[0];
		let weakThreads = ns.args[1];
		let growThreads = ns.args[2];
		let hackThreads = ns.args[3];
		let cycleDelay = ns.args[4];
		let burstSize = ns.args[5];

		let _10020401 = hackTarget;
		ns.clearPort(10020401);
		ns.writePort(10020401, _10020401);

		let _10020402 = weakThreads;
		ns.clearPort(10020402);
		ns.writePort(10020402, _10020402);

		let _10020403 = growThreads;
		ns.clearPort(10020403);
		ns.writePort(10020403, _10020403);

		let _10020404 = hackThreads;
		ns.clearPort(10020404);
		ns.writePort(10020404, _10020404);

		let _10020405 = cycleDelay;
		ns.clearPort(10020405);
		ns.writePort(10020405, _10020405);

		let _10020406 = burstSize;
		ns.clearPort(10020406);
		ns.writePort(10020406, _10020406);

		ns.write("FezOS/savedVar/10020401.txt", (_10020401), "w");
		ns.write("FezOS/savedVar/10020402.txt", (_10020402), "w");
		ns.write("FezOS/savedVar/10020403.txt", (_10020403), "w");
		ns.write("FezOS/savedVar/10020404.txt", (_10020404), "w");
		ns.write("FezOS/savedVar/10020405.txt", (_10020405), "w");
		ns.write("FezOS/savedVar/10020406.txt", (_10020406), "w");

	} else {

		const modify = await ns.prompt("Would you like to change the settings for Batcher 1", {
			type: "select",
			choices: ["Yes", "No"]
		});

		if (modify == "Yes") {

			const hackTarget = await ns.prompt("Which server would you like to hack?", {
				type: "select",
				choices: ["4sigma", "aerocorp", "aevum-police", "alpha-ent", "applied-energetics", "b-and-a", "blade", "catalyst", "clarkinc", "computek", "crush-fitness", "defcomm", "deltaone", "ecorp", "foodnstuff", "fulcrumassets", "fulcrumtech", "galactic-cyber", "global-pharm", "harakiri-sushi", "helios", "hong-fang-tea", "icarus", "infocomm", "iron-gym", "joesguns", "johnson-ortho", "kuai-gong", "lexo-corp", "max-hardware", "megacorp", "microdyne", "millenium-fitness", "n00dles", "nectar-net", "neo-net", "netlink", "nova-med", "nwo", "omega-net", "omnia", "omnitek", "phantasy", "powerhouse-fitness", "rho-construction", "rothman-uni", "sigma-cosmetics", "silver-helix", "snap-fitness", "solaris", "stormtech", "summit-uni", "syscore", "taiyang-digital", "the-hub", "titan-labs", "unitalife", "univ-energy", "vitalife", "zb-def", "zb-institute", "zer0", "zeus-med"]
			});

			const weakThreads = await ns.prompt("How many weaken threads will we use?", {
				type: "text"
			});

			const growThreads = await ns.prompt("How many grow threads will we use?", {
				type: "text"
			});

			const hackThreads = await ns.prompt("How many hack threads will we use?", {
				type: "text"
			});

			const cycleDelay = await ns.prompt("How long will we wait between cycles (ms)", {
				type: "text"
			});

			const burstSize = await ns.prompt("How big will our burst size be? i.e. 100", {
				type: "text"
			});

			let _10020401 = hackTarget;
			ns.clearPort(10020401);
			ns.writePort(10020401, _10020401);

			let _10020402 = weakThreads;
			ns.clearPort(10020402);
			ns.writePort(10020402, _10020402);

			let _10020403 = growThreads;
			ns.clearPort(10020403);
			ns.writePort(10020403, _10020403);

			let _10020404 = hackThreads;
			ns.clearPort(10020404);
			ns.writePort(10020404, _10020404);

			let _10020405 = cycleDelay;
			ns.clearPort(10020405);
			ns.writePort(10020405, _10020405);

			let _10020406 = burstSize;
			ns.clearPort(10020406);
			ns.writePort(10020406, _10020406);

			ns.write("FezOS/savedVar/10020401.txt", (_10020401), "w");
			ns.write("FezOS/savedVar/10020402.txt", (_10020402), "w");
			ns.write("FezOS/savedVar/10020403.txt", (_10020403), "w");
			ns.write("FezOS/savedVar/10020404.txt", (_10020404), "w");
			ns.write("FezOS/savedVar/10020405.txt", (_10020405), "w");
			ns.write("FezOS/savedVar/10020406.txt", (_10020406), "w");

		}
	}
}
