import React from 'react';
import DashboardShell from './components/DashboardShell';

const App = () => {
    return (
        <DashboardShell>
            {/* Additional routes and components can be added here */}
            <h1 className="text-2xl font-bold">Welcome to the Real-time Document Dashboard</h1>
        </DashboardShell>
    );
};

export default App;