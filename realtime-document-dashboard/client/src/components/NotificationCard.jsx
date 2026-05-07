const NotificationCard = ({ notification, onMarkAsRead }) => {
  const { _id, message, type, read, createdAt } = notification;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          </div>
        );
      case 'error':
        return (
          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 flex-shrink-0">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
        );
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.round(diffMs / 60000);
    const diffHours = Math.round(diffMs / 3600000);
    const diffDays = Math.round(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className={`flex items-start p-4 hover:bg-gray-50 transition-colors cursor-default ${!read ? 'bg-brand-50/30' : ''}`}>
      {getIcon()}
      <div className="ml-3 flex-1 min-w-0">
        <p className={`text-sm ${!read ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
          {message}
        </p>
        <p className="text-xs text-gray-500 mt-1">{formatTime(createdAt)}</p>
      </div>
      {!read && (
        <button 
          onClick={() => onMarkAsRead(_id)}
          className="ml-2 w-2 h-2 rounded-full bg-brand-500 hover:bg-brand-600 transition-colors hover:scale-150 flex-shrink-0 mt-1.5"
          title="Mark as read"
        ></button>
      )}
    </div>
  );
};

export default NotificationCard;
