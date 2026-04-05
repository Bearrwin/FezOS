/** @param {NS} ns */
export async function main(ns) {

	// run FezOS/batcher/batcher2.cfg.js phantasy 2 10 1 100 100

	// ns.ui.openTail();
	// ns.ui.resizeTail(300, 130);
	// ns.ui.moveTail(1225, 485);
	// ns.disableLog('ALL');

	let currTarg = ns.peek(10020201);
	let currWeak = ns.peek(10020202);
	let currGrow = ns.peek(10020203);
	let currHack = ns.peek(10020204);
	let currDelay = ns.peek(10020205);
	let currBurst = ns.peek(10020206);

	ns.print("Current config for batcher 2");
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

		let _10020201 = hackTarget;
		ns.clearPort(10020201);
		ns.writePort(10020201, _10020201);

		let _10020202 = weakThreads;
		ns.clearPort(10020202);
		ns.writePort(10020202, _10020202);

		let _10020203 = growThreads;
		ns.clearPort(10020203);
		ns.writePort(10020203, _10020203);

		let _10020204 = hackThreads;
		ns.clearPort(10020204);
		ns.writePort(10020204, _10020204);

		let _10020205 = cycleDelay;
		ns.clearPort(10020205);
		ns.writePort(10020205, _10020205);

		let _10020206 = burstSize;
		ns.clearPort(10020206);
		ns.writePort(10020206, _10020206);

		ns.write("FezOS/savedVar/10020201.txt", (_10020201), "w");
		ns.write("FezOS/savedVar/10020202.txt", (_10020202), "w");
		ns.write("FezOS/savedVar/10020203.txt", (_10020203), "w");
		ns.write("FezOS/savedVar/10020204.txt", (_10020204), "w");
		ns.write("FezOS/savedVar/10020205.txt", (_10020205), "w");
		ns.write("FezOS/savedVar/10020206.txt", (_10020206), "w");

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

			let _10020201 = hackTarget;
			ns.clearPort(10020201);
			ns.writePort(10020201, _10020201);

			let _10020202 = weakThreads;
			ns.clearPort(10020202);
			ns.writePort(10020202, _10020202);

			let _10020203 = growThreads;
			ns.clearPort(10020203);
			ns.writePort(10020203, _10020203);

			let _10020204 = hackThreads;
			ns.clearPort(10020204);
			ns.writePort(10020204, _10020204);

			let _10020205 = cycleDelay;
			ns.clearPort(10020205);
			ns.writePort(10020205, _10020205);

			let _10020206 = burstSize;
			ns.clearPort(10020206);
			ns.writePort(10020206, _10020206);

			ns.write("FezOS/savedVar/10020201.txt", (_10020201), "w");
			ns.write("FezOS/savedVar/10020202.txt", (_10020202), "w");
			ns.write("FezOS/savedVar/10020203.txt", (_10020203), "w");
			ns.write("FezOS/savedVar/10020204.txt", (_10020204), "w");
			ns.write("FezOS/savedVar/10020205.txt", (_10020205), "w");
			ns.write("FezOS/savedVar/10020206.txt", (_10020206), "w");

		}
	}
}
