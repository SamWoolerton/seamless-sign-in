const faker = require("faker")

exports.handler = async (event, context) => {
    const data = new Array(3).fill().map((_, index) => ({
        id: faker.random.number(20),
        name: faker.name.findName(),
        entry: faker.date.past(0),
    }))

    return {
        statusCode: 200,
        body: JSON.stringify(data),
    }
}
