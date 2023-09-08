import React, { DetailedHTMLProps, FC, HTMLAttributes, } from 'react'

export const GlowSurface: FC<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = ({
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
            flexDirection: style?.flexDirection || "column",
            minWidth: style?.minWidth || "fit-content",
        }}
        {...rest}
    >
    </div>
}