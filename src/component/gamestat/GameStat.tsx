import React, { Component } from 'react';
import { getSteamApps, SteamApp } from '../../util/service-requests/steam-requests';
import './GameStat.css';

type GameStatProps = { withHeader: boolean, apps: number[] };
type GameStatState = { apps: SteamApp[] | 404 };

export default class GameStat extends Component<GameStatProps, GameStatState> {

    static readonly defaultProps = {

        withHeader: false

    };

    get gameTable() {

        if (this.state) {

            return(

                this.state.apps === 404 ?

                    (<p>Steam API broke :(</p>)

                :

                    (<table>

                        <tbody>

                            {this.props.withHeader && <tr className="gameStatRecord">
                                <td className="gameStatHeader">Game</td>
                                <td className="gameStatHeader">Hours</td>
                            </tr>}
                            {this.state.apps.map( 
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

    constructor(props: GameStatProps) {

        super(props);
        this.setState(null);

    }

    componentDidMount() {

        getSteamApps((apps) => {

            this.setState({apps: apps});

        }, ...this.props.apps);

    }

    render() {

        return this.gameTable;

    }
}