import './index.css';

import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App';
import { SessionProvider } from './components/providers/session-provider';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ChakraProvider>
            <BrowserRouter>
                <SessionProvider>
                    <App />
                </SessionProvider>
            </BrowserRouter>
        </ChakraProvider>
    </React.StrictMode>
);
