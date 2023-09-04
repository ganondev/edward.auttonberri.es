import React from 'react';
import downscale from '../../img/downscale.png';
import GlowSurface from '../themed/GlowSurface';
import GameStat from '../gamestat/GameStat';
import './Home.css';

export default function Home() {

    return (
        <div style={{
            display: "grid",
            gridTemplate: "auto auto / auto auto",
            width: "80%",
            height: "80%",
            margin: "auto",
        }}>
            <div style={{margin: "auto"}}>
                <img src={downscale} className="me" alt="A sexy guy."/>
            </div>
            <div style={{margin: "auto"}}>
                <GlowSurface>
                    <ul>
                        <li key="1"><a href="https://github.com/ganondev">[GitHub]</a></li>
                        <li key="3"><a href="https://www.linkedin.com/in/edward-auttonberry">[LinkedIn]</a></li>
                    </ul>
                </GlowSurface>
            </div>
            <div style={{margin: "auto"}}>
                <GameStat apps={[570, 730]}></GameStat>
            </div>
            <div style={{margin: "auto"}}/>
        </div>
    );

}