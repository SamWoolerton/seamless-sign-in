import { useState } from "react"
import { apiBaseUrl, asJson } from "@u/ajax"

export default ({ onSelect }) => {
    const [search, setSearch] = useState("")
    const [images, setImages] = useState([])

    const getImages = async () =>
        setImages(
            (await asJson(`${apiBaseUrl}/images?search=${search}`)).results,
        )

    return (
        <>
            <h3 className="text-gray-700">Select an image</h3>

            <div className="mt-4">
                <label
                    htmlFor="unsplashSearch"
                    className="font-semibold text-gray-800"
                >
                    Start with a search
                </label>
                <div className="w-full flex">
                    <input
                        id="unsplashSearch"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="bg-gray-100 w-2/3"
                    />
                    <button onClick={getImages} className="w-1/3">
                        Search
                    </button>
                </div>
            </div>

            <div className="mt-8 overflow-y-auto">
                {images.length === 0 ? (
                    <div>No images found</div>
                ) : (
                    images.map(({ urls: { thumb, full } }) => (
                        <img
                            src={thumb}
                            onClick={() => onSelect(full)}
                            className="cursor-pointer"
                            key={thumb}
                        />
                    ))
                )}
            </div>
            <div className="text-sm text-center text-gray-600 mt-2">
                Powered by{" "}
                <a href="http://unsplash.com/" className="text-inherit">
                    Unsplash
                </a>
            </div>
        </>
    )
}
