const faker = require("faker")

exports.handler = async (event, context) => {
    const count = 40 + faker.random.number(20)
    const data = new Array(count).fill().map((_, index) => ({
        id: index + 1,
        name: faker.name.findName(),
        entry: faker.date.past(0),
        direction: faker.random.boolean() ? "in" : "out",
    }))

    return {
        statusCode: 200,
        body: JSON.stringify(data),
    }
}
