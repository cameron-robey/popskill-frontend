// Config
import { config } from './../config';

export const rankedFilter = (player: LeaderboardItem) => {
  return player.matches_played >= config.ranking_conditions.matches;

  // Code for testing if user has played within last x days, will implement
  // later in the season 

    // && (
    //   Date.now() - new Date(
    //     player.user_skill_history.map(i => i.date)
    //       .sort()
    //       .reverse()[0])
    //       .getTime()
    //   ) / 86400000 
    // <= config.ranking_conditions.days;
}

export const unrankedFilter = (player: LeaderboardItem) => {
  return !rankedFilter(player);
}