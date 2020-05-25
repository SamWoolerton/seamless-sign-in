const Unsplash = require("unsplash-js").default

const fetch = require("node-fetch")
global.fetch = fetch

const { UNSPLASH_ACCESS_KEY } = process.env
const unsplash = new Unsplash({ accessKey: UNSPLASH_ACCESS_KEY })

exports.handler = async (
    { queryStringParameters: { search, page = 1 } },
    context,
) => {
    const data = await unsplash.search
        // search term, page, page size
        .photos(search, page, 10)
        .then(res => res.json())

    return {
        statusCode: 200,
        body: JSON.stringify(data),
    }
}
