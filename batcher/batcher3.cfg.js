/** @param {NS} ns */
export async function main(ns) {

	// run FezOS/batcher/batcher3.cfg.js phantasy 2 10 1 100 100

	// ns.ui.openTail();
	// ns.ui.resizeTail(300, 130);
	// ns.ui.moveTail(1225, 485);
	// ns.disableLog('ALL');

	let currTarg = ns.peek(10020301);
	let currWeak = ns.peek(10020302);
	let currGrow = ns.peek(10020303);
	let currHack = ns.peek(10020304);
	let currDelay = ns.peek(10020305);
	let currBurst = ns.peek(10020306);

	ns.print("Current config for batcher 3");
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

		let _10020301 = hackTarget;
		ns.clearPort(10020301);
		ns.writePort(10020301, _10020301);

		let _10020302 = weakThreads;
		ns.clearPort(10020302);
		ns.writePort(10020302, _10020302);

		let _10020303 = growThreads;
		ns.clearPort(10020303);
		ns.writePort(10020303, _10020303);

		let _10020304 = hackThreads;
		ns.clearPort(10020304);
		ns.writePort(10020304, _10020304);

		let _10020305 = cycleDelay;
		ns.clearPort(10020305);
		ns.writePort(10020305, _10020305);

		let _10020306 = burstSize;
		ns.clearPort(10020306);
		ns.writePort(10020306, _10020306);

		ns.write("FezOS/savedVar/10020301.txt", (_10020301), "w");
		ns.write("FezOS/savedVar/10020302.txt", (_10020302), "w");
		ns.write("FezOS/savedVar/10020303.txt", (_10020303), "w");
		ns.write("FezOS/savedVar/10020304.txt", (_10020304), "w");
		ns.write("FezOS/savedVar/10020305.txt", (_10020305), "w");
		ns.write("FezOS/savedVar/10020306.txt", (_10020306), "w");

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

			let _10020301 = hackTarget;
			ns.clearPort(10020301);
			ns.writePort(10020301, _10020301);

			let _10020302 = weakThreads;
			ns.clearPort(10020302);
			ns.writePort(10020302, _10020302);

			let _10020303 = growThreads;
			ns.clearPort(10020303);
			ns.writePort(10020303, _10020303);

			let _10020304 = hackThreads;
			ns.clearPort(10020304);
			ns.writePort(10020304, _10020304);

			let _10020305 = cycleDelay;
			ns.clearPort(10020305);
			ns.writePort(10020305, _10020305);

			let _10020306 = burstSize;
			ns.clearPort(10020306);
			ns.writePort(10020306, _10020306);

			ns.write("FezOS/savedVar/10020301.txt", (_10020301), "w");
			ns.write("FezOS/savedVar/10020302.txt", (_10020302), "w");
			ns.write("FezOS/savedVar/10020303.txt", (_10020303), "w");
			ns.write("FezOS/savedVar/10020304.txt", (_10020304), "w");
			ns.write("FezOS/savedVar/10020305.txt", (_10020305), "w");
			ns.write("FezOS/savedVar/10020306.txt", (_10020306), "w");

		}
	}
}
