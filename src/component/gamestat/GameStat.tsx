import React, {Component, FC, useEffect, useState} from 'react';
import { getSteamApps, SteamApp } from '../../util/service-requests/steam-requests';
import './GameStat.css';
import {GlowSurfaceNew} from "../themed/GlowSurface";
import {theme} from "../../util/cssbuild";

type GameStatProps = { withHeader?: boolean, apps: number[] };

const GameStat: FC<GameStatProps> = ({withHeader, apps}) => {

    const [mostPlayed, setMostPlayed] = useState<SteamApp[]>([]);
    const [mostPlayedError, setMostPlayedError] = useState<boolean>(false);

    useEffect(() => {
        getSteamApps()
            .then(result => {
                const games = result.data.response.games;
                if (!games) {
                    console.error("No games from steam api.", result);
                    setMostPlayedError(true);
                    return;
                }
                const filteredApps = (
                    (games?.length)
                        ? games.filter((game) => apps.includes(game.appid))
                        : games)
                    .map((app) => new SteamApp(app));
                setMostPlayed(filteredApps);
            })
            .catch(e => {
                console.error(e);
                setMostPlayedError(true);
            });
    }, [apps]);

    return (
        <GlowSurfaceNew style={{flexDirection: "column", alignItems: "center", rowGap: "10px"}}>
            <span style={{
                color: theme.textGold,
                textShadow: `0 0 1px ${theme.textGold}, 0 0 9px ${theme.textGold}, 0 0 13px ${theme.textGold}`,
            }}>Most Played Games</span>
            {mostPlayedError && <span>API Error :(</span>}
            {!mostPlayedError && !mostPlayed.length && <span>LOADING</span>}
            {!!mostPlayed.length && (
                mostPlayed.map(app => (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: "100%",
                        }}
                        key={app.appId}
                    >
                        <span style={{
                            color: theme.textBlue,
                            textShadow: `0 0 3px ${theme.textBlue}, 0 0 9px ${theme.textBlue}, 0 0 11px ${theme.textBlue}`,
                        }}>{app.shortName}</span>
                        <span
                            style={{
                                color: theme.green
                            }}
                        >{app.time.hours}</span>
                    </div>
                ))
            )}
        </GlowSurfaceNew>
    );

}

export default GameStat;