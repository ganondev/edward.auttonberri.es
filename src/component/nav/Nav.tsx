import React from 'react';
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

export class Footer extends React.Component<{}, FooterState> {

    private static readonly LOADING_STATE: FooterState = { result: { quote: "..." } };

    state = Footer.LOADING_STATE;

    get formedQuote(): string {

        const quoteObject: Quote = this.state.result;
        return quoteObject.quote + (quoteObject.author ? " -" + quoteObject.author : "");

    }

    componentDidMount() {

        getQuote((body: Quote) => {

            this.setState({ result: body });

        });

    }

    render() {

        // TODO neon flicker transition
        return (
            <footer id="footBanner">
                <p>{this.formedQuote}</p>
            </footer>
        );

    }

}