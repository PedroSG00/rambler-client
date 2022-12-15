const calculateTripPrice = (distance) => {

    const averageGasPrice = 1.75
    const fuelConsumption = 6.4

    let consumedFuel = Math.round((((distance / 1000) / 100 * fuelConsumption) * averageGasPrice) * 1.15)

    return consumedFuel

}

export default calculateTripPrice