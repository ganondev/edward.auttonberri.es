import { CSSProperties } from 'react';

export const theme = {
	
	green: "#00cc00",
	textBlue: "#0092f2",
	textGold: "#eace00",
	magenta: "#fe4eda"
	
}


export const themeGreen = "#00cc00";

export function concatStyles(...styles: CSSProperties[]): CSSProperties {
	
	return Object.assign({}, ...styles);
	
}

export function glow(color: number | string): CSSProperties {
	
	return {
		
		textDecoration: "none",
		textShadow: `0 0 2px ${color}, 0 0 5px ${color}`
		
	};
	
}

export function neonGlowOut(color?: number | string): CSSProperties {
	
	return {
		
		border: `solid 1px ${color || theme.green}`,
		//TODO shadow
		
	};
	
}

export function marginedTable(pixel: number): CSSProperties {
	
	// Spread operator assignment prevents 
	// 'cannot assign to read-only' errors
	let table = { ...spaceTable };
	table.width = `calc(100% - ${pixel * 2}px)`;
	
	return concatStyles({
		
		marginLeft: `${pixel}px`,
		marginRight: `${pixel}px`
		
	}, table);
	
}

export function neonGlowText(color: string): CSSProperties {

	return concatStyles(glow(color), { color });

}


export const titleGlow: CSSProperties = {

	color: theme.green

}

export const spaceTable: CSSProperties = {
	
    height: "100%",
	width: "100%",
	marginTop: "75px"
	
};