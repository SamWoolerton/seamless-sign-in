const faker = require("faker")

const today = new Date()

// return 60 days of data for several different locations
exports.handler = async (event, context) => {
    const locations = ["Office", "Warehouse", "Factory"]

    const days = 60
    const data = new Array(locations.length * days)
        .fill()
        .map((_, index) => ({
            date: addDays(today, -index % days),
            count: 4 + faker.random.number(10),
            location: locations[Math.floor(index / days)],
        }))
        .reverse()

    return {
        statusCode: 200,
        body: JSON.stringify(data),
    }
}

function addDays(date, days) {
    let result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
}
