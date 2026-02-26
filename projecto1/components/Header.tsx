"use client";

import { Home, Plus, Archive, Calendar, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
    const pathname = usePathname();
    return (
        <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <h1 className="text-2xl font-bold text-gray-900">Order Manager</h1>
                    <nav className="flex space-x-8">
                        <Link href="/">
                            <button className={`flex items-center space-x-2 pb-2 ${pathname === '/' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
                                <Home size={18} />
                                <span>Dashboard</span>
                            </button>
                        </Link>
                        <Link href="/new-order">
                            <button className={`flex items-center space-x-2 pb-2 ${pathname === '/new-order' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
                                <Plus size={18} />
                                <span>New Order</span>
                            </button>
                        </Link>
                        <Link href="/past-orders">
                            <button className={`flex items-center space-x-2 pb-2 ${pathname === '/past-orders' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
                                <Archive size={18} />
                                <span>Past Orders</span>
                            </button>
                        </Link>
                        <Link href="/future-orders">
                            <button className={`flex items-center space-x-2 pb-2 ${pathname === '/future-orders' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
                                <Calendar size={18} />
                                <span>Future Orders</span>
                            </button>
                        </Link>
                        <Link href="/expenses">
                            <button className={`flex items-center space-x-2 pb-2 ${pathname === '/expenses' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
                                <DollarSign size={18} />
                                <span>Expenses</span>
                            </button>
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;