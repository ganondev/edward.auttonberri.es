import React, {FC} from "react";
import {GlowSurfaceNew} from "./themed/GlowSurface";
import resume from "../img/resume.pdf";
import {glowString, theme} from "../util/cssbuild";
import {NavLink} from "react-router-dom";

export const Resume: FC = () => {
    return (
        <GlowSurfaceNew
            style={{
                width: "50vw",
                height: "65vh",
                margin: "50px auto",
                padding: "5vh 3vw",
                alignItems: "center",
                rowGap: "10px"
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    alignItems: "center",
                }}
            >
                <NavLink
                    to={'/'}
                    style={{
                        flex: 1,
                        textAlign: "center",
                    }}
                >◀ [Back]</NavLink>
                <span style={{
                    color: theme.textGold,
                    textShadow: glowString(theme.textGold, 1, 3, 6, 13, 19, 20),
                    fontSize: "26px",
                    flex: 3,
                    textAlign: "center",
                }}>Resume</span>
                <div
                    // for spacing
                    style={{flex: 1}}
                >

                </div>
            </div>
            <embed src={resume}  style={{
                height: "100%",
                width: "100%",
            }}/>
        </GlowSurfaceNew>
    )
}