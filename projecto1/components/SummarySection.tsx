const SummarySection = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">Summary</h3>
            <div className="space-y-2">
                <div className="flex justify-between">
                    <span>Total Revenue</span>
                    <span>$0.00</span>
                </div>
                <div className="flex justify-between">
                    <span>Total Costs</span>
                    <span>$0.00</span>
                </div>
                <div className="flex justify-between font-semibold">
                    <span>Net Result</span>
                    <span className="text-green-600">$0.00</span>
                </div>
            </div>
        </div>
    );
};

export default SummarySection;