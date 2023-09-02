import request from 'request';
// import { get } from './request';
import axios from "axios";

const steamApiUrl = 'https://api.auttonberri.es/steam/hours'

export function getSteamApps(callback: (result: SteamApp[] | 404) => void, ...filter: number[]): void {

    const url = 'https://api.auttonberri.es/steam/hours';

    // request(url, {json: true}, (err, res, body) => {
    //
    //     if (err) console.log(err);
    //     else {
    //
    //         const apps: AppInfo[] = body.response.games;
    //         console.log("Got steam hours:", apps);
    //         if (!apps) {
    //             console.log("Steam API get failed.");
    //             callback(404);
    //             return;
    //         }
    //         var filteredApps = (filter ? apps.filter((app: AppInfo) => filter.includes(app.appid)) : apps).map((app: AppInfo) => new SteamApp(app));
    //         console.log("Filtered apps:", filteredApps);
    //         callback(filteredApps);
    //
    //     }
    //
    // });

    axios.get(url)
        .catch(e => ({error: true, ...e}))
        .then(response => {
            if (response.error) console.log(response);
            else {
                const apps: AppInfo[] = response.data.response.games;
                console.log("Got steam hours:", apps);
                if (!apps) {
                    console.log("Steam API get failed.");
                    callback(404);
                    return;
                }
                var filteredApps = (filter ? apps.filter((app: AppInfo) => filter.includes(app.appid)) : apps).map((app: AppInfo) => new SteamApp(app));
                console.log("Filtered apps:", filteredApps);
                callback(filteredApps);
            }

        });

}

const shortNames: { [longName: string]: string } = {
    "Counter-Strike: Global Offensive": "CS:GO"
}

export interface AppInfo {

    name: string;
    appid: number;
    playtime_forever: number;

}

export class SteamApp {

    get name(): string {

        return this.app.name;

    }

    get shortName(): string {

        return shortNames[this.name] || this.name;

    }

    get appId(): number {

        return this.app.appid;

    }

    get time(): TimeStruct {

        return new TimeStruct(this.app.playtime_forever);

    }

    constructor(private app: AppInfo) {}

    //TODO make other requests to get this stuff

}

class TimeStruct {

    get hours(): string {

        var hours = Math.floor(this.minutes / 60);

        return hours + pluralizeIfNeeded(hours, " hr");

    }

    constructor(private minutes: number) { }

}

function pluralizeIfNeeded(n: number, string: string): string {

    return string + (n !== 1 && "s");

}