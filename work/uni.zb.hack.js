/** @param {NS} ns */
export async function main(ns) {

	// ns.ui.openTail();
	// ns.ui.resizeTail(300, 130);
	// ns.ui.moveTail(1225, 485);
	// ns.disableLog('ALL');

	// second entry stops it automaticall focusing on work when you start it.
	// uncomment second line and comment first line at need. ctrl+/ toggles
	// commenting on whatever line the cursor is on

	let currentCity = ns.getPlayer().city;

		if (currentCity == "Volhaven") {
			ns.singularity.universityCourse("ZB Institute of Technology", "Algorithms", false);
		}
}
