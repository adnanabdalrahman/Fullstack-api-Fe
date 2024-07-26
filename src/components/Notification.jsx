import React, { useEffect } from 'react';

const Notification = ({ message, type, onClose }) => {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                onClose();
            }, 2000);

            return () => clearTimeout(timer); // Clean up the timer on unmount
        }
    }, [message, onClose]);

    if (!message) return null;

    const notificationStyles = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500',
    };

    const backgroundColor = notificationStyles[type] || 'bg-blue-500';

    return (
        <div className={`fixed top-0 left-0 w-full p-4 text-white shadow-lg rounded-b-lg z-50 ${backgroundColor}`}>
            <div className="container mx-auto">
                <p>{message}</p>
            </div>
        </div>
    );
};

export default Notification;