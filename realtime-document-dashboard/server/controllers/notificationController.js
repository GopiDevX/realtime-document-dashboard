import Notification from '../models/Notification.js';

// @desc    Get all notifications
// @route   GET /api/notifications
// @access  Public
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: notifications });
  } catch (error) {
    console.error(`Error fetching notifications: ${error.message}`);
    return res.status(500).json({ success: false, error: 'Server Error fetching notifications' });
  }
};

// @desc    Mark a notification as read
// @route   PATCH /api/notifications/:id/read
// @access  Public
export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true, runValidators: true }
    );

    if (!notification) {
      return res.status(404).json({ success: false, error: 'Notification not found' });
    }

    return res.status(200).json({ success: true, data: notification });
  } catch (error) {
    console.error(`Error marking notification as read: ${error.message}`);
    return res.status(500).json({ success: false, error: 'Server Error marking notification' });
  }
};

// @desc    Mark all notifications as read
// @route   PATCH /api/notifications/read-all
// @access  Public
export const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany({ read: false }, { read: true });
    
    return res.status(200).json({ success: true, message: 'All notifications marked as read' });
  } catch (error) {
    console.error(`Error marking all notifications as read: ${error.message}`);
    return res.status(500).json({ success: false, error: 'Server Error updating notifications' });
  }
};
