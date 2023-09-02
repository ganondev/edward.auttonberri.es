import React from 'react';
import './Scape.css';

// CONSTANTS
const STAR_COUNT = 1000;
const SPEED = 300;

const DEPTH_RANGE = 6000;

// rendering constants
const MIN_DEPTH = 200;      // minimum "distance from screen" that a star must have

const SIZE_RANGE = 0.75;    // how much the size of a star can vary
const MIN_SIZE = 1;         // minimum size of a start
//

type Tercile = 1 | 2 | 3;

interface Star {

    x: number;
    y: number;
    size: number;
    speed: number;
    tercile: Tercile;

}

class Stars {

    private t1: Star[] = [];
    private t2: Star[] = [];
    private t3: Star[] = [];

    get stars(): Star[] {

        return [ ...this.t1, ...this.t2, ...this.t3 ];

    }

    constructor(private xStart: number, private height: number) { }
    
    pushNewStar(oldStar?: Star): void {

        const depthDistribution = [this.t1, this.t2, this.t3];

        let tercile: Tercile, z: number;

        if (oldStar) {
	
            tercile = oldStar.tercile
            z = Math.random() * (DEPTH_RANGE / 3 * tercile)

        } else {

            do {
                
                const depthOffset = Math.random() * DEPTH_RANGE;
                tercile = this.getTercile(depthOffset);
                z = depthOffset + MIN_DEPTH;
                
            } while (depthDistribution[tercile - 1].length === 334);

        }
        
        const parallaxSize = 2 * z;
        
        const star: Star = {

            x: oldStar ? this.xStart : Math.random() * this.xStart,
            y: Math.random() * this.height,
            size: Math.random() * SIZE_RANGE + MIN_SIZE,
            speed: SPEED / parallaxSize,
            tercile: tercile

        };

        const distributionTercile: Star[] = depthDistribution[star.tercile - 1];

        if(oldStar) {

            distributionTercile[distributionTercile.indexOf(oldStar)] = star;

        } else {

            distributionTercile.push(star);

        }

    }

    redrawStars(): void {

        const stars = this.stars;

        for (var i = 0; i < STAR_COUNT; i++) {
			
            const star = stars[i];
            
            star.x -= star.speed;
            
            if (star.x < -star.size) this.pushNewStar(star);
            
        }

    }

    getTercile(n: number): Tercile {

        const factor = DEPTH_RANGE / 3;
        return Math.ceil(n / factor) as Tercile; // TODO better way?

    }

}

class Scape extends React.Component {

    private static readonly CANVAS_ID = "scape";
	
	componentDidMount() {
		
        const canvas = document.getElementById(Scape.CANVAS_ID) as HTMLCanvasElement;

        if (!canvas) {
            console.error("Could not locate the scape canvas elementduring the Scape component's mount phase.");
            return;
        }

        const maybeCtx: CanvasRenderingContext2D | null = canvas.getContext("2d");
        
        if (!maybeCtx) {
            console.error("Could not retreive 2D context from canvas element.");
            return;
        }

        const ctx = maybeCtx;


		ctx.imageSmoothingEnabled = false;
		ctx.shadowBlur = 0;
		
		const W = canvas.width = canvas.clientWidth;
		const H = canvas.height = canvas.clientHeight;
		
		const stars = new Stars(W, H);
	
		for(let i = 0; i < STAR_COUNT; i++) stars.pushNewStar();
		
		function drawScape()
		{
		
			ctx.clearRect(0, 0, W, H);
			ctx.fillStyle = "white";
            ctx.beginPath();
			stars.stars.forEach((star) => {
			
				ctx.moveTo(star.x, star.y);
				ctx.rect(star.x, star.y, star.size, star.size);
			 
			});
            ctx.fill();
            
			stars.redrawStars();
		
		}
		
		setInterval(drawScape, 10);
			
	}
	
	render() {
		
		return <canvas id="scape"></canvas>
		
	}
	
}

export default Scape;