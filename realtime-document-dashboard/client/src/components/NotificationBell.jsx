import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { socket } from '../socket/socketClient';
import NotificationPanel from './NotificationPanel';

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const bellRef = useRef(null);

  const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchNotifications();

    const handleNewNotification = (notification) => {
      setNotifications(prev => [notification, ...prev]);
    };

    const handleBulkSuccess = (data) => {
      // Sometimes bulk success might trigger a backend notification creation,
      // but just in case, we fetch fresh notifications when a bulk upload succeeds.
      fetchNotifications();
    };

    socket.on('notification-received', handleNewNotification);
    socket.on('bulk-upload-success', handleBulkSuccess);

    return () => {
      socket.off('notification-received', handleNewNotification);
      socket.off('bulk-upload-success', handleBulkSuccess);
    };
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`${SERVER_URL}/api/notifications`);
      if (res.data.success) {
        setNotifications(res.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch notifications', error);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.patch(`${SERVER_URL}/api/notifications/${id}/read`);
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
    } catch (error) {
      console.error('Failed to mark notification as read', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.patch(`${SERVER_URL}/api/notifications/read-all`);
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (error) {
      console.error('Failed to mark all as read', error);
    }
  };

  const togglePanel = () => setIsOpen(!isOpen);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative" ref={bellRef}>
      <button 
        onClick={togglePanel}
        className={`p-2 transition-colors relative rounded-full ${isOpen ? 'bg-brand-50 text-brand-600' : 'text-gray-400 hover:text-brand-500 hover:bg-gray-50'}`}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
        
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-white"></span>
          </span>
        )}
      </button>

      <NotificationPanel 
        notifications={notifications} 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        onMarkAsRead={markAsRead}
        onMarkAllAsRead={markAllAsRead}
      />
    </div>
  );
};

export default NotificationBell;
