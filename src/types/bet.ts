export interface BetEvent {
  id: string;
  sport_key: string;
  sport_title: string;
  commence_time: Date;
  home_team: string;
  away_team: string;
  bookmakers: Bookmaker[];
  selectedOutcome?: Outcome;
}

export interface Bookmaker {
  key: string;
  title: string;
  last_update: Date;
  markets: Market[];
}

export interface Market {
  key: string;
  last_update: Date;
  outcomes: Outcome[];
}

export interface Outcome {
  name: string;
  price: number;
}