/** @param {NS} ns */
export async function main(ns) {
	/**
	"New Tokyo"
	"Chongqing"
	"Ishima"
	"Aevum"
	"Sector-12"
	"Volhaven"
	 */

	let currentCity = ns.getPlayer().city;

		if (currentCity != "Sector-12" && ns.getServerMoneyAvailable("home") > 200000) {
			ns.singularity.travelToCity("Sector-12");
		}

}
