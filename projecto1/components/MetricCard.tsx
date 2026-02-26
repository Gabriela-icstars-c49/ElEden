import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
    title: string;
    value: string;
    icon: LucideIcon;
    bgColor: string;
}

const MetricCard = ({ title, value, icon: Icon, bgColor }: MetricCardProps) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-600">{title}</p>
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                </div>
                <div className={`p-2 rounded-full ${bgColor}`}>
                    <Icon size={24} className="text-white" />
                </div>
            </div>
        </div>
    );
};

export default MetricCard;