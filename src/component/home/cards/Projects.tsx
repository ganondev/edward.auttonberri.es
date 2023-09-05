import React, {FC, useState} from "react";
import {GlowSurfaceNew} from "../../themed/GlowSurface";
import {glowString, theme} from "../../../util/cssbuild";

export const Projects: FC = () => {

    const [fellfieldLabel, setLabel] = useState("[Fellfield (WIP)]");


    return <GlowSurfaceNew
        style={{
            alignItems: "center",
            rowGap: "10px",
            padding: "10px",
        }}
    >
        <span style={{
            color: theme.textGold,
            textShadow: glowString(theme.textGold, 1, 9, 13),
        }}>Active Projects</span>
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                padding: "10px",
            }}
        >
            <a href="https://shallnotpass.io">[shallnotpass.io]</a>
            <a href="https://note.soy">[note.soy (WIP)]</a>
            <a onClick={() => {
                setLabel("No link yet :T");
            }}>{fellfieldLabel}</a>
        </div>
    </GlowSurfaceNew>
}