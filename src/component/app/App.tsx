import React, {createRef} from 'react';
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import './App.css';
import { Footer, Header } from '../nav/Nav';
import Home from '../home/Home';
import {ScheißlisteNeue} from '../coolsheiBe/shitlist'
import Page404 from '../page404/Page404'
import Scape from '../scape/Scape';
import {FCWithChildren} from '../../util';
import {Resume} from "../Resume";

const Root: FCWithChildren = ({children}) => {
    return (
        <>
            <Header />
            <hr id="glowBar"></hr>
            <Scape />
            { children || <Outlet /> }
            <Footer />
        </>
    )
}

const Error = () => {
    return <Root>
        <Page404/>
    </Root>
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/coolescheiße",
                element: <ScheißlisteNeue />,
            },
            {
                path: "/resume",
                element: <Resume />,
            },
        ]
    },
]);

export default function App() {
    return (

        <div className="App" style={{height: "98vh"}} ref={createRef()}>
            <RouterProvider router={router} />
        </div>

    );
}