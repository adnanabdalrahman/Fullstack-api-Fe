import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white p-4 mt-4">
            <div className="container mx-auto text-center">
                &copy; {new Date().getFullYear()} This app is brought to you by Adnan, Arthur and Sebastian. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;