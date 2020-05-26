const placeholder = {
    title: "Welcome to Example, Inc.",
    subtitle: "Sign in or out, smoothly",
    background: "/images/default-background.jpg",
}

export default function PreviewWelcomeScreen(props) {
    const withoutEmpty = obj =>
        Object.fromEntries(
            Object.entries(obj).filter(([k, v]) => v !== "" && v !== undefined),
        )
    const { title, subtitle, background } = {
        ...placeholder,
        ...withoutEmpty(props),
    }

    return (
        <>
            <div className="absolute inset-0 h-full">
                <img
                    src={background}
                    className="relative h-full w-full object-cover"
                />
                <div className="absolute inset-0 h-full w-full bg-black bg-opacity-mask"></div>
            </div>

            <div className="flex flex-col justify-center content-center h-full relative">
                <div className="text-white font-bold text-center">
                    <h1 className="text-5xl">{title}</h1>
                    <h3 className="text-2xl font-light">{subtitle}</h3>

                    <div className="mt-12">
                        <a className="button cursor-pointer mr-6">Sign in</a>
                        <a className="button cursor-pointer ">Sign out</a>
                    </div>
                </div>
            </div>
        </>
    )
}
