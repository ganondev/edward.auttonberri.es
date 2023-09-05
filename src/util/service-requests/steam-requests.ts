import axios, {AxiosResponse} from "axios";

const url = 'https://api.auttonberri.es/steam/hours';

interface SteamGame {
    appid: number;
    name: string;
    playtime_forever: number;
    img_icon_url: string;
    playtime_windows_forever: number;
    playtime_mac_forever: 0;
    playtime_linux_forever: number;
    rtime_last_played: number;
    content_descriptorids: number[];
    playtime_disconnected: number;
}

interface SteamHours {
    game_count: number;
    games: SteamGame[];
}

interface SteamHoursResponse {
    response: SteamHours;
}

type R<T> = AxiosResponse<T>;

export async function getSteamApps(): Promise<R<SteamHoursResponse>> {

    return axios.get(url);

}

const shortNames: {[id: number]: string} = {
    730: "CS:GO",
    440: "TF2",
};

export class SteamApp {

    get name(): string {

        return this.app.name;

    }

    get shortName(): string {

        return shortNames[this.appId] || (
            this.name.length > 12
                ? this.name.slice(0, 12) + "..."
                : this.name
        );

    }

    get appId(): number {

        return this.app.appid;

    }

    get time(): TimeStruct {

        return new TimeStruct(this.app.playtime_forever);

    }

    get rawTime() {
        return this.app.playtime_forever;
    }

    get lastPlayed() {
        return this.app.rtime_last_played;
    }

    get timeSincePlayed() {
        const date = new Date(0);
        date.setUTCSeconds(this.lastPlayed);
        const diff = Number(new Date()) - Number(date);
        const seconds = diff / 1000;
        if (seconds < 60) return "Just Now";
        const minutes = seconds / 60;
        if (minutes < 60) return timeStamp(minutes, "mi");
        const hours = minutes / 60;
        if (hours < 24) return timeStamp(hours, "hr");
        const days = hours / 24;
        if (days < 14) return timeStamp(days, "dy");
        const weeks = days / 7;
        if (weeks < 52) return timeStamp(weeks, "wk");
        const years = days / 365;
        return timeStamp(years, "yr");
    }

    constructor(private app: SteamGame) {}

    //TODO make other requests to get this stuff

}

class TimeStruct {

    get hours(): string {

        var hours = Math.floor(this.minutes / 60);

        return hours + pluralizeIfNeeded(hours, " hr");

    }

    constructor(private minutes: number) { }

}

function timeStamp(value: number, unit: string) {
    const floored = Math.floor(value);
    return `${floored} ${pluralizeIfNeeded(floored, unit)} ago`;
}

function pluralizeIfNeeded(n: number, string: string): string {

    return string + (n !== 1 ? "s" : "");

}