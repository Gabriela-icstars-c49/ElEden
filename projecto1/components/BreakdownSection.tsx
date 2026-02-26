const BreakdownSection = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">Current Month Breakdown</h3>
            <div className="space-y-4">
                <div>
                    <div className="flex justify-between">
                        <span>Earnings</span>
                        <span className="text-green-600">0.0%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between">
                        <span>Costs</span>
                        <span className="text-red-600">0.0%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BreakdownSection;