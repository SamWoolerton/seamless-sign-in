import { useState } from "react"
import { ErrorAlt } from "@styled-icons/boxicons-solid"
import { SearchAlt2 } from "@styled-icons/boxicons-regular"
import { CircleSpinner } from "react-spinners-kit"
import { apiBaseUrl, asJson } from "@u/ajax"
import useWindowSize from "@u/hooks/useWindowSize"
import styles from "./unsplash.module.scss"

export default function Unsplash({ onSelect }) {
    const [search, setSearch] = useState("")
    const [imageState, setImageState] = useState({
        state: "initial",
        images: [],
        extra: {
            page: 1,
            totalCount: null,
            state: "initial",
        },
    })

    // minimum 1 column, max 6
    const { width } = useWindowSize() || { width: columnMinWidth }
    const columnMinWidth = 250
    const columns = Math.floor((width > 1500 ? 1500 : width) / columnMinWidth)

    const getImages = async () => {
        setImageState({ state: "loading" })
        try {
            const images = await asJson(`${apiBaseUrl}/images?search=${search}`)
            setImageState({
                state: "complete",
                images: images.results,
                extra: { page: 1, totalCount: images.total, state: "initial" },
            })
        } catch (err) {
            setImageState({ state: "error" })
        }
    }

    const getMoreImages = async () => {
        const newPage = imageState.extra.page + 1
        setImageState({ ...imageState, extra: { state: "loading" } })
        try {
            const images = (
                await asJson(
                    `${apiBaseUrl}/images?search=${search}&page=${newPage}`,
                )
            ).results
            setImageState({
                ...imageState,
                images: [...imageState.images, ...images],
                extra: {
                    ...imageState.extra,
                    page: newPage,
                    state: "complete",
                },
            })
        } catch (err) {
            setImageState({
                ...imageState,
                extra: {
                    ...imageState.extra,
                    state: "error",
                },
            })
        }
    }

    const registerDownload = async id => {
        await asJson(`${apiBaseUrl}/images?id=${id}`)
    }

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
                <div className="w-full flex mt-1">
                    <input
                        id="unsplashSearch"
                        value={search}
                        placeholder="Office..."
                        onChange={e => setSearch(e.target.value)}
                        onKeyDown={e => e.keyCode === 13 && getImages()}
                        className="bg-gray-200 w-2/3 px-3 py-1"
                    />
                    <button
                        onClick={getImages}
                        className="w-1/3"
                        disabled={imageState.state === "loading"}
                    >
                        {imageState.state === "loading" ? (
                            <span className="flex justify-center">
                                <CircleSpinner color="white" size={24} />
                                <span className="ml-3">Loading...</span>
                            </span>
                        ) : (
                            "Search"
                        )}
                    </button>
                </div>
            </div>

            <div className="overflow-y-auto mt-8 mb-2">
                {imageState.state === "initial" ? (
                    <div />
                ) : imageState.state === "loading" ? (
                    <div className="text-gray-600 text-center py-4">
                        <div className="mx-auto inline-block">
                            <CircleSpinner color="#718096" size={24} />
                        </div>
                        <h3 className="mt-2">Loading...</h3>
                    </div>
                ) : imageState.state === "error" ? (
                    <div className="text-center bg-red-100 px-2 py-8 rounded">
                        <ErrorAlt className="h-12 w-12 text-red-300" />
                        <h3 className="text-red-800 mt-2">
                            Something went wrong.
                        </h3>
                        <p className="text-red-700">
                            Sorry, there was an error fetching images matching
                            your search.
                            <br />
                            Please try again later.
                        </p>
                    </div>
                ) : imageState.images.length === 0 ? (
                    <div className="text-gray-600 text-center py-4">
                        <SearchAlt2 className="h-12 w-12" />
                        <h3 className="mt-2">No images found.</h3>
                        <p>Please try a different search term.</p>
                    </div>
                ) : (
                    <div>
                        <div style={{ columns }}>
                            {imageState.images.map(
                                ({
                                    id,
                                    urls: { small, full },
                                    user: {
                                        name,
                                        links: { html },
                                    },
                                }) => (
                                    <div
                                        key={small}
                                        className={
                                            "relative mb-4 " +
                                            styles.imageAttribution
                                        }
                                    >
                                        <img
                                            src={small}
                                            onClick={() => {
                                                // per Unsplash API guidelines
                                                registerDownload(id)

                                                // to use in app
                                                onSelect(full)
                                            }}
                                            className="cursor-pointer w-full mx-0"
                                        />
                                        <a
                                            href={`${html}?utm_source=Seamless sign in&utm_medium=referral`}
                                            className={
                                                "absolute inset-x-0 bottom-0 text-center py-1 bg-black bg-opacity-50 font-semibold text-white no-underline " +
                                                styles.attribution
                                            }
                                        >
                                            {name}
                                        </a>
                                    </div>
                                ),
                            )}
                        </div>

                        {imageState.extra.state === "initial" ||
                        imageState.extra.state === "complete" ? (
                            imageState.extra.totalCount >
                                imageState.images.length && (
                                <button
                                    onClick={getMoreImages}
                                    className="block mx-auto mt-4"
                                >
                                    Load more
                                </button>
                            )
                        ) : imageState.extra.state === "loading" ? (
                            <div className="flex justify-center my-2">
                                <CircleSpinner color="#718096" size={24} />
                            </div>
                        ) : null}
                    </div>
                )}
            </div>
            <div className="text-sm text-center text-gray-600 mt-2">
                Powered by{" "}
                <a
                    href="http://unsplash.com/?utm_source=Seamless sign in&utm_medium=referral"
                    className="text-inherit"
                >
                    Unsplash
                </a>
            </div>
        </>
    )
}
