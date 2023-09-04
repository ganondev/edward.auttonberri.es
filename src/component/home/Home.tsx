import React from 'react';
import downscale from '../../img/downscale.png';
import GlowSurface from '../themed/GlowSurface';
import GameStat from '../gamestat/GameStat';
import './Home.css';
import { concatStyles, spaceTable } from '../../util/cssbuild';

export default function Home() {

    return (
        <span>
            <table style={concatStyles(spaceTable, {marginTop: "75px"})}>
                <tbody>
                    <tr>
                        <td><img src={downscale} className="me" alt="A sexy guy."/></td>
                        <td>
                            <GlowSurface>
                                <ul>
                                    <li key="1"><a href="https://github.com/ganondev">[GitHub]</a></li>
                                    <li key="3"><a href="https://www.linkedin.com/in/edward-auttonberry">[LinkedIn]</a></li>
                                </ul>
                            </GlowSurface>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="gameTableDiv">
                <GlowSurface inline>
                    <GameStat apps={[570, 730]}></GameStat>
                </GlowSurface>
            </div>
        </span>
    );

}