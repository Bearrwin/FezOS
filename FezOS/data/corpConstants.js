/** @param {NS} ns */
/*export async function main(ns) {
		ns.ui.openTail();
	ns.ui.resizeTail(300, 130);
	ns.ui.moveTail(100, 100);
	ns.disableLog("scan");
	ns.disableLog("sleep");
  */

  export const cities = ["Aevum", "Chongqing", "Ishima", "New Tokyo", "Sector-12", "Volhaven"];
  export const expCities = ["Aevum", "Chongqing", "Ishima", "New Tokyo", "Volhaven"];

  export const offerFuundsReq = {
  	round1: 200e9, // 515e9,
	  round2: 13e12,
	  round3: 3.1e16,
    round4: 4.1e20
  }

  // Division types
  
	export const Agriculture = {
    startingCost: 40000000000,
    description: "Cultivate crops and breed livestock to produce food.",
    recommendStarting: true,
    realEstateFactor: 0.72,
    scienceFactor: 0.5,
    hardwareFactor: 0.2,
    robotFactor: 0.3,
    aiCoreFactor: 0.3,
    advertisingFactor: 0.04,
    requiredMaterials: {
      Water: 0.5,
      Chemicals: 0.2,
    },
    producedMaterials: ["Plants", "Food"],
    makesMaterials: true,
    makesProducts: false,
  }

 export const Chemical = {
    startingCost: 70000000000,
    description: "Produce industrial chemicals.",
    recommendStarting: false,
    realEstateFactor: 0.25,
    scienceFactor: 0.75,
    hardwareFactor: 0.2,
    robotFactor: 0.25,
    aiCoreFactor: 0.2,
    advertisingFactor: 0.07,
    requiredMaterials: {
      Plants: 1,
      Water: 0.5,
    },
    producedMaterials: ["Chemicals"],
    makesMaterials: true,
    makesProducts: false,
  }

  export const ComputerHardware = {
    startingCost: 500000000000,
    description: "Develop and manufacture new computer hardware and networking infrastructures.",
    product: {
      name: "Product",
      verb: "Create",
      desc: "Design and manufacture a new computer hardware product!",
      ratingWeights: {
        quality: 0.15,
        performance: 0.25,
        durability: 0.25,
        reliability: 0.2,
        aesthetics: 0.05,
        features: 0.1,
      },
    },
    recommendStarting: false,
    realEstateFactor: 0.2,
    scienceFactor: 0.62,
    robotFactor: 0.36,
    aiCoreFactor: 0.19,
    advertisingFactor: 0.17,
    requiredMaterials: {
      Metal: 2,
    },
    producedMaterials: ["Hardware"],
    makesMaterials: true,
    makesProducts: true,
  }

  export const Fishing =  {
    startingCost: 80000000000,
    description: "Produce food through the breeding and processing of fish and fish products.",
    recommendStarting: false,
    realEstateFactor: 0.15,
    scienceFactor: 0.35,
    hardwareFactor: 0.35,
    robotFactor: 0.5,
    aiCoreFactor: 0.2,
    advertisingFactor: 0.08,
    requiredMaterials: {
      Plants: 0.5,
    },
    producedMaterials: ["Food"],
    makesMaterials: true,
    makesProducts: false,
  }
  
  export const Restaurant = {
    startingCost: 10000000000,
    description: "Create your own restaurants all around the world.",
    product: {
      name: "Restaurant",
      verb: "Build",
      desc: "Build and manage a new restaurant!",
      ratingWeights: {
        quality: 0.7,
        durability: 0.1,
        aesthetics: 0.2,
      },
    },
    recommendStarting: true,
    scienceFactor: 0.12,
    hardwareFactor: 0.15,
    robotFactor: 0.3,
    aiCoreFactor: 0.25,
    advertisingFactor: 0.25,
    realEstateFactor: 0.05,
    requiredMaterials: {
      Food: 0.5,
      Water: 0.5,
    },
    makesMaterials: false,
    makesProducts: true,
  }
  export const Healthcare = {
    startingCost: 750000000000,
    description: "Create and manage hospitals.",
    product: {
      name: "Hospital",
      verb: "Build",
      desc: "Build and manage a new hospital!",
      ratingWeights: {
        quality: 0.4,
        performance: 0.1,
        durability: 0.1,
        reliability: 0.3,
        features: 0.1,
      },
    },
    recommendStarting: false,
    realEstateFactor: 0.1,
    scienceFactor: 0.75,
    advertisingFactor: 0.11,
    hardwareFactor: 0.1,
    robotFactor: 0.1,
    aiCoreFactor: 0.1,
    requiredMaterials: {
      Robots: 10,
      "AI Cores": 5,
      Drugs: 5,
      Food: 5,
    },
    makesMaterials: false,
    makesProducts: true,
  }
  export const Mining=  {
    startingCost: 300000000000,
    description: "Extract and process metals from the earth.",
    recommendStarting: false,
    realEstateFactor: 0.3,
    scienceFactor: 0.26,
    hardwareFactor: 0.4,
    robotFactor: 0.45,
    aiCoreFactor: 0.45,
    advertisingFactor: 0.06,
    requiredMaterials: {
      Hardware: 0.1,
    },
    producedMaterials: ["Ore", "Minerals"],
    makesMaterials: true,
    makesProducts: false,
  }
  export const Pharmaceutical = {
    startingCost: 200000000000,
    description: "Discover, develop, and create new pharmaceutical drugs.",
    product: {
      name: "Drug",
      verb: "Develop",
      desc: "Design and develop a new pharmaceutical drug!",
      ratingWeights: {
        quality: 0.2,
        performance: 0.2,
        durability: 0.1,
        reliability: 0.3,
        features: 0.2,
      },
    },
    recommendStarting: false,
    realEstateFactor: 0.05,
    scienceFactor: 0.8,
    hardwareFactor: 0.15,
    robotFactor: 0.25,
    aiCoreFactor: 0.2,
    advertisingFactor: 0.16,
    requiredMaterials: {
      Chemicals: 2,
      Water: 0.5,
    },
    producedMaterials: ["Drugs"],
    makesMaterials: true,
    makesProducts: true,
  }
  export const RealEstateDiv = {
    startingCost: 600000000000,
    description: "Develop and manage real estate properties.",
    product: {
      name: "Property",
      verb: "Develop",
      desc: "Develop a new piece of real estate property!",
      ratingWeights: {
        quality: 0.2,
        durability: 0.25,
        reliability: 0.1,
        aesthetics: 0.35,
        features: 0.1,
      },
    },
    recommendStarting: false,
    robotFactor: 0.6,
    aiCoreFactor: 0.6,
    advertisingFactor: 0.25,
    scienceFactor: 0.05,
    hardwareFactor: 0.05,
    requiredMaterials: {
      Metal: 5,
      Plants: 1,
      Water: 2,
      Hardware: 4,
    },
    producedMaterials: ["Real Estate"],
    makesMaterials: true,
    makesProducts: true,
  }
  export const Robotics = {
    startingCost: 1000000000000,
    description: "Develop and create robots.",
    product: {
      name: "Robot",
      verb: "Design",
      desc: "Design and create a new robot or robotic system!",
      ratingWeights: {
        quality: 0.1,
        performance: 0.2,
        durability: 0.2,
        reliability: 0.2,
        aesthetics: 0.1,
        features: 0.2,
      },
    },
    recommendStarting: false,
    realEstateFactor: 0.32,
    scienceFactor: 0.65,
    aiCoreFactor: 0.36,
    advertisingFactor: 0.18,
    hardwareFactor: 0.19,
    requiredMaterials: {
      Hardware: 5,
      "AI Cores": 3,
    },
    producedMaterials: ["Robots"],
    makesMaterials: true,
    makesProducts: true,
  }
  export const Software = {
    startingCost: 25000000000,
    description: "Develop computer software and create AI Cores.",
    product: {
      name: "Software",
      verb: "Develop",
      desc: "Develop a new piece of software!",
      ratingWeights: {
        quality: 0.2,
        performance: 0.2,
        reliability: 0.2,
        durability: 0.2,
        features: 0.2,
      },
    },
    recommendStarting: false,
    scienceFactor: 0.62,
    advertisingFactor: 0.16,
    hardwareFactor: 0.25,
    realEstateFactor: 0.15,
    aiCoreFactor: 0.18,
    robotFactor: 0.05,
    requiredMaterials: {
      Hardware: 0.5,
    },
    producedMaterials: ["AI Cores"],
    makesMaterials: true,
    makesProducts: true,
  }
  export const Tobacco = {
    startingCost: 20000000000,
    description: "Create and distribute tobacco and tobacco-related products.",
    product: {
      name: "Product",
      verb: "Create",
      desc: "Create a new tobacco product!",
      ratingWeights: {
        quality: 0.7,
        durability: 0.1,
        aesthetics: 0.2,
      },
    },
    recommendStarting: true,
    realEstateFactor: 0.15,
    scienceFactor: 0.75,
    hardwareFactor: 0.15,
    robotFactor: 0.2,
    aiCoreFactor: 0.15,
    advertisingFactor: 0.2,
    requiredMaterials: {
      Plants: 1,
    },
    makesMaterials: false,
    makesProducts: true,
  }
  export const WaterUtilities = {
    startingCost: 150000000000,
    description: "Distribute water and provide wastewater services.",
    recommendStarting: false,
    realEstateFactor: 0.5,
    scienceFactor: 0.6,
    robotFactor: 0.4,
    aiCoreFactor: 0.4,
    advertisingFactor: 0.08,
    requiredMaterials: {
      Hardware: 0.1,
    },
    producedMaterials: ["Water"],
    makesMaterials: true,
    makesProducts: false,
  }

  // Materials

  export const Water = {
    name: "Water",
    size: 0.05,
    demandBase: 75,
    demandRange: [65, 85],
    competitionBase: 50,
    competitionRange: [40, 60],
    baseCost: 1500,
    maxVolatility: 0.2,
    baseMarkup: 6,
  }
  export const Ore = {
    name: "Ore",
    size: 0.01,
    demandBase: 50,
    demandRange: [40, 60],
    competitionBase: 80,
    competitionRange: [65, 95],
    baseCost: 500,
    maxVolatility: 0.2,
    baseMarkup: 6,
  }
  export const Minerals = {
    name: "Minerals",
    size: 0.04,
    demandBase: 75,
    demandRange: [60, 90],
    competitionBase: 80,
    competitionRange: [65, 95],
    baseCost: 500,
    maxVolatility: 0.2,
    baseMarkup: 6,
  }
  export const Food = {
    name: "Food",
    size: 0.03,
    demandBase: 80,
    demandRange: [70, 90],
    competitionBase: 60,
    competitionRange: [35, 85],
    baseCost: 5000,
    maxVolatility: 1,
    baseMarkup: 3,
  }
  export const Plants = {
    name: "Plants",
    size: 0.05,
    demandBase: 70,
    demandRange: [20, 90],
    competitionBase: 50,
    competitionRange: [30, 70],
    baseCost: 3000,
    maxVolatility: 0.6,
    baseMarkup: 3.75,
  }
  export const Metal = {
    name: "Metal",
    size: 0.1,
    demandBase: 80,
    demandRange: [75, 85],
    competitionBase: 70,
    competitionRange: [60, 80],
    baseCost: 2650,
    maxVolatility: 1,
    baseMarkup: 6,
  }
  export const Hardware = {
    name: "Hardware",
    size: 0.06,
    demandBase: 85,
    demandRange: [80, 90],
    competitionBase: 80,
    competitionRange: [65, 95],
    baseCost: 8000,
    maxVolatility: 0.5,
    baseMarkup: 1,
  }
  export const Chemicals = {
    name: "Chemicals",
    size: 0.05,
    demandBase: 55,
    demandRange: [40, 70],
    competitionBase: 60,
    competitionRange: [40, 80],
    baseCost: 9000,
    maxVolatility: 1.2,
    baseMarkup: 2,
  }
  export const Drugs = {
    name: "Drugs",
    size: 0.02,
    demandBase: 60,
    demandRange: [45, 75],
    competitionBase: 70,
    competitionRange: [40, 99],
    baseCost: 40000,
    maxVolatility: 1.6,
    baseMarkup: 1,
  }
  export const Robots = {
    name: "Robots",
    size: 0.5,
    demandBase: 90,
    demandRange: [80, 99],
    competitionBase: 90,
    competitionRange: [80, 99],
    baseCost: 75000,
    maxVolatility: 0.5,
    baseMarkup: 1,
  }
  export const AICores = {
    name: "AI Cores",
    size: 0.1,
    demandBase: 90,
    demandRange: [80, 99],
    competitionBase: 90,
    competitionRange: [80, 99],
    baseCost: 15000,
    maxVolatility: 0.8,
    baseMarkup: 0.5,
  }
  export const RealEstateMat = {
    name: "Real Estate",
    size: 0.005,
    demandBase: 50,
    demandRange: [5, 99],
    competitionBase: 50,
    competitionRange: [25, 75],
    baseCost: 80000,
    maxVolatility: 1.5,
    baseMarkup: 1.5,
  }