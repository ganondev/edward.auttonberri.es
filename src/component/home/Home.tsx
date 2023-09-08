import React from 'react';
import downscale from '../../img/downscale.png';
import {GlowSurface} from '../themed/GlowSurface';
import GameStat from './cards/GameStat';
import './Home.css';
import {Projects} from "./cards/Projects";
import {glowString, theme} from "../../util/cssbuild";
import {Link} from "react-router-dom";

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
                <GlowSurface
                    style={{
                        alignItems: "center",
                        rowGap: "10px",
                        padding: "10px",
                    }}
                >
                    <span style={{
                        color: theme.textGold,
                        textShadow: glowString(theme.textGold, 1, 9, 13),
                    }}>Links</span>
                    <ul>
                        <li key="1"><a href="https://github.com/ganondev">[GitHub]</a></li>
                        <li key="3"><a href="https://www.linkedin.com/in/edward-auttonberry">[LinkedIn]</a></li>
                        <li><Link to="/resume">[Resume]</Link></li>
                        <li><Link to="/coolescheiße">[S-Index]</Link></li>
                    </ul>
                </GlowSurface>
            </div>
            <div style={{margin: "auto"}}>
                <GameStat/>
            </div>
            <div style={{margin: "auto"}}>
                <Projects/>
            </div>
        </div>
    );

}