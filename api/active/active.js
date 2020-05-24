const faker = require("faker")

exports.handler = async (event, context) => {
    // 2-5
    const count = 2 + faker.random.number(3)

    const data = new Array(count).fill().map((_, index) => ({
        id: faker.random.number(20),
        name: faker.name.findName(),
        entry: faker.date.past(0),
    }))

    return {
        statusCode: 200,
        body: JSON.stringify(data),
    }
}
