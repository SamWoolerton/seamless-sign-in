const faker = require("faker")

const rn = n => faker.random.number(n)
const arr = (count, max) =>
    new Array(count)
        .fill(0)
        .map(() => ({ name: faker.name.findName(), count: rn(max) }))

exports.handler = async (event, context) => {
    const data = {
        name: "Company",
        count: 6 + rn(3),
        children: [
            {
                name: "Warehouse",
                count: rn(5),
                children: arr(6, 12),
            },
            {
                name: "Office",
                count: rn(2),
                children: arr(2, 8),
            },
            {
                name: "Factory",
                count: rn(4),
                children: arr(3, 5),
            },
        ],
    }

    return {
        statusCode: 200,
        body: JSON.stringify(data),
    }
}
