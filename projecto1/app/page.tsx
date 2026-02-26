import OrderProgressCard from '../components/OrderProgressCard';
import MetricCard from '../components/MetricCard';
import BreakdownSection from '../components/BreakdownSection';
import SummarySection from '../components/SummarySection';
import HistoricalPerformance from '../components/HistoricalPerformance';
import { DollarSign, Package, TrendingUp, ShoppingCart } from 'lucide-react';

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <p className="text-center text-gray-600 mb-4">February 2026</p>
                <OrderProgressCard />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <MetricCard title="Revenue" value="$0.00" icon={DollarSign} bgColor="bg-green-500" />
                    <MetricCard title="Costs" value="$0.00" icon={Package} bgColor="bg-red-500" />
                    <MetricCard title="Profit/Loss" value="$0.00" icon={TrendingUp} bgColor="bg-green-500" />
                    <MetricCard title="Profit Margin" value="0.0%" icon={ShoppingCart} bgColor="bg-blue-500" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <BreakdownSection />
                    <SummarySection />
                </div>
                <HistoricalPerformance />
            </main>
        </div>
    );
}