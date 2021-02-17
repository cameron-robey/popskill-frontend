type User = {
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
  "Unnamed: 4": number,
  ADR: number,
  HLTV: number,
  HS: number,
  CK: number,
  BP: number,
  BD: number,
  player_link: string,
  id: string
}

type Match = {
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
 map_image: string
}