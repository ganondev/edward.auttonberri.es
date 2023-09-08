import React, {FC} from 'react';
import {GlowSurface} from '../themed/GlowSurface'
import {glowString, theme} from '../../util/cssbuild';
import './shitlist.css';

interface Scheiß {
	name: string;
	link: string;
	description: string;
}

const scheißen: Scheiß[] = [
	{
		name: "Sedja",
		link: "https://www.sejda.com/",
		description: "Online PDF editor for quick and dirty forgeries",
	},
	{
		name: "sendvid",
		link: "http://sendvid.com",
		description: "Easy short term video sharing."
	},
	{
		name: "temp.sh",
		link: "http://temp.sh",
		description: "Quick and handy file and text sharing."
	},
	{
		name: "catgasm.cc",
		link: "https://catgasm.cc/",
		description: "Random cat generator."
	}
];

interface ScheißRudernProps {
	item: React.JSX.Element;
	description: React.JSX.Element;
}

const ScheißRudern: FC<ScheißRudernProps> = ({item, description}) => {

	return (
		<div style={{
			display: "flex",
			flexDirection: "row",
			width: "100%",
			padding: "10px 0",
			boxShadow: `0 8px 5px -5px ${theme.green}`,
			margin: "5px 0",
		}}>
			<div style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flex: 1,
			}}>
				{item}
			</div>
			<div style={{
				display: "flex",
				justifyContent: "center",
				flex: 2,
			}}>
				{description}
			</div>
		</div>
	)

}

export const ScheißlisteNeue: FC = () => {

	return (
		<GlowSurface style={{
			margin: "75px auto",
			alignItems: "center",
			width: "60%",
			padding: "50px 10vw",
		}}>
			<span style={{
				marginBottom: "20px",
				color: "white",
				textShadow: glowString("white", 2, 5),
			}}><b>THE</b> epitomical list of cool shit</span>
			<ScheißRudern
				item={(
					<span style={{
						color: theme.textBlue,
						textShadow: glowString(theme.textBlue, 2, 5),
					}}>Thing</span>
				)}
				description={(
					<span style={{
						color: theme.textBlue,
						textShadow: glowString(theme.textBlue, 2, 5),
					}}>Description</span>
				)}
			/>
			{
				scheißen.map(s => {
					return (
						<ScheißRudern
							item={(
								<a
									className="item-link"
									href={s.link}
								>
									[{s.name}]
								</a>
							)}
							description={(
								<span style={{
									textAlign: "center",
									color: theme.textGreen,
								}}>{s.description}</span>
							)}
						/>
					);
				})
			}
		</GlowSurface>
	)

}