export default () => (
    <div className="h-screen bg-gray-100 pt-8">
        <div className="text-center text-3xl">Admin UI</div>

        <div className="flex container mx-auto mt-8">
            <div className="card mr-6 mb-4">
                <h3>Admin config</h3>
                <div>
                    <div>Set image URL</div>
                    <input className="bg-gray-200" />
                    <button onClick={"test"}>Reset</button>
                </div>
            </div>

            <div className="card mr-6 mb-4">
                <h3>List of entries</h3>
                <div>
                    <div>Entry 1</div>
                    <div>Entry 2</div>
                    <div>Entry 3</div>
                </div>
            </div>

            <div className="card mr-6 mb-4">
                <h3>Haven't signed out</h3>
                <div>
                    <div>Entry 3</div>
                    <div>Entry 17</div>
                    <div>Entry 18</div>
                </div>
            </div>
        </div>
    </div>
)
