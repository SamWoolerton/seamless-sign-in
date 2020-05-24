import { useState } from "react"
import Link from "next/link"

export default () => {
    const [show, setShow] = useState(false)

    // started from https://tailwindcss.com/components/navigation/#responsive-header
    return (
        <nav className="relative py-10">
            <div className="absolute top-0 inset-x-0">
                <div
                    className={
                        "flex flex-wrap container mx-auto py-6 px-4 relative z-10 bg-gray-100 md:items-center md:justify-between md:px-0 flex-col md:flex-row md:h-auto" +
                        (show ? " h-screen" : "")
                    }
                >
                    <div className="flex justify-between w-full md:w-auto">
                        <Link href="/">
                            <a className="no-underline font-semibold text-xl tracking-tight text-gray-600">
                                Seamless
                            </a>
                        </Link>

                        <div className="block md:hidden">
                            <button
                                className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-600 hover:border-gray-600"
                                onClick={() => setShow(!show)}
                            >
                                <svg
                                    className="fill-current h-3 w-3"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <title>Menu</title>
                                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div
                        className={
                            "w-full my-auto md:flex md:items-center md:w-auto" +
                            (show ? " block" : " hidden")
                        }
                    >
                        <div className="text-center text-lg md:text-base md:ml-auto">
                            <Link href="/metrics">
                                <a className="block no-underline text-gray-600 hover:text-gray-800 mt-5 md:mt-0 md:inline-block mr-4">
                                    Metrics
                                </a>
                            </Link>
                            <Link href="/customise">
                                <a className="block no-underline text-gray-600 hover:text-gray-800 mt-5 md:mt-0 md:inline-block">
                                    Customise
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
