import React, {FC, useEffect, useMemo, useState} from 'react';
import { getQuote, Quote } from '../../util/service-requests/quote-requests';
import { Link } from 'react-router-dom';
import './Nav.css';
import {glowString, theme} from "../../util/cssbuild";

export function Header() {

    return (
        <header>
            <div>
                <div style={{
                    padding: "5px 15px"
                }}>
                    <Link
                        to="/"
                        id="banner"
                        style={{
                            fontSize: "30px",
                        }}
                    >Edward Auttonberry</Link>
                </div>
            </div>
        </header>
    );

}

type FooterState = { result: Quote };

export const Footer: FC = () => {

    const [quote, setQuote] = useState<FooterState>(
        {
            result: {
                quote: "..."
            }
        });

    const formedQuote = useMemo(() => {
        const quoteObject: Quote = quote.result;
        return quoteObject.quote + (quoteObject.author ? " -" + quoteObject.author : "");
    }, [quote]);

    useEffect(() => {
        getQuote((body: Quote) => {

            setQuote({ result: body });

        });
    }, []);

    return (
        <footer id="footBanner">
            <p>{formedQuote}</p>
        </footer>
    )
}