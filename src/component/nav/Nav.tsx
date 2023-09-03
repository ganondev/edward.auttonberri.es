import React, {FC, useEffect, useMemo, useState} from 'react';
import { getQuote, Quote } from '../../util/service-requests/quote-requests';
import { Link } from 'react-router-dom';
import './Nav.css';

export function Header() {

    return (
        <header>
            <div>
                <div className="glow">
                    <Link to="." >Edward Auttonberry</Link>
                </div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">[Front]</Link>
                        </li>
                        <li>
                            <Link to="/portfolio">[Portfolio]</Link>
                        </li>
                        <li>
                            <Link to="/coolescheiBe">[S-Index]</Link>
                        </li>
                    </ul>
                </nav>
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