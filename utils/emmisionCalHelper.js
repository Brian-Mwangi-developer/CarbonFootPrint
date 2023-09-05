//calculate Emmissions
const emissionsFactors = {
    home: {
        Electricity: 0.5, // kg CO2e per kWh
        cookingOil: 0.2, // kg CO2e per liter
        cookingGas: 0.3, // kg CO2e per cubic meter
    },
    personalCar: {
        Mileage: 2.3, // kg CO2e per mile driven
    },
    motorbike: {
        motorbikeMiles: 1.5, // kg CO2e per mile traveled
    },
    publicTransport: {
        busMiles: 0.6, // kg CO2e per mile traveled by bus
        trainMiles: 0.2, // kg CO2e per mile traveled by train
        uberMiles:0.4 // kg CO2e per mile traveled by Uber
    },
};

const calculateHomeEmissions = (Electricity, cookingOil, cookingGas) => {
    const homeEmissions =
        Electricity * emissionsFactors.home.Electricity +
        cookingOil * emissionsFactors.home.cookingOil +
        cookingGas * emissionsFactors.home.cookingGas;
    return homeEmissions;
}

const calculatePersonalCarEmissions = (mileage) => {
    // Calculate emissions based on mileage, engineSize, and emissionsFactor
    const personalCarEmissions =
      mileage * emissionsFactors.personalCar.Mileage ;
    return personalCarEmissions;
  };
  

const calculateMotorbikeEmissions = (motorbikeMiles) => {
    const motorbikeEmissions =
        motorbikeMiles * emissionsFactors.motorbike.motorbikeMiles;
    return motorbikeEmissions;
};

const calculatePublicTransportEmissions = (busMiles, trainMiles,uberMiles) => {
    const publicTransportEmissions =
      busMiles * emissionsFactors.publicTransport.busMiles +
      trainMiles * emissionsFactors.publicTransport.trainMiles +
      uberMiles * emissionsFactors.publicTransport.uberMiles;
    return publicTransportEmissions;
  };


module.exports = {calculateHomeEmissions,calculateMotorbikeEmissions,calculatePersonalCarEmissions,calculatePublicTransportEmissions};