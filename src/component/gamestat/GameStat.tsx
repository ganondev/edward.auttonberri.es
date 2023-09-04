import React, {Component, FC, useEffect, useState} from 'react';
import { getSteamApps, SteamApp } from '../../util/service-requests/steam-requests';
import './GameStat.css';

type GameStatProps = { withHeader?: boolean, apps: number[] };
type GameStatState = { apps: SteamApp[] | 404 };

const GameStat: FC<GameStatProps> = ({withHeader, apps}) => {

    const [state, setState] = useState<GameStatState | null>(null);

    useEffect(() => {
        getSteamApps()
            .then(result => {
                const games = result.data.response.games;
                if (!games) {
                    console.error("No games from steam api.", result);
                    return;
                }
                const filteredApps = (
                    (games?.length)
                        ? games.filter((game) => apps.includes(game.appid))
                        : games)
                    .map((app) => new SteamApp(app));
                setState({apps: filteredApps});
            })
            .catch(e => {
                console.error(e);
                setState({apps: 404});
            });
    }, [apps]);

    if (state) {

        return(

            state.apps === 404 ?

                (<p>Steam API broke :(</p>)

                :

                (<table>

                    <tbody>

                    {withHeader && <tr className="gameStatRecord">
                        <td className="gameStatHeader">Game</td>
                        <td className="gameStatHeader">Hours</td>
                    </tr>}
                    {state.apps.map(
                        (app) => {
                            return (
                                <tr key={Math.random()} className="gameStatRecord">
                                    <td className="gameStatRecordID"><span className="gameStatCellIDData">{app.shortName}</span></td>
                                    <td><span className="gameStatCellData">{app.time.hours}</span></td>
                                </tr>
                            );
                        }
                    )}

                    </tbody>

                </table>)

        );

    } else {

        return <p>no apps</p>;

    }
}

export default GameStat;