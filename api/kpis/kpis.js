const faker = require("faker")

exports.handler = async (event, context) => {
    const data = [
        { value: 38 + faker.random.number(6), label: "visitors last week" },
        { value: 14 + faker.random.number(6), label: "number of employees" },
        { value: 2 + faker.random.number(8), label: "active visitors" },
    ]

    return {
        statusCode: 200,
        body: JSON.stringify(data),
    }
}
