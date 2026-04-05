/** @param {NS} ns */
export async function main(ns) {
/* 
	ns.ui.openTail();
	ns.ui.resizeTail(300, 130);
	ns.ui.moveTail(1225, 485);
	ns.disableLog('ALL');
 */
	let purchServers = ns.getPurchasedServers();

		for (let server of purchServers) {
			ns.killall(server);
		}

}
