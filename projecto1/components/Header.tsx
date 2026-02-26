import { Home, Plus, Archive, Calendar, DollarSign } from 'lucide-react';

const Header = () => {
    return (
        <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <h1 className="text-2xl font-bold text-gray-900">Order Manager</h1>
                    <nav className="flex space-x-8">
                        <button className="flex items-center space-x-2 text-blue-600 border-b-2 border-blue-600 pb-2">
                            <Home size={18} />
                            <span>Dashboard</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 pb-2">
                            <Plus size={18} />
                            <span>New Order</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 pb-2">
                            <Archive size={18} />
                            <span>Past Orders</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 pb-2">
                            <Calendar size={18} />
                            <span>Future Orders</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 pb-2">
                            <DollarSign size={18} />
                            <span>Expenses</span>
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;