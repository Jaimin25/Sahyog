import './index.css';

import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Footer from './components/footer/footer';
import Navbar from './components/header/navbar';
import SignInPage from './pages/auth/signin';
import Campaign from './pages/campaigns/campaignId/Campaign';
import Campaigns from './pages/campaigns/Campaigns';
import Home from './pages/Home';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <div>404 Not Found</div>,
    },
    {
        path: '/campaigns',
        element: <Campaigns />,
    },
    {
        path: '/campaigns/:campaignId',
        element: <Campaign />,
    },
    {
        path: '/auth/signin',
        element: <SignInPage />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ChakraProvider>
            <Navbar />
            <RouterProvider router={router} />
            <Footer />
        </ChakraProvider>
    </React.StrictMode>
);
