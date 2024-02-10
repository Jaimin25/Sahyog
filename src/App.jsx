import { Outlet } from 'react-router-dom';

import Footer from './components/footer/footer';
import Navbar from './components/header/navbar';

export const App = () => {
    return (
        <main className="main flex h-full flex-col">
            <Navbar />
            <Outlet />
            <Footer />
        </main>
    );
};
