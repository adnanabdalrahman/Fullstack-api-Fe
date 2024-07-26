
import React, { useState } from "react";
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import { NotificationProvider } from '../context/NotificationContext';
import { ErrorBoundary } from "react-error-boundary";
import Footer from './Footer';

const MainLayout = () => {
    const [showAddModal, setAddShowModal] = useState(false);

    return (
        <>
            <NotificationProvider>
                <Navbar showAddModal={showAddModal} setAddShowModal={setAddShowModal} />
                <div className="container mx-auto">
                    <Outlet context={{ showAddModal, setAddShowModal }} />
                </div>
                <Footer /> {Footer}
            </NotificationProvider>
        </>
    );
};


export default MainLayout;