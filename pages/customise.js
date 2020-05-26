import Head from "next/head"
import Link from "next/link"
import { useState } from "react"
import Modal from "react-modal"
import { X } from "@styled-icons/heroicons-outline"
import { CircleSpinner } from "react-spinners-kit"
import { CheckCircle, ErrorAlt } from "@styled-icons/boxicons-solid"
import Layout, { siteTitle } from "@c/layout"
import PreviewWelcomeScreen from "@c/preview-welcome-screen"
import createPersistedState from "use-persisted-state"
const useStored = createPersistedState("admin-customise")
import { useBeforeunload } from "react-beforeunload"
import Unsplash from "@c/unsplash"

export default function CustomisePage() {
    const [stored, setStored] = useStored({})

    const [title, setTitle] = useState(stored.title)
    const [subtitle, setSubtitle] = useState(stored.subtitle)
    const [background, setBackground] = useState(stored.background)
    const [unsplashBg, setUnsplashBg] = useState(true)
    const [imageState, setImageState] = useState("initial")

    const [showModal, setShowModal] = useState(false)

    useBeforeunload(() => {
        const dataSaved =
            stored.title === title &&
            stored.subtitle === subtitle &&
            stored.background === background
        // note that browsers don't currently use the returned string, but safer to set it in case this behaviour changes in future
        if (!dataSaved) return "Do you want to save changes before exiting?"
        return
    })

    return (
        <Layout>
            <Head>
                <title>Customise your welcome page | {siteTitle}</title>
            </Head>
            <div className="container mx-auto mt-6 flex flex-wrap shadow-xl">
                <div className="w-full sm:w-2/3 relative py-12">
                    <PreviewWelcomeScreen
                        {...{ title, subtitle, background }}
                    />
                </div>
                <div className="w-full sm:w-1/3 bg-white text-gray-800 p-4 md:pb-48">
                    <div>
                        <h3 className="mt-2 mb-4 text-gray-700">
                            Customise your welcome page
                        </h3>
                        <div>
                            <label
                                htmlFor="setTitle"
                                className="font-semibold text-gray-700 mt-2"
                            >
                                Title
                            </label>
                            <input
                                id="setTitle"
                                className="bg-gray-200 p-2 w-full mb-2"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="setSubtitle"
                                className="font-semibold text-gray-700 mt-2"
                            >
                                Subtitle
                            </label>
                            <input
                                id="setSubtitle"
                                value={subtitle}
                                className="bg-gray-200 p-2 w-full mb-2"
                                onChange={e => setSubtitle(e.target.value)}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="setBackground"
                                className="font-semibold text-gray-700 mt-2"
                            >
                                Background image
                            </label>

                            {/* Use hidden image load events to check whether the URL resolves to a valid image or not */}
                            <img
                                className="hidden"
                                src={background}
                                onLoad={() => setImageState("complete")}
                                onError={() =>
                                    background !== "" && setImageState("error")
                                }
                            />

                            <div>
                                {unsplashBg ? (
                                    <button
                                        className="w-full my-1"
                                        onClick={() => setShowModal(true)}
                                    >
                                        Open Unsplash image search
                                    </button>
                                ) : (
                                    <div className="relative mb-2 flex">
                                        <input
                                            id="setBackground"
                                            className={
                                                "w-full p-2 " +
                                                (imageState === "error"
                                                    ? "bg-red-200"
                                                    : "bg-gray-200")
                                            }
                                            value={background}
                                            onChange={e => {
                                                setImageState(
                                                    e.target.value === ""
                                                        ? "initial"
                                                        : "loading",
                                                )
                                                setBackground(e.target.value)
                                            }}
                                        />
                                        <div className="bg-gray-200 p-2">
                                            {imageState === "loading" ? (
                                                <div className="h-8 w-8 flex justify-center items-center">
                                                    <CircleSpinner
                                                        color="#555"
                                                        size={16}
                                                    />
                                                </div>
                                            ) : imageState === "error" ? (
                                                <ErrorAlt className="h-8 w-8 text-red-800" />
                                            ) : imageState === "complete" ? (
                                                <CheckCircle className="h-8 w-8 text-green-800" />
                                            ) : (
                                                <div className="h-8 w-8 text-center">
                                                    ...
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div
                                    className="underline text-gray-700 cursor-pointer mt-2"
                                    onClick={() => setUnsplashBg(!unsplashBg)}
                                >
                                    {unsplashBg
                                        ? "Enter a URL directly"
                                        : "Use Unsplash image search"}
                                </div>
                            </div>
                            <Modal
                                className="container mx-auto"
                                overlayClassName="absolute inset-0 z-20 flex justify-center items-center bg-black bg-opacity-25"
                                isOpen={showModal}
                                onRequestClose={() => setShowModal(false)}
                                contentLabel="Background image picker"
                            >
                                <div className="card relative flex flex-col max-h-85vh">
                                    <X
                                        className="absolute top-0 right-0 h-8 w-8 pt-3 pr-3 cursor-pointer text-gray-600"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </X>
                                    <Unsplash
                                        onSelect={e => {
                                            setBackground(e)
                                            setShowModal(false)
                                        }}
                                    />
                                </div>
                            </Modal>
                        </div>
                    </div>
                    <button
                        className="button on-dark mt-8 mb-2"
                        onClick={() =>
                            setStored({ title, subtitle, background })
                        }
                    >
                        Save changes
                    </button>
                </div>
            </div>
            <div className="container mx-auto mt-12 flex justify-center">
                <Link href="/preview">
                    <a className="button on-dark">Preview in full-screen →</a>
                </Link>
            </div>
        </Layout>
    )
}
