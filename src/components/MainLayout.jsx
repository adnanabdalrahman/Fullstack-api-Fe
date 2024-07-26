
import React, { useState } from "react";
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import { NotificationProvider } from '../context/NotificationContext';
import { ErrorBoundary } from "react-error-boundary";

const MainLayout = () => {
    const [showAddModal, setAddShowModal] = useState(false);

    return (
        <>
            <NotificationProvider>
                <Navbar showAddModal={showAddModal} setAddShowModal={setAddShowModal} />
                <div className="container mx-auto">
                    <Outlet context={{ showAddModal, setAddShowModal }} />
                </div>
            </NotificationProvider>
        </>
    );
};


export default MainLayout;