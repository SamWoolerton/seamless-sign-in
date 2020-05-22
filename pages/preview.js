import Link from "next/link"

export default () => (
    <div className="relative h-screen">
        <div className="absolute inset-0 h-full">
            <img
                src="/images/default-background.jpg"
                className="relative h-full w-full object-cover"
            />
            <div className="absolute inset-0 h-full w-full bg-black bg-opacity-mask"></div>
        </div>

        <div className="flex flex-col justify-center content-center h-full relative">
            <div className="text-white font-bold text-center">
                <h1 className="text-5xl">Welcome to Example, Inc.</h1>
                <h3 className="text-2xl font-light">
                    Sign in or out, smoothly
                </h3>

                <div className="mt-12">
                    <Link href="/app/sign-in">
                        <a className="button on-dark mr-6">Sign in</a>
                    </Link>
                    <Link href="/app/sign-out">
                        <a className="button on-dark">Sign out</a>
                    </Link>
                </div>
            </div>
        </div>
    </div>
)
