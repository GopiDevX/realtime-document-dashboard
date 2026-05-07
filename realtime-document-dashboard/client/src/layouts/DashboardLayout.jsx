import { Outlet, NavLink } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col shadow-sm z-10 hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white font-bold text-xl mr-3 shadow-md">
            D
          </div>
          <span className="font-bold text-gray-800 text-lg tracking-tight">RealtimeDocs</span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <NavLink 
            to="/" 
            end
            className={({ isActive }) => `flex items-center px-4 py-3 rounded-xl transition-all duration-200 font-medium ${isActive ? 'text-brand-600 bg-brand-50' : 'text-gray-600 hover:text-brand-600 hover:bg-brand-50/50'}`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            Dashboard
          </NavLink>
          <NavLink 
            to="/documents" 
            className={({ isActive }) => `flex items-center px-4 py-3 rounded-xl transition-all duration-200 font-medium ${isActive ? 'text-brand-600 bg-brand-50' : 'text-gray-600 hover:text-brand-600 hover:bg-brand-50/50'}`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            Documents
          </NavLink>
          <NavLink 
            to="/uploads" 
            className={({ isActive }) => `flex items-center px-4 py-3 rounded-xl transition-all duration-200 font-medium ${isActive ? 'text-brand-600 bg-brand-50' : 'text-gray-600 hover:text-brand-600 hover:bg-brand-50/50'}`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
            Uploads
          </NavLink>
        </nav>
        
        <div className="p-4 border-t border-gray-100">
          <button className="flex items-center w-full px-4 py-2 text-sm text-gray-500 hover:text-gray-800 transition-colors">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative overflow-hidden h-full">
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 z-10">
          <h1 className="text-xl font-bold text-gray-800">Overview</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-brand-500 transition-colors relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 border-2 border-white shadow-sm overflow-hidden">
              <img src="https://ui-avatars.com/api/?name=User&background=random" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50/50 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
