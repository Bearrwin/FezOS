/** @param {NS} ns */
import {
	npcList,
	npcBDAble,
	pathGen
} from "FezOS/func/func.js";
export async function main(ns) {

	ns.ui.openTail();
	ns.ui.resizeTail(300, 130);
	ns.ui.moveTail(1225, 485);
	ns.disableLog('ALL');


	let servers = npcBDAble(ns)
	
	for (let serv of servers) {

		let path = pathGen(ns, serv);
		ns.tprint(path);

		let connectString = "home;";
		for (let hop of path) {
			await ns.singularity.connect(hop)
			ns.print(hop)
			connectString += "connect " + hop + ";"
		}
		ns.print("--------Installing backdoor on " + serv)

		await ns.sleep(100)
		await ns.singularity.installBackdoor()
		ns.print("------ Going home")
		await ns.singularity.connect("home")
	}
}


export function autocomplete(data, args) {
	return data.servers;
}
