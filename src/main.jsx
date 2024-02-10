import './index.css';

import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { App } from './App';
import SignInPage from './pages/auth/signin';
import SignUpPage from './pages/auth/signup';
import Campaign from './pages/campaigns/campaignId/Campaign';
import Campaigns from './pages/campaigns/Campaigns';
import Home from './pages/Home';

const router = createBrowserRouter([
    {
        element: <App />,
        children: [
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
            {
                path: '/auth/signup',
                element: <SignUpPage />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ChakraProvider>
            <RouterProvider router={router} />
        </ChakraProvider>
    </React.StrictMode>
);
