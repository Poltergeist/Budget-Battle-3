export interface MoxfieldDeck {
  id: string;
  name: string;
  creator: string;
  description: string;
  publicUrl: string;
  commanders: Card[];
  companions: Card[];
}

export interface Card {
  scryfall_id: string;
  artist: string;
  art_crop: string;
}
