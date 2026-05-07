import NotificationCard from './NotificationCard';

const NotificationPanel = ({ notifications, isOpen, onClose, onMarkAsRead, onMarkAllAsRead }) => {
  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      {/* Invisible backdrop to capture clicks outside */}
      <div 
        className="fixed inset-0 z-40 bg-transparent" 
        onClick={onClose}
      ></div>

      <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden origin-top-right animate-pop">
        <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/80 backdrop-blur-md">
          <h3 className="font-bold text-gray-800">Notifications</h3>
          {unreadCount > 0 && (
            <button 
              onClick={onMarkAllAsRead}
              className="text-xs font-medium text-brand-600 hover:text-brand-800 transition-colors"
            >
              Mark all as read
            </button>
          )}
        </div>

        <div className="max-h-[400px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
              <p>No notifications yet</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {notifications.map(notification => (
                <NotificationCard 
                  key={notification._id} 
                  notification={notification} 
                  onMarkAsRead={onMarkAsRead}
                />
              ))}
            </div>
          )}
        </div>
        
        {notifications.length > 0 && (
          <div className="px-4 py-2 border-t border-gray-100 bg-gray-50 text-center">
            <button 
              onClick={onClose}
              className="text-xs font-medium text-gray-500 hover:text-gray-800 transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default NotificationPanel;
