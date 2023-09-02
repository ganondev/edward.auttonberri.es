import React, {createRef} from 'react';
import * as router from 'react-router';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import { Footer, Header } from '../nav/Nav';
import Home from '../home/Home';
import { Scheissliste } from '../coolsheiBe/shitlist'
import Page404 from '../page404/Page404'
import Scape from '../scape/Scape';
import Portfolio from '../portfolio/Portfolio';

export default function App() {
    return (

        <div className="App" ref={createRef()}>
            <Router >
                <Header />
                <hr id="glowBar"></hr>
                <Scape />
                <Switch>

                    <Route exact path={["/", "/home"]} component={Home} />
                    <Route path="/coolescheiBe" component={Scheissliste} />
                    <Route path="/portfolio" component={Portfolio} />

                    <Route component={Page404} />

                </Switch>
                <Footer />
            </Router>
        </div>

    );
}