/** @param {NS} ns */
export async function main(ns) {
	// create a list of purchased servers and store them in the variable we called purchasedServers
	let purchasedServers = ns.getPurchasedServers();
	let servCount = 0;

    ns.ui.openTail();
    ns.ui.resizeTail(155, 550);
    ns.ui.moveTail(1360, 60);
    ns.ui.setTailTitle("Servers");
    ns.disableLog('ALL');
    ns.ui.setTailFontSize(13.5);
    	// use our list from above variable to step through each entry and calculate free and
	// used ram and then report the server name and those figures in a list to the terminal.
	
  

while (true){
    ns.clearLog();  
    servCount = 0;
		purchasedServers = ns.getPurchasedServers();
    for (let pServer of purchasedServers) {

      let totalRam = ns.getServerMaxRam(pServer);
      let freeRam = Math.floor(ns.getServerMaxRam(pServer) - ns.getServerUsedRam(pServer));
      servCount++;
      ns.print(`${servCount} ${ns.formatRam(totalRam, 0)} / ${ns.formatRam(freeRam, 0)}`);
      
    }
    await ns.sleep(10000);
}

}