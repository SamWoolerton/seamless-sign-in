const faker = require("faker")

exports.handler = async (event, context) => {
    const data = [
        {
            value: 38 + faker.random.number(6),
            label: "visitors last week",
            sparkData: getSparkline(),
        },
        {
            value: 14 + faker.random.number(6),
            label: "number of employees",
            sparkData: getSparkline(),
        },
        {
            value: 2 + faker.random.number(8),
            label: "active visitors",
            sparkData: getSparkline(),
        },
    ]

    return {
        statusCode: 200,
        body: JSON.stringify(data),
    }
}

function getSparkline() {
    return new Array(6).fill().map((_, index) => ({
        x: index + 1,
        y: faker.random.number(6),
    }))
}
