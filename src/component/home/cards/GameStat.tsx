import React, {FC, useEffect, useMemo, useState} from 'react';
import { getSteamApps, SteamApp } from '../../../util/service-requests/steam-requests';
import {GlowSurface} from "../../themed/GlowSurface";
import {glowString, theme} from "../../../util/cssbuild";

const GameStat: FC = () => {

    const [steamApps, setSteamApps] = useState<SteamApp[]>([]);
    const [steamApiError, setSteamApiError] = useState<boolean>(false);

    const mostPlayed = useMemo(() => {
        const sorted = steamApps.sort((a, b) => b.rawTime - a.rawTime);
        return sorted.slice(0, 3);
    }, [steamApps]);

    const recentlyPlayed = useMemo(() => {
        const sorted = steamApps.sort((a, b) => b.lastPlayed - a.lastPlayed);
        return sorted.slice(0, 3);
    }, [steamApps]);

    useEffect(() => {
        getSteamApps()
            .then(result => {
                const games = result.data.response.games;
                if (!games) {
                    console.error("No games from steam api.", result);
                    setSteamApiError(true);
                    return;
                }
                const apps = games.map((app) => new SteamApp(app));
                setSteamApps(apps);
            })
            .catch(e => {
                console.error(e);
                setSteamApiError(true);
            });
    }, []);

    return (
        <>
            {steamApiError && (
                <GlowSurface style={{
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "10px",
                    maxWidth: "140px",
                    border: "1px solid " + theme.glowRed,
                    boxShadow: '0px 0px 3px 1px ' + theme.glowRed,
                }}>
                    <span
                        style={{
                            color: theme.textRed,
                            textShadow: glowString(theme.glowRed, 1, 10),
                            fontSize: "14px",
                            fontWeight: "bold",
                            textAlign: "center"
                        }}
                    >Normally game statistics from my Steam profile would show here, but there was an API error :(</span>
                </GlowSurface>
            )}
            {!steamApiError && !steamApps.length && (
                <GlowSurface style={{
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "10px",
                    maxWidth: "120px",
                }}>
                    <span style={{
                        color: theme.textBlue,
                        textShadow: glowString(theme.textBlue, 1, 11),
                        fontSize: "14px",
                        fontWeight: "bold",
                        textAlign: "center"
                    }}>Loading game stats from the Steam public API...</span>
                </GlowSurface>
            )}
            {!!steamApps.length && (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "10px",
                    }}
                >
                    <GlowSurface style={{
                        alignItems: "center",
                        rowGap: "10px",
                        padding: "10px",
                    }}>
                        <span style={{
                            color: theme.textGold,
                            textShadow: glowString(theme.textGold, 1, 9, 13),
                        }}>Recently Played Games</span>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            rowGap: "3px",
                        }}>
                            {recentlyPlayed.map(app => (
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        whiteSpace: "nowrap",
                                        columnGap: "5px",
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
                                    >{app.timeSincePlayed}</span>
                                </div>
                            ))
                            }
                        </div>
                    </GlowSurface>
                    <GlowSurface style={{
                        alignItems: "center",
                        rowGap: "10px",
                        padding: "10px",
                    }}>
                        <span style={{
                            color: theme.textGold,
                            textShadow: glowString(theme.textGold, 1, 9, 13),
                        }}>Most Played Games</span>
                        <div style={{
                            width: "100%",
                        }}>
                            {mostPlayed.map(app => (
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        whiteSpace: "nowrap",
                                        columnGap: "5px",
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
                            }
                        </div>
                    </GlowSurface>
                </div>
            )}
        </>
    );

}

export default GameStat;