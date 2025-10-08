import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/home';
import RootLayout from './pages/Layout';
import NotFound from './pages/not-found';

import PrivateRoute from './pages/private-route';

import Contact from './pages/contact';

import ErrorPage from './pages/error';

export const router = createBrowserRouter([
    {
        path: '',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path:'/',
                element: <Home />
            },
           
            {
                path:'/contact',
                element: <Contact />
            },
           
            {
                path:'*',
                element: <NotFound />
            },
           
        ]
    }
])