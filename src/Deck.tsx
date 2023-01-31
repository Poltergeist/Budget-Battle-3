import React, {useRef} from "react";
import "./Deck.css";
import { type MoxfieldDeck } from "./deck-types";

function Deck({ deck }: { deck: MoxfieldDeck }) {
  const commanders = deck.commanders;
  const companions = deck.companions;
  const link = useRef<HTMLAnchorElement>(null);
  const stopBubble = (e: React.MouseEvent<HTMLElement>) => e.stopPropagation();
  const clickHandler = (e: React.MouseEvent<HTMLElement>) => link.current !== null ? link.current.click() : null

  return (
    <div className="deck" onClick={clickHandler}>
      <header className="deck-header">
        <section
          className={`deck-logo commander${commanders.length}-companion${companions.length}`}
        >
          {commanders.map((commander) => (
            <section>
              <div
                className="image"
                style={{ backgroundImage: `url(${commander.art_crop})` }}
              ></div>
              <p className="artist-attribution">{commander.artist}</p>
            </section>
          ))}
          {companions.map((companion) => (
            <section>
              <div
                className="image"
                style={{ backgroundImage: `url(${companion.art_crop})` }}
              ></div>
              <p className="artist-attribution">{companion.artist}</p>
            </section>
          ))}
        </section>
        <h3>{deck.name}</h3>
        <h4>by {deck.creator}</h4>
        <p>{deck.description}</p>
        <p><a ref={link} href={deck.publicUrl} target="_blank"  rel="noreferrer" onClick={stopBubble}>Visit Decklist</a></p>
      </header>
    </div>
  );
}

export default Deck;
