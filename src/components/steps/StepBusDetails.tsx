export default function StepBusDetails() {
    return (
        <div className="flex justify-between bg-gray-100/80 rounded-md px-8 py-5">
            <div className="space-y-3">
                <h3>Details</h3>
                {/* Bus Name */}
                <div>
                    <div className="flex flex-col mb-1">
                        <label className="text-sm text-gray-600">Bus Name</label>
                    </div>
                    <input
                        type="text"
                        className="border rounded-sm py-1.5 px-1 focus:ring focus:ring-blue-500 outline-none"
                        placeholder="Bus name"
                    />
                </div>

                {/* Bus Registration No */}
                <div>
                    <div className="flex flex-col mb-1">
                        <label className="text-sm text-gray-600">Registration</label>
                    </div>
                    <input
                        type="text"
                        className="border rounded-sm py-1.5 px-1 focus:ring focus:ring-blue-500 outline-none"
                        placeholder="XX X 0000"
                    />
                </div>
            </div>
            <div>right</div>
        </div>
    );
}
