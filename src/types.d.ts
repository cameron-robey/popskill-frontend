type Data = {
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
