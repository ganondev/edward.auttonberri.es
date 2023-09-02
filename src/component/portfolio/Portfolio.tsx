import React, { Component, CSSProperties, PropsWithChildren } from 'react';
import './Portfolio.css';
import GlowSurface from '../themed/GlowSurface';
// import { NavLink, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';
import resume from 'img/resume.pdf';
import meAndHabibi from 'img/meandhabibi-downscale.jpg';
import libantDemo from 'img/libantDemo.png';

export default class Portfolio extends Component {

    render() {

        const extraStyles: CSSProperties = {
            width: '50%',
            paddingLeft: '1rem',
            paddingRight: '1.3rem',
            paddingBottom: '1.3rem',
            //height: '95%',
            overflowY: 'scroll',
            overflowX: 'hidden',
            textOverflow: 'wrap'
        };

        return  <div id="portfolio-root">
                    {/*TODO buttons to choose between pdf and doc types*/}
                    {/*<GlowSurface extraStyles={extraStyles} id="portfolio-area">*/}
                        {/*<Route render={({location}) => (*/}
                        {/*    <>*/}
                        {/*        <div id="resume">*/}
                        {/*            <NavLink to="/portfolio/resume" exact>[Resume]</NavLink>*/}
                        {/*            <nav className="header title">*/}
                        {/*                <ul>*/}
                        {/*                    <li><NavLink to="/portfolio/projects" exact activeClassName="portfolio-active">[Projects]</NavLink></li>*/}
                        {/*                    <li><NavLink to="/portfolio" exact activeClassName="portfolio-active">[About Me]</NavLink></li>*/}
                        {/*                    <li><NavLink to="/portfolio/experience" exact activeClassName="portfolio-active">[Experience]</NavLink></li>*/}
                        {/*                </ul>*/}
                        {/*            </nav>*/}
                        {/*        </div>*/}
                        {/*        <TransitionGroup style={{height:'79%'}}>*/}
                        {/*            <CSSTransition key={location.key} classNames="portfolio-active" timeout={0}>*/}
                        {/*                <Switch location={location}>*/}
                        {/*                    <Route exact path="/portfolio/resume" component={EmbedResume}/>*/}
                        {/*                    <Route exact path="/portfolio/projects" component={Projects}/>*/}
                        {/*                    <Route exact path="/portfolio" component={AboutMe}/>*/}
                        {/*                    <Route exact path="/portfolio/experience" component={Experience}/>*/}
                        {/*                </Switch>*/}
                        {/*            </CSSTransition>*/}
                        {/*        </TransitionGroup>*/}
                        {/*    </>*/}
                        {/*)}/>*/}
                    {/*</GlowSurface>*/}
                </div>

    }

}

function EmbedResume() {
    return <>
        <div style={{height: '100%'}}>
            <embed src={resume} width="100%" height="100%"/>
        </div>
    </>
}

function Projects() {
    
    return  <>
                <div style={{}}>
                    <Project title="Libant">
    
                        <img src={libantDemo} id="libant-demo"/>
                        <p style={{marginTop: 0}}>
                            <DescLink href="https://github.com/zefaxet/libant">[Libant]</DescLink> is an
                            open source library created to ease the process of designing and executing 
                            cellular automata. I created Libant with a focus on the idea of cellular
                            atomata simulations being driven by "actors". These actors, which are called 
                            "ants" in the library, exemplify the core idea behind this library: tracking
                            the state of a cellular automaton based on local activity instead of the
                            state of each individual cell.
                        </p>
                        <p>
                            With this library's philosophy, the actors themselves do not exist as part of
                            an automaton's world. Rather, they influence the world from a higher level.
                            In this way, the important focus of cellular automata -- the cells themselves
                            -- is not overlooked. The ants themselves are assigned individual rules which
                            are executed with every iteration of the automaton. These rules interact with
                            the world and modify its state. With this, cells no longer need their
                            own rules, though cell-specific rules are still available in the library.
                            Separate ants in the same simulation can even have different rules since they
                            are assigned separately, meaning you can watch the chaotic interaction
                            between two completely incompatible cellular automata. It's very fun to watch.
                        </p>
                        <p>
                            The library's main focus is extracting analytical data from the simulations
                            created, such as visitation distribution over a region of space. Toward this
                            end, the library will have support for use in many languages and environments.
                            Currently, the library supports use in <Tech>C</Tech> with MSVC and GCC, and
                            also contains <Tech>extensions to Python3</Tech>. It is slated to
                            get <Tech>WASM</Tech> support for making pretty websites with.
                        </p>
                        <p>
                            Libant's namesake is Langton's Ant, the cellular automaton around which the
                            actor focus was designed. The picture above is a run of that automaton using
                            the library's Python extensions behind a pygame frontend.
                        </p>
                        <p>
                            I started working on this in May 2018 for fun and in the pursuit of learning
                            C at a very deep level as well as Python's backend. I was able to convince
                            a professor to let me work on this project as a class for the following Fall
                            term. He gave me an A for it, so I guess he liked it.
                            <br/>
                            Thanks, <DescLink href="http://www2.latech.edu/~mike/">[Dr. O'Neal]</DescLink>!
                        </p>
                    </Project>
                    <Project title="This Website">
                        <p style={{ marginTop: 0 }}>
                            Hosted serverless through Amazon Web Services. Everything comes out of
                            a <Tech>Lambda</Tech> function or a proprietary API (e.g. Steam) that's proxied
                            through <Tech>API Gateway</Tech>.
                            <br/>
                            I got this bad ball of spaghetti code on it's own CI pipelines too.
                            I just have to push to master. The Git credentials are a secret though.
                        </p>
                        <ul className="techs">
                            Powered by:
                            <li className="tech">React 16 + TypeScript</li>
                            <li className="tech">Amazon Web Services</li>
                            <li className="tech">Sweat, Blood, and Carpal Tunnel</li>
                        </ul>
                        <p>
                            Theme inspired by my childhood love of Galaga
                            and <DescLink href="http://was.tl/">[Eric Wastl's]</DescLink> websites.
                            I dont know anything about the guy except that he is very talented with web
                            technology and design, especially <DescLink href="https://adventofcode.com/">[Advent of Code]</DescLink>,
                            which is the website that I based this site's aesthetic off of.
                            <br/>
                            I'm not a designer, so he should get at least some of the credit for this.
                            <br/>
                            I did do the canvas animations though, as I have a passion and interest for
                            the maths of <Tech>3D graphics</Tech>.
                        </p>
                    </Project>
                </div>
            </>
}

function AboutMe() {
    return <>
    <img src={meAndHabibi} />
    </>;
}

function Experience() {
    return <><p>TODO</p></>;
}

type ProjectProps = { title: string, children: React.JSX.Element[] };
class Project extends Component<ProjectProps> {

    render() {

        return  <>
                    <div id={this.props.title} className="project-title">
                        <h2>{`{${this.props.title}}`}</h2>
                    </div>
                    <div id={`${this.props.title}-content`} className="project-content">
                        {this.props.children}
                    </div>
                    <hr className="project-break"/>
                </>;

    }

}

type DescLinkProps = { href: string };
function DescLink(props: PropsWithChildren<DescLinkProps>) {
    return <a href={props.href} className="target-link">{props.children}</a>;
}

function Tech(props: PropsWithChildren<{}>) {
    return <span className="tech">{props.children}</span>;
}