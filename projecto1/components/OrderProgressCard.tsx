import { CheckCircle } from 'lucide-react';

const OrderProgressCard = () => {
    return (
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-lg shadow-lg mb-6">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-2xl font-bold">Order Progress</h2>
                    <p className="text-blue-100">Overall completion status</p>
                </div>
                <CheckCircle size={32} className="text-white" />
            </div>
            <div className="grid grid-cols-4 gap-4 mt-6">
                <div className="text-center">
                    <div className="text-3xl font-bold">0</div>
                    <div className="text-sm text-blue-100">Completed Orders</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl font-bold">0</div>
                    <div className="text-sm text-blue-100">Total Orders</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl font-bold">0</div>
                    <div className="text-sm text-blue-100">Pending/Scheduled</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl font-bold">0%</div>
                    <div className="text-sm text-blue-100">Completion Rate</div>
                </div>
            </div>
            <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                    <span>0 out of 0 orders delivered</span>
                    <span>0.0%</span>
                </div>
                <div className="w-full bg-blue-300 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
            </div>
        </div>
    );
};

export default OrderProgressCard;