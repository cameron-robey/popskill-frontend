declare module 'num-words';

type valueof<T> = T[keyof T]

interface LeaderboardItem {
  SR: number,
  SRvar: number,
  adr: number,
  hltv: number,
  last_diff: number,
  matches_played: number,
  rwp: number,
  mwp: number,
  user_id: string,
  username: string
}

interface User {
  seasons: {
    [key: string]: Match[]
  },
  user_skill_history: {
    [key: string]: {
      match_id: string,
      date: string,
      SR: number
    }[],
  },
  user_id: number,
  username: string
}

interface UserOld {
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
  hltv: number,
  adr: number
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
 map: string
 map_image: string
}

interface APIMatch extends Omit<Match, "team1table"|"team2table"> {
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
