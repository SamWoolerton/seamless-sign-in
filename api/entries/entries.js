const faker = require("faker")

exports.handler = async (event, context) => {
    const data = new Array(20).fill().map((_, index) => ({
        id: index,
        name: faker.name.findName(),
        entry: faker.date.past(0),
        direction: faker.random.boolean(),
    }))

    return {
        statusCode: 200,
        body: JSON.stringify(data),
    }
}
