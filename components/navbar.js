import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { PaintRoll, BarChartAlt2 } from "@styled-icons/boxicons-solid"
import { MenuAlt3, X } from "@styled-icons/heroicons-outline"
import styles from "./navbar.module.scss"

export default function Navbar() {
    const [show, setShow] = useState(false)
    const router = useRouter()

    // started from https://tailwindcss.com/components/navigation/#responsive-header
    return (
        <nav className="relative py-10">
            <div className="fixed z-10 md:absolute top-0 inset-x-0">
                <div
                    className={
                        "flex flex-wrap container py-6 bg-gray-100 md:items-center md:justify-between flex-col md:flex-row md:h-auto" +
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
                                className="p-0 text-gray-500 hover:text-gray-600 clear"
                                onClick={() => setShow(!show)}
                            >
                                {show ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <MenuAlt3 className="h-6 w-6" />
                                )}
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
                            {[
                                {
                                    url: "/metrics",
                                    text: "Metrics",
                                    Icon: BarChartAlt2,
                                },
                                {
                                    url: "/customise",
                                    text: "Customise",
                                    Icon: PaintRoll,
                                },
                            ].map(({ url, text, Icon }) => (
                                <Link href={url} key={url}>
                                    <a
                                        onClick={() => setShow(false)}
                                        className={
                                            `${styles.navLink}  block no-underline text-gray-600 hover:text-gray-800 focus:text-gray-800 border-gray-400 mt-5 md:mt-0 md:inline-block md:ml-4 ` +
                                            (router.pathname === url
                                                ? styles.active
                                                : "")
                                        }
                                    >
                                        <div className="md:hidden">
                                            <Icon className="h-8 w-8 mb-2" />
                                        </div>
                                        <div>{text}</div>
                                    </a>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
