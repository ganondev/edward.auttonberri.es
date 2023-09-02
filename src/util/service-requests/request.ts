import request from 'request';

export const API_URL: string = 'https://api.auttonberri.es';
export const PAGE_URL: string = '';

export function get<T>(url: string, callback: (result: T) => void): void {

    request(url, { json: true }, (err, res, body) => {

        if (err) console.error(`Error in request to endpoint ${url}:`, err);
        else callback(body);

    });

}