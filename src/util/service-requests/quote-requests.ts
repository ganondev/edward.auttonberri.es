import axios from "axios";

const failQuote: Quote = {
	quote: "Good quotes are hard to come by..."
};

export function getQuote(callback: (result: Quote) => void, id?: number) {

    const url: string = `https://api.auttonberri.es/getquote/${id === undefined ? "" : id}`;

    axios.get(url)
        .catch(() => ({
            data: failQuote
        }))
        .then(response => {
            callback(response.data);
        })

    // request(url, {json: true}, (err, res, body: any) => {
    //     if (err) {
    //         console.error("Quote retreival failed. Using fallback value...", err);
    //         callback(failQuote);
    //     }
    //     else callback(body);
    // });

}

export interface Quote {
    //TODO should id come back?
    quote: string;
    author?: string;
    context?: string;
}