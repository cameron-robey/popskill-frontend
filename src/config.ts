export const config = {
  api_url: "https://vm.mxbi.net:7355",
  contributors: [
    "Mikel",
    "Cameron"
  ],
  ranking_conditions: {
    days: 14,
    matches: 10
  },
  rating_version: "2",
  trueskill_parameters: {
    mu: 1000,
    sigma: 166,
    beta: 166,
    tau: 3.32,
    hltv: 0.75,
    mode: "GAME"
  },
  "name": "CUDGS CS:GO Skill Ratings"
}