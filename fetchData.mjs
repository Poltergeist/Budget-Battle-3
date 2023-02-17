import data from "./data.json" assert { type: "json" };
import fetch from "node-fetch";
import fs from "fs";
import { RateLimit } from "async-sema";

const limit = RateLimit(10);
let cards = [];
fs.writeFileSync(
  "./src/data/data.json",
  JSON.stringify(
    {
      decks: (
        await Promise.all(
          data.decks.map(
            async (x) =>
              await fetch(`https://api2.moxfield.com/v2/decks/all/${x.id}`)
                .then((result) => result.json())
                .then((result) => {
                  cards = [...cards, ...Object.keys(result.mainboard),...Object.keys(result.commanders), ...Object.keys(result.companions) ];

                  return result;
                })
                .then(async (result) => ({
                  id: result.id,
                  creator: x.creator,
                  name: result.name,
                  description: result.description,
                  publicUrl: result.publicUrl,
                  commanders: await Promise.all(
                    Object.values(result.commanders).map(async (commander) => {
                      await limit();
                      return {
                        scryfall_id: commander.card.scryfall_id,
                        art_crop: await fetch(
                          `https://api.scryfall.com/cards/${commander.card.scryfall_id}`
                        )
                          .then((result) => result.json())
                          .then((json) => {
                            if (json.image_uris == null) {
                              return json.card_faces[0].image_uris.art_crop;
                            }
                            return json.image_uris.art_crop;
                          }),
                        artist: commander.card.artist,
                      };
                    })
                  ),
                  companions: await Promise.all(
                    Object.values(result.companions).map(async (companion) => {
                      await limit();
                      return {
                        scryfall_id: companion.card.scryfall_id,
                        art_crop: await fetch(
                          `https://api.scryfall.com/cards/${companion.card.scryfall_id}`
                        )
                          .then((result) => result.json())
                          .then((json) => {
                            if (json.image_uris == null) {
                              return json.card_faces[0].image_uris.art_crop;
                            }
                            return json.image_uris.art_crop;
                          }),
                        artist: companion.card.artist,
                      };
                    })
                  ),
                }))
                .catch((e) => console.log(e, x, "not found"))
          )
        )
      ).filter((x) => x != null),
    },
    null,
    2
  )
);
fs.writeFileSync(
  "./src/data/card-data.json",
  JSON.stringify(
    Object.entries(
      cards.reduce((acc, cur) => {
        if ("Plains Island Swamp Mountain Forest".split(" ").includes(cur)) {
          return acc;
        }
        if (acc[cur] == null) {
          acc[cur] = 0;
        }
        acc[cur]++;
        return acc;
      }, {})
    )
      .sort((x, y) => (x[1] > y[1] ? -1 : x[1] === y[1] ? 0 : 1))
      .map((x) => ({ name: x[0], amount: x[1] })),
    null,
    2
  )
);
