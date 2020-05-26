const Unsplash = require("unsplash-js").default

const fetch = require("node-fetch")
global.fetch = fetch

const { UNSPLASH_ACCESS_KEY } = process.env
const unsplash = new Unsplash({ accessKey: UNSPLASH_ACCESS_KEY })

exports.handler = async (
    { queryStringParameters: { id, search, page = 1 } },
    context,
) => {
    try {
        if (search) {
            const data = await unsplash.search
                // search term, page, page size
                .photos(search, page, 25)
                .then(res => res.json())

            return {
                statusCode: 200,
                body: JSON.stringify(data),
            }
        } else if (id) {
            // to meet Unsplash guidelines here https://help.unsplash.com/en/articles/2511258-guideline-triggering-a-download
            await unsplash.photos
                .getPhoto(id)
                .then(res => res.json())
                .then(unsplash.photos.downloadPhoto)

            return {
                statusCode: 200,
                body: JSON.stringify("Download successful."),
            }
        }

        return {
            statusCode: 400,
            body: JSON.stringify("Request not recognised."),
        }
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify("Error handling request."),
        }
    }
}
