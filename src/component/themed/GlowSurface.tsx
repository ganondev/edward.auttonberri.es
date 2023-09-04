import React, {CSSProperties, DetailedHTMLProps, FC, HTMLAttributes, PropsWithChildren} from 'react'
import './GlowSurface.css'
import { concatStyles } from '../../util/cssbuild';
import {FCWithChildren} from "../../util";

function glowSurfaceCss(inline: boolean, glowColor?: string) {

    return {
    
        background: 'black',
        padding: '5px',
        border: `1px solid ${glowColor || 'green'}`,
        boxShadow: '0px 0px 3px 1px green',
        display: inline ? 'inline-block' : 'block',
    
    }

}

interface GlowSurfaceProps {
    inline?: boolean;
    extraStyles?: CSSProperties;
    id?: string;
    glowColor?: string;
}

const GlowSurface: FCWithChildren<GlowSurfaceProps> = ({id, inline, extraStyles, children}) => {
    return (
        //TODO Needs glow and padding variable and needs to fit children
        <div id={id} style={concatStyles(glowSurfaceCss(inline || false), extraStyles || {})}>
            {children}
        </div>
    );
}

export const GlowSurfaceNew: FC<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = ({
    style, ...rest
}) => {
    return <div
        style={{
            ...(style || {}),
            background: style?.background || 'black',
            padding: style?.padding || '5px',
            border: style?.border || '1px solid green',
            boxShadow: style?.boxShadow || '0px 0px 3px 1px green',
            display: style?.display || "flex",
            minWidth: style?.minWidth || "fit-content",
        }}
        {...rest}
    >
    </div>
}

export default GlowSurface;