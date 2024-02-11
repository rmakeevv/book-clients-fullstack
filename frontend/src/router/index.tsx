import React from 'react';
import Root from './Root';

import { createBrowserRouter } from 'react-router-dom';
import Auth from './Auth';
import AuthProvider from './AuthProvider';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <AuthProvider />,
    children: [
      {
        index: true,
        element: <Root />,
      },
      {
        path: 'auth',
        element: <Auth />,
      },
    ]
  }
  
]);

export default Router;
