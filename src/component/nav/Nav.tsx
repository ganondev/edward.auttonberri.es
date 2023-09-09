import React, {FC, useEffect, useMemo, useState} from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

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

export const Footer: FC = () => {

    const [quote, setQuote] = useState<Quote>(
        {
            quote: "...",
        });

    const formedQuote = useMemo(() => {
        return quote.quote + (quote.author ? " -" + quote.author : "");
    }, [quote]);

    useEffect(() => {

        const range = quotes.length;
        setQuote(quotes[Math.floor(Math.random() * range)]);

    }, []);

    return (
        <footer id="footBanner">
            <p>{formedQuote}</p>
        </footer>
    )
}

export interface Quote {
    quote: string;
    author?: string;
    context?: string;
    source?: string;
}

const quotes: Quote[] = [
    {
        quote: "I wrote my own damn compiler. Did you make your own compiler?",
        author: "Terry A. Davis",
    },
    {
        quote: "If a man does not have the sauce, then he is lost. But the same man can be lost in the sauce.",
        author: "Gucci Mane",
    },
    {
        quote: "If you see Kay, tell her I say hey.",
        author: "Schäffer the Darklord",
    },
    {
        quote: "F███ you idiot American! I am your mother!",
        author: "A nameless Russian Dota player",
    },
    {
        quote: "It's time to chew ass and kick bubblegum... and I'm all out of ass.",
        author: "Dick Kickem",
    },
    {
        quote: "Life has many doors, Ed-boy!",
        source: "Ed, Edd n Eddy",
    },
    {
        quote: "What if the world was made of glazed doughnuts?",
        source: '"We Ran Out of CD Space" by Psychostick',
    },
    {
        quote: "Applications that leak like an alchoholic with a UTI!",
    },
    {
        quote: "Ай-ай-ай-ай-ай, что сейчас произошло!",
        author: "Russian Play-By-Play",
        source: "DotA 2, The International 4 Russian Play-By-Play",
    },
    {
        context: "I sing this to my wife with a ukelele sometimes.",
        quote: ".يا نونو, يا نونو, انا احبك. يا نونو, يا نونو, يا نونو, يا كيوت! يا نونو, يا حلو, انا احبك, يا نونو, يا نونو",
    },
    {
        quote: "... because that's the libertarian way!",
        author: "Jean Gourd",
    },
    {
        quote: "Your waifu a shit!",
        author: "Anon",
    },
    {
        quote: "Rei > Asuka",
    },
    {
        quote: "Headphone's on? Matt's gone.",
        author: "Matthew LaCroix",
        context: "He actually said this about a different Matthew (not himself) with whom we both worked at the time. This other Matthew was notorious for not being able to hear anything once his headphones slid on his ears.",
    },
    {
        quote: '"With Haskell, your only limit is your imagination!" "I\'m imagining mutable state."',
        author: "/g/ Anons",
        source: "/g/",
    },
    {
        quote: "Ecce homo, qui est faba!",
        source: "The intro to Mr. Bean",
    },
    {
        quote: "Pink is good for you",
        author: "My wife",
    }
]