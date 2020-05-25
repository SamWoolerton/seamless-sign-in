import Head from "next/head"
import Link from "next/link"
import { useState } from "react"
import Layout, { siteTitle } from "@c/layout"
import PreviewWelcomeScreen from "@c/preview-welcome-screen"
import createPersistedState from "use-persisted-state"
const useStored = createPersistedState("admin-customise")
import { useBeforeunload } from "react-beforeunload"

export default () => {
    const [stored, setStored] = useStored({})

    const [title, setTitle] = useState(stored.title)
    const [subtitle, setSubtitle] = useState(stored.subtitle)
    const [background, setBackground] = useState(stored.background)

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
                                className="bg-gray-100 px-2 py-1 w-full mb-2"
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
                                className="bg-gray-100 px-2 py-1 w-full mb-2"
                                onChange={e => setSubtitle(e.target.value)}
                            />
                            <div>
                                <label
                                    htmlFor="setBackground"
                                    className="font-semibold text-gray-700 mt-2"
                                >
                                    Background image URL
                                </label>
                            </div>
                            <input
                                id="setBackground"
                                className="bg-gray-100 px-2 py-1 w-full mb-2"
                                value={background}
                                onChange={e => setBackground(e.target.value)}
                            />
                        </div>
                    </div>
                    <button
                        className="button on-dark mt-4 mb-2"
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
