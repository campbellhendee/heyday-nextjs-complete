import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import '../globals.css';

const Layout = ({ children }) => {
    return (
        <div>
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;