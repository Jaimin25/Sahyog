import '@uploadthing/react/styles.css';
import './index.css';

import { ChakraProvider } from '@chakra-ui/react';
import { Analytics } from '@vercel/analytics/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App';
import { SessionProvider } from './components/providers/session-provider';
import ScrollToTop from './components/scroll-to-top';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <SessionProvider>
          <ScrollToTop />
          <App />
          <Analytics />
        </SessionProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
