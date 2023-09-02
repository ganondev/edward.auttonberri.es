import React, {createRef} from 'react';
import { BrowserRouter as Router, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import { Footer, Header } from '../nav/Nav';
import Home from '../home/Home';
import { Scheissliste } from '../coolsheiBe/shitlist'
import Page404 from '../page404/Page404'
import Scape from '../scape/Scape';
import Portfolio from '../portfolio/Portfolio';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <Page404 />
    },
    {
        path: "/home",
        element: <Home />,
    },
    {
        path: "/coolescheiBe",
        element: <Scheissliste />,
    },
    {
        path: "/portfolio",
        element: <Portfolio />,
    },
]);

export default function App() {
    return (

        <div className="App" ref={createRef()}>
            <Router >
                <Header />
                <hr id="glowBar"></hr>
                <Scape />
                <RouterProvider router={router} />
                <Footer />
            </Router>
        </div>

    );
}