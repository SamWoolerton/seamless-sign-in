import Navbar from "@/components/navbar"

export default () => (
    <>
        <Navbar />
        <main>
            <div className="container mx-auto mt-12">
                <div className="py-6 flex flex-col justify-center text-center">
                    <div className="flex justify-center py-2">
                        <div className="bg-red-200 text-red-800 rounded-full font-bold py-1 px-6 text-sm">
                            404
                        </div>
                    </div>
                    <div className="text-gray-700">
                        Sorry, that page doesn't exist.
                    </div>
                </div>
            </div>
        </main>
    </>
)
