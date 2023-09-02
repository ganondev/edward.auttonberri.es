import React, { Component, CSSProperties, ReactNode } from 'react';
import GlowSurface from '../themed/GlowSurface'
import * as css from '../../util/cssbuild';
import { concatStyles as cat } from '../../util/cssbuild';
import { getShit, ScheissDaten } from '../../util/service-requests/shitlist-requests';
import './shitlist.css';

//TODO it doesn't need to take the width of the whole screen
export class Scheissliste extends Component<{}, {shit: ScheissDaten[]}> {
	
	constructor(props: {}) {
		
		super(props);
		this.state = { shit: [] };
		
	}
	
	componentDidMount() {
		
		getShit((shits) => this.setState({ shit: shits }));
		
	}
    
    render() {

        return (<div style={{margin: "10px", marginTop: "75px"}}>
					<GlowSurface>
						<table style={css.concatStyles(css.marginedTable(2), css.neonGlowOut(), {borderSpacing: "0px", borderCollapse: "collapse", tableLayout: "fixed"})}>
							<tbody>
								<Titelscheiss><td align="center" colSpan={2} style={css.neonGlowText("white")}><b>THE</b> epitomical list of cool stuff</td></Titelscheiss>
								<tr style={css.neonGlowOut()}>
									<td align="center" colSpan={2}>
										<input placeholder={"" /*"Make this work, give it a nice border, have it position better, and make the font match"*/} style={{color: "white", background: "black", border: "none", width: "100%"}}/>
									</td>
								</tr>
								<tr>
									{
										//TODO Overflow hidden
									}
									<td align="center" style={cat({overflow: "hidden"}, css.neonGlowOut(), css.neonGlowText(css.theme.textBlue))}>Thing</td>
									<td align="center" style={cat({overflow: "hidden"}, css.neonGlowOut(), css.neonGlowText(css.theme.textBlue))}>Description</td>
								</tr>
								{
									//TODO there should be a little spacing after the header rows
									this.state.shit.map(
									
										(shit) => {
											
											return(<Scheissstueck key={shit.name} data={shit}/>);
											
										}
										
									)
									
								}
							</tbody>
						</table>
					</GlowSurface>
				</div>
		);

    }

}

type BaseScheissState = { content: ReactNode };

abstract class BaseScheiss<T> extends Component<T, BaseScheissState> {

	private opts = {};

	private style: CSSProperties;

	state = { content: <></> }

	constructor(props: T) {
		
		super(props);
		
		this.style = {
			
			textAlign: "center"
			
		};
		
	}

	render() {

        return (<tr {...this.opts} style={this.style}>{this.state.content}</tr>);

    }

}

type ScheissstueckProps = { data: ScheissDaten };

class Scheissstueck extends BaseScheiss<ScheissstueckProps> {
	
	componentDidMount() {
		
		this.setState({ content: <>
			<td style={css.neonGlowOut()}>
				<a href={this.props.data.link} className="item-link">
					{this.props.data.name}
				</a>
			</td>
			<td style={css.neonGlowOut()}>{this.props.data.description}</td>
		</>});

	}

}

class Titelscheiss extends BaseScheiss<{ children: ReactNode }> {

	componentDidMount() {
		
		this.setState({content: this.props.children});
		
	}
	
}