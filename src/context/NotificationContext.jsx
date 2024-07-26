import React, { createContext, useState, useContext } from 'react';
import Notification from '../components/Notification';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState({ message: '', type: '' });

    const showNotification = (message, type = 'info') => {
        setNotification({ message, type });
        // Auto-dismiss handled by Notification component
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            <Notification
                message={notification.message}
                type={notification.type}
                onClose={() => setNotification({ message: '', type: '' })}
            />
        </NotificationContext.Provider>
    );
};