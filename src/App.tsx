import React from "react";
import "./App.css";
import Deck from "./Deck";
import data from "./data/data.json";
import logo from "./logo.png";
import twitterLogo from "./twitter-square-color-icon.svg";
import linkedinLogo from "./linkedin-square-color-icon.svg";
import discordLogo from "./discord-icon.svg";
import instaLogo from "./ig-instagram-icon.svg";
import { type MoxfieldDeck } from "./deck-types";

function App() {
  const decks = data.decks;
  return (
    <div className="App" id="top">
      <header>
        <img src={logo} alt="decktree" />
      </header>
      <nav>
        <ul>
          <li>
            <a href="#deck-lists">Deck Lists</a>
          </li>
        </ul>
      </nav>
      <section id="deck-lists">
        <h2> Deck lists</h2>
        <div className="deck-grid">
          {decks.map((deck: MoxfieldDeck) => (
            <Deck key={`deck-${deck.id}`} deck={deck} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
