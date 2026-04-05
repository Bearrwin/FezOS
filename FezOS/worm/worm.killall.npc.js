/** @param {NS} ns */
import { npcList } from "FezOS/func/func.js";

export async function main(ns) {
	/*
	ns.ui.openTail();
	ns.ui.resizeTail(300, 130);
	ns.ui.moveTail(1225, 485);
	ns.disableLog('ALL');
	 */
	let servers = npcList(ns);

	for (let server of servers) {
		ns.killall(server)
	}

}
