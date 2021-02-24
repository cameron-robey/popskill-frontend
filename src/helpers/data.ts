// Config
import { config } from './../config';

export const rankedFilter = (player: User) => {
  return player.matches_played >= config.ranking_conditions.matches
    && (
      Date.now() - new Date(
        player.user_skill_history.map(i => i.date)
          .sort()
          .reverse()[0])
          .getTime()
      ) / 86400000 
    <= config.ranking_conditions.days;
}

export const unrankedFilter = (player: User) => {
  return !rankedFilter(player);
}