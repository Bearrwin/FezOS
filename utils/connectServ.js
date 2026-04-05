/** @param {NS} ns */
import {
	npcList,
	pathGen
} from "FezOS/func/func.js";
export async function main(ns) {

	ns.ui.openTail();
	ns.ui.resizeTail(300, 130);
	ns.ui.moveTail(1225, 485);
	ns.disableLog('ALL');

	let servers = npcList(ns)
	let target = "home"



	if (ns.args[0] != undefined && ns.serverExists(ns.args[0])) {
		target = ns.args[0]
	} else {

		target = await ns.prompt("Which server would you like to connect to?", {
			type: "select",
			choices: [...servers]
		});
	}

	if (ns.serverExists(target) != true) {
		ns.print("Invalid selection")
		ns.exit()
	}


	let path = pathGen(ns, target);
	ns.tprint(path);

	let connectString = "home;";
	for (let hop of path) {
		await ns.singularity.connect(hop)
		ns.print(hop)
		connectString += "connect " + hop + ";"
	}

}
export function autocomplete(data, args) {
	return data.servers;
}
