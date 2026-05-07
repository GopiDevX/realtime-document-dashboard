import { useEffect, useState } from 'react';
import { socket, connectSocket, disconnectSocket } from '../socket/socketClient';

const Dashboard = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    // Connect to the socket server when dashboard mounts
    connectSocket();

    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      disconnectSocket();
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto animate-fade-in-up">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-brand-600 to-brand-800 rounded-2xl p-8 mb-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
          <p className="text-brand-100 max-w-xl">
            Manage your real-time documents, upload new files, and collaborate seamlessly. 
            Your connection to the real-time server is currently active.
          </p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-32 -mb-16 w-48 h-48 bg-brand-400/20 rounded-full blur-2xl"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Status Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">System Status</h3>
            <div className={`p-2 rounded-lg ${isConnected ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {isConnected ? 'Connected' : 'Disconnected'}
          </p>
          <div className="mt-4 flex items-center text-sm">
            <span className={`w-2 h-2 rounded-full mr-2 ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
            <span className="text-gray-500">Real-time Socket.IO link</span>
          </div>
        </div>

        {/* Documents Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">Active Documents</h3>
            <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-800">12</p>
          <div className="mt-4 flex items-center text-sm text-green-600 font-medium">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
            <span>+3 this week</span>
          </div>
        </div>

        {/* Uploads Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">Recent Uploads</h3>
            <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-800">48</p>
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <span>Last upload 2 hours ago</span>
          </div>
        </div>
      </div>

      {/* Recent Activity Table Skeleton */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="font-bold text-gray-800">Recent Activity</h3>
          <button className="text-sm text-brand-600 font-medium hover:text-brand-700">View All</button>
        </div>
        <div className="divide-y divide-gray-100">
          {[1, 2, 3].map((item) => (
            <div key={item} className="px-6 py-4 flex items-center hover:bg-gray-50/50 transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center mr-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-800">Quarterly_Report_Q3.pdf</h4>
                <p className="text-xs text-gray-500 mt-1">Edited by Jane Doe</p>
              </div>
              <span className="text-xs font-medium text-gray-400 bg-gray-100 px-3 py-1 rounded-full">2 mins ago</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
