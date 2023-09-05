import React, {FC, useEffect, useRef} from 'react';
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
    color: string;

}

function of256(range: number) {
    return Math.floor(Math.random() * range) + 256 - range;
}

function randomColor() {
    // return range[Math.floor(Math.random()*range.length)];
    const omit = Math.floor(Math.random() * 3);
    const strongRed = Math.random() > 0.9;
    const strongBlue = Math.random() > 0.9;
    const r = omit == 0 ? 256 : of256(strongRed ? 128 : 64);
    const b = omit == 1 ? 256 : of256(strongBlue ? 128 : 64);
    const g = omit == 2 ? 256 : Math.min(of256(32), r-5, b-5);

    return `rgb(${r}, ${g}, ${b})`;
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
            color: randomColor(),
            speed: SPEED / parallaxSize,
            tercile: tercile,

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

const ScapeNew: FC = () => {

    const canvRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {

        const canvas = canvRef.current;

        if (!canvas) {
            console.error("Could not locate the scape canvas elementduring the Scape component's mount phase.");
            return;
        }

        const ctx = canvas.getContext("2d");

        if (!ctx) {
            console.error("Could not retreive 2D context from canvas element.");
            return;
        }

        ctx.imageSmoothingEnabled = false;
        ctx.shadowBlur = 0;

        const W = canvas.width = canvas.clientWidth;
        const H = canvas.height = canvas.clientHeight;

        const stars = new Stars(W, H);

        for(let i = 0; i < STAR_COUNT; i++) stars.pushNewStar();

        function drawScape()
        {

            ctx!.clearRect(0, 0, W, H);
            stars.stars.forEach((star) => {

                ctx!.fillStyle = star.color;
                ctx!.fillRect(star.x, star.y, star.size, star.size);

            });

            stars.redrawStars();

        }

        setInterval(drawScape, 10);

    }, []);

    return <canvas id="scape" ref={canvRef}/>;

}

export default ScapeNew;