import '@uploadthing/react/styles.css';
import './index.css';

import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App';
import { FundraiserProvider } from './components/providers/fundraisers-provider';
import { SessionProvider } from './components/providers/session-provider';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ChakraProvider>
            <BrowserRouter>
                <SessionProvider>
                    <FundraiserProvider>
                        <App />
                    </FundraiserProvider>
                </SessionProvider>
            </BrowserRouter>
        </ChakraProvider>
    </React.StrictMode>
);
