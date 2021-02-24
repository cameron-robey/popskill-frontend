declare module 'num-words';

type valueof<T> = T[keyof T]

interface User {
  username: string,
  SR: number,
  SRvar: number,
  matches_played: number,
  user_id: string,
  user_skill_history: {
    match_id: string,
    date: string,
    SR: number
  }[],
  last_diff: number,
  rwp: number,
  hltv: number
}

interface UserStats {
  Name: string,
  K: number,
  A: number,
  D: number,
  'Unnamed: 4': number,
  ADR: number,
  HLTV: number,
  HS: number,
  CK: number,
  BP: number,
  BD: number,
  player_link: string,
  id: string
}

interface Match {
 team1score: number,
 team2score: number,
 team1table: {
  [key: string]: UserStats
 },
 team2table: {
  [key: string]: UserStats
 },
 date: string,
 match_id: string,
 map: "dust2" | "inferno" | "mirage" | "nuke" | "overpass" | "train" | "vertigo" | undefined
 map_image: string
}

interface APIMatch extends Omit<Match, "map"|"team1table"|"team2table"> {
  team1table: {
    [key: string]: APIUserStats
  },
  team2table: {
    [key: string]: APIUserStats
  },
}

interface APIUserStats extends Omit<UserStats,"FA"> {
  "Unnamed: 4": number
}
