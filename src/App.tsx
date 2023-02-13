import React from "react";
import "./App.css";
import Deck from "./Deck";
import CardAnalysis from "./CardAnalysis";
import data from "./data/data.json";
import cardData from "./data/card-data.json";
import logo from "./logo.png";
// import twitterLogo from "./twitter-square-color-icon.svg";
// import linkedinLogo from "./linkedin-square-color-icon.svg";
// import discordLogo from "./discord-icon.svg";
// import instaLogo from "./ig-instagram-icon.svg";
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
          <li>
            <a href="#card-analysis">Card Analysis</a>
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
      <section id="card-analysis">
        <h2>Card Analysis</h2>
        <p>
          {cardData.length} Cards have been used in {decks.length} Decks.
        </p>
        <h3>Card in Decks</h3>
        <CardAnalysis data={cardData} />
      </section>
    </div>
  );
}

export default App;
