import React, {createRef} from 'react';
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import './App.css';
import { Footer, Header } from '../nav/Nav';
import Home from '../home/Home';
import { Scheissliste } from '../coolsheiBe/shitlist'
import Page404 from '../page404/Page404'
import Scape from '../scape/Scape';
import {Portfolio, AboutMe, EmbedResume, Experience, Projects} from '../portfolio/Portfolio';
import {FCWithChildren} from '../../util';

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
                path: "/coolescheiBe",
                element: <Scheissliste />,
            },
            {
                path: "/portfolio",
                element: <Portfolio />,
                children: [
                    {
                        path: "/portfolio",
                        element: <AboutMe />,
                    },
                    {
                        path: "/portfolio/projects",
                        element: <Projects />,
                    },
                    {
                        path: "/portfolio/experience",
                        element: <Experience />,
                    },
                    {
                        path: "/portfolio/resume",
                        element: <EmbedResume />,
                    }
                ]
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