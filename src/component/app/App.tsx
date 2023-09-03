import React, {createRef, FC} from 'react';
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import './App.css';
import { Footer, Header } from '../nav/Nav';
import Home from '../home/Home';
import { Scheissliste } from '../coolsheiBe/shitlist'
import Page404 from '../page404/Page404'
import Scape from '../scape/Scape';
import Portfolio from '../portfolio/Portfolio';

type FCWithChildren<T = {}> = FC<T & { children?: React.JSX.Element }>;

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
                path: "/",
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
        ]
    },
]);

export default function App() {
    return (

        <div className="App" ref={createRef()}>
            <RouterProvider router={router} />
        </div>

    );
}