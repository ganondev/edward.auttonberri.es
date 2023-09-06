import { CSSProperties } from 'react';

export const theme = {
	
	green: "#00cc00",
	textGreen: "#00aa00",
	textRed: "#e86363",
	glowRed: "#e72e2e",
	textBlue: "#0092f2",
	textGold: "#eace00",
	textPurple: "#fe4eda",
	
}

export function glowString(color: string | number, ...radii: number[]): string {

	return radii.map(radius => `0 0 ${radius}px ${color}`).join(",");

}

export function concatStyles(...styles: CSSProperties[]): CSSProperties {
	
	return Object.assign({}, ...styles);
	
}