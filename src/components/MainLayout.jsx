
import React, { useState } from "react";


import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from "react-error-boundary";

const MainLayout = () => {
    const [showAddModal, setAddShowModal] = useState(false);

    return (
        <>
            <Navbar showAddModal={showAddModal} setAddShowModal={setAddShowModal} />
            <div className="container mx-auto">
                <Outlet context={{ showAddModal, setAddShowModal }} />
            </div>

        </>
    );
};


export default MainLayout;