import React from 'react';

const DashboardShell = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 bg-white shadow-md">
                <div className="p-4">
                    <h1 className="text-xl font-bold">Dashboard</h1>
                </div>
                <nav className="mt-4">
                    <ul>
                        <li className="p-2 hover:bg-gray-200"><a href="#">Home</a></li>
                        <li className="p-2 hover:bg-gray-200"><a href="#">Documents</a></li>
                        <li className="p-2 hover:bg-gray-200"><a href="#">Settings</a></li>
                        <li className="p-2 hover:bg-gray-200"><a href="#">Profile</a></li>
                    </ul>
                </nav>
            </aside>
            <main className="flex-1 p-6">
                <h2 className="text-2xl font-semibold">Welcome to the Dashboard</h2>
                <div className="mt-4">
                    {/* Content goes here */}
                </div>
            </main>
        </div>
    );
};

export default DashboardShell;