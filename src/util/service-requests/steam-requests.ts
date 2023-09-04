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
    730: "CS:GO"
};

export class SteamApp {

    get name(): string {

        return this.app.name;

    }

    get shortName(): string {

        return shortNames[this.appId] || this.name;

    }

    get appId(): number {

        return this.app.appid;

    }

    get time(): TimeStruct {

        return new TimeStruct(this.app.playtime_forever);

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

function pluralizeIfNeeded(n: number, string: string): string {

    return string + (n !== 1 && "s");

}