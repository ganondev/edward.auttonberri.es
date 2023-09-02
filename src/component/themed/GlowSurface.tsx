import React, { CSSProperties } from 'react'
import './GlowSurface.css'
import { concatStyles } from '../../util/cssbuild';

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
    children: React.JSX.Element;
}

export default class GlowSurface extends React.Component<GlowSurfaceProps> {

    static readonly defaultProps = {
        inline: false,
        extraStyles: {}
    }

    render() {

        return (
            
            //TODO Needs glow and padding variable and needs to fit children
            <div id={this.props.id} style={concatStyles(glowSurfaceCss(this.props.inline || false), this.props.extraStyles || {})}>

                {this.props.children}

            </div>

        );

    }

}