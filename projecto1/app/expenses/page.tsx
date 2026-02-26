"use client";

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Expense } from '../../components/types';
import { Filter, Search } from 'lucide-react';
import { FaDollarSign, FaGasPump, FaTruck } from 'react-icons/fa';

// Sub-component: empty state card
function EmptyExpensesState() {
    return (
        <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-md p-6">
            <Filter size={48} className="text-gray-300" />
            <p className="mt-4 text-gray-600 text-center">
                No expenses recorded. Start tracking your business expenses!
            </p>
            <Link
                href="/add-expense"
                className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Add Your First Expense
            </Link>
        </div>
    );
}

// main page
export default function ExpensesPage() {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [filterCategory, setFilterCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        // placeholder for fetch
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, []);

    const filteredExpenses = useMemo(() => {
        return expenses.filter(exp => {
            const matchesCategory =
                filterCategory === 'all' || exp.category === filterCategory;
            const matchesSearch =
                searchQuery === '' ||
                exp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                exp.vendor.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [expenses, filterCategory, searchQuery]);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* header */}
                <div className="mb-8 flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Expenses</h1>
                        <p className="text-gray-600 mt-2">
                            Track and manage all business expenses
                        </p>
                    </div>
                    <Link
                        href="/add-expense"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium"
                    >
                        Add Expense
                    </Link>
                </div>

                {/* summary cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500">Total Expenses</p>
                            <p className="text-xl font-semibold">$0.00</p>
                        </div>
                        <div className="bg-red-100 text-red-600 rounded-full p-2">
                            <FaDollarSign />
                        </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500">This Month</p>
                            <p className="text-xl font-semibold">$0.00</p>
                        </div>
                        <div className="bg-purple-100 text-purple-600 rounded-full p-2">
                            <FaDollarSign />
                        </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500">Gas</p>
                            <p className="text-xl font-semibold">$0.00</p>
                        </div>
                        <div className="bg-blue-100 text-blue-600 rounded-full p-2">
                            <FaGasPump />
                        </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500">Delivery</p>
                            <p className="text-xl font-semibold">$0.00</p>
                        </div>
                        <div className="bg-blue-100 text-blue-600 rounded-full p-2">
                            <FaTruck />
                        </div>
                    </div>
                </div>

                {/* filter/search */}
                <div className="bg-gray-100 rounded-lg p-6 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                <Filter className="inline mr-1" />
                                Filter by Category
                            </label>
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="all">All Expenses</option>
                                <option value="office-supplies">Office Supplies</option>
                                <option value="travel">Travel</option>
                                <option value="utilities">Utilities</option>
                                <option value="equipment">Equipment</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                <Search className="inline mr-1" />
                                Search
                            </label>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by description or vendor..."
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                    </div>
                </div>

                {/* content area */}
                {loading ? (
                    <div className="text-center py-8">Loading expenses...</div>
                ) : error ? (
                    <div className="text-center py-8 text-red-600">{error}</div>
                ) : expenses.length === 0 ? (
                    <EmptyExpensesState />
                ) : (
                    // future table view goes here
                    <div>{/* table of expenses will be displayed here */}</div>
                )}
            </div>
        </div>
    );
}
