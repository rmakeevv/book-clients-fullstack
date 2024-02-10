import React from 'react';
import Root from './Root';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
]);

export default Router;
