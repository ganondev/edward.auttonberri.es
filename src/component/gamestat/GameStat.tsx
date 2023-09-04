import React, {FC, useEffect, useState} from 'react';
import { getSteamApps, SteamApp } from '../../util/service-requests/steam-requests';
import {GlowSurfaceNew} from "../themed/GlowSurface";
import {glowString, theme} from "../../util/cssbuild";

type GameStatProps = { apps: number[] };

const GameStat: FC<GameStatProps> = ({apps}) => {

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
        <GlowSurfaceNew style={{
            flexDirection: "column",
            alignItems: "center",
            rowGap: "10px",
            padding: "10px",
        }}>
            <span style={{
                color: theme.textGold,
                textShadow: glowString(theme.textGold, 1, 9, 13),
            }}>Most Played Games</span>
            {mostPlayedError && <span>API Error :(</span>}
            {!mostPlayedError && !mostPlayed.length && (
                <span style={{
                    color: theme.textBlue,
                    textShadow: glowString(theme.textBlue, 3, 9, 11),
                }}>Loading...</span>
            )}
            <div style={{
                width: "95%",
            }}>
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
                                textShadow: glowString(theme.textBlue, 3, 9, 11),
                            }}>{app.shortName}</span>
                            <span
                                style={{
                                    color: theme.green,
                                    textShadow: glowString(theme.green, 10)
                                }}
                            >{app.time.hours}</span>
                        </div>
                    ))
                )}
            </div>
        </GlowSurfaceNew>
    );

}

export default GameStat;