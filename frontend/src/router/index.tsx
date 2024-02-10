import React from 'react';
import Root from './Root';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Auth from './Auth';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: '/auth',
    element: <Auth />,
  },
]);

export default Router;
