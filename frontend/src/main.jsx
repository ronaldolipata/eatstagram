import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import './index.css';
import mainRouter from '@/routes/main';
import reportWebVitals from './reportWebVitals';

const redirectUri = `${window.location.origin}/app/home`;
const rootElement = document.getElementById('root');
ReactDOM.createRoot(rootElement).render(
  // <React.StrictMode>
  <Auth0Provider
    domain={import.meta.env.EATS_AUTH0_DOMAIN}
    clientId={import.meta.env.EATS_AUTH0_CLIENT_ID}
    redirectUri={redirectUri}
    audience={import.meta.env.EATS_AUTH0_AUDIENCE}
  >
    <ChakraProvider>
      <RouterProvider router={mainRouter} />
    </ChakraProvider>
  </Auth0Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
