// Modules
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// Contexts
import { useData } from '../contexts/DataContext';

// Components
import PlayerByGame from './../components/graphs/PlayerByGame';
import PlayersByDate from './../components/graphs/PlayersByDate';

// Styles
import * as styles from './styles/HomeStyles';

interface Params {
  playerID: string
}

interface UserParsedStats {
  played: number,
  won: number,
  tie: number,
  loss: number,
  averages: {
    kill: number,
    assist: number,
    death: number,
    adr: number,
    hltv: number
  },
  maps: {
    dust2: number,
    inferno: number,
    mirage: number,
    nuke: number,
    overpass: number,
    train: number,
    vertigo: number
  }
}

const Player = () => {
  const { playerID } = useParams<Params>();
  const { rankings, getRankings } = useData();
  const { matches, getMatches } = useData();
  
  const [displayData, setDisplayData] = useState<User>({} as User);
  const [displayMatches, setDisplayMatches] = useState<Match[]>([]);

  const [filteredData, setFilteredData] = useState<User[]>([]);

  const [stats, setStats] = useState({} as UserParsedStats);

  useEffect(() => {
    // Get data on page load
    getRankings();
    getMatches();
  }, []);

  useEffect(() => {
    updateUser();
  }, [rankings]);

  useEffect(() => {
    setDisplayMatches(matches);
    updateUser();
  }, [matches]);

  useEffect(() => {
    // When id changes
    updateUser();
  }, [playerID]);

  const updateUser = () => {
    const filtered = rankings.filter((i: User)=>i.matches_played > 2);
    const sorted = filtered.sort((a: User,b: User) => b.SR - a.SR );

    setFilteredData(sorted);

    const player = sorted.filter((i: User) => i.user_id === playerID);
    if (player.length > 0) {
      const p = player[0];
      setDisplayData(p);

      const matchesPlayedIn = matches.filter((i) => p.user_skill_history.map(i=>i.match_id).includes(i.match_id));
      const matchesWonArr = [];
      const matchesLostArr = [];
      const matchesTiedArr = [];
      let ktotal = 0;
      let atotal = 0;
      let dtotal = 0;
      let hltvtotal = 0;
      let adrtotal = 0;
      const maps = {
        dust2: 0,
        inferno: 0,
        mirage: 0,
        nuke: 0,
        overpass: 0,
        train: 0,
        vertigo: 0
      }
      
      matchesPlayedIn.forEach(i=>{
        // Find whether in team 1 or 2
        let team: 1|2 = 2;
        if (Object.keys(i.team1table).includes(p.user_id)) team = 1;
        let teamkey: "team1table"|"team2table";
        teamkey = (team === 1) ? "team1table" : "team2table";

        // Win vs lose
        if ((team === 1 && i.team1score > i.team2score) || 
        (team === 2 && i.team2score > i.team1score)) matchesWonArr.push(i);
        else if (i.team1score === i.team2score) matchesTiedArr.push(i);
        else matchesLostArr.push(i);

        // Averages
        ktotal += i[teamkey][p.user_id].K;
        atotal += i[teamkey][p.user_id].A;
        dtotal += i[teamkey][p.user_id].D;
        hltvtotal += i[teamkey][p.user_id].HLTV;
        adrtotal += i[teamkey][p.user_id].ADR;

        // Maps
        if (i.map !== undefined) maps[i.map] = maps[i.map] + 1;
      });

      const newStats: UserParsedStats = {
        played: matchesPlayedIn.length,
        won: matchesWonArr.length,
        tie: matchesTiedArr.length,
        loss: matchesLostArr.length,
        averages: {
          kill: ktotal / matchesPlayedIn.length,
          assist: atotal / matchesPlayedIn.length,
          death: dtotal / matchesPlayedIn.length,
          adr: adrtotal / matchesPlayedIn.length,
          hltv: hltvtotal / matchesPlayedIn.length
        },
        maps: maps
      }

      setStats(newStats);
      console.log(newStats);
    }
  }


  if (Object.keys(displayData).length === 0 || matches.length === 0) {
    // Loading
    return <>
      <styles.PageWrapper>
        <h1>
          <Link to={'/'}>
            <styles.VerticalAlignWrapper>
              <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="currentColor" d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z" />
              </svg>
              <span>CUDGS CS:GO Leaderboard</span>
            </styles.VerticalAlignWrapper>
          </Link>
        </h1>
      </styles.PageWrapper>
    </>
  }

  return <>
    <styles.PageWrapper>
      <h1>
        <Link to={'/'}>
          <styles.VerticalAlignWrapper>
            <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor" d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z" />
            </svg>
            <span>CUDGS CS:GO Leaderboard</span>
          </styles.VerticalAlignWrapper>
        </Link>
      </h1>
      <h4>Player data for: <b>{ displayData.username }</b></h4>
      <p>Current rating: <b>{ displayData.SR }</b> | Current rank: <b>{ filteredData.indexOf(displayData) + 1 }</b></p>

      <hr />

      <styles.Row>
        <p><b>Player stats (average per game)</b></p>

        <styles.InlineWrapper>
          <styles.StatsTable bordered>
            <thead className="thead-dark">
              <tr>
                <td>Kills</td>
                <td>Deaths</td>
                <td>Assists</td>
                <td>HLTV Rating</td>
                <td>ADR</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{stats.averages?.kill.toFixed(2)}</td>
                <td>{stats.averages?.death.toFixed(2)}</td>
                <td>{stats.averages?.assist.toFixed(2)}</td>
                <td>{stats.averages?.hltv.toFixed(2)}</td>
                <td>{stats.averages?.adr.toFixed(2)}</td>
              </tr>
            </tbody>
          </styles.StatsTable>
        </styles.InlineWrapper>

      </styles.Row>
      
      <styles.Row>
        <styles.InlineWrapper>
          <p><b>Map stats</b></p>

          <styles.StatsTable bordered>
            <thead className="thead-dark">
              <tr>
                <td>Won</td>
                <td>Tied</td>
                <td>Lost</td>
                </tr>
            </thead>
            <tbody>
              <tr>
                <td>{stats.won}</td>
                <td>{stats.tie}</td>
                <td>{stats.loss}</td>
              </tr>
            </tbody>
          </styles.StatsTable>
        </styles.InlineWrapper>

        <styles.InlineBreak />
        
        <styles.InlineWrapper>
          <p><b>Matches played by map</b></p>

          <styles.StatsTable bordered>
            <thead className="thead-dark">
              <tr>
                <td>Dust 2</td>
                <td>Inferno</td>
                <td>Mirage</td>
                <td>Nuke</td>
                <td>Overpass</td>
                <td>Train</td>
                <td>Vertigo</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{stats.maps.dust2}</td>
                <td>{stats.maps.inferno}</td>
                <td>{stats.maps.mirage}</td>
                <td>{stats.maps.nuke}</td>
                <td>{stats.maps.overpass}</td>
                <td>{stats.maps.train}</td>
                <td>{stats.maps.vertigo}</td>
              </tr>
            </tbody>
          </styles.StatsTable>
        </styles.InlineWrapper>
      </styles.Row>

      <p><b>Rating by game</b></p>

      <PlayerByGame data={{
        id: displayData.username,
        color: "hsl(337, 70%, 50%)",
        data: displayData.user_skill_history.map((game, index) => {

          return {
            x: index,
            y: game.SR,
            matchID: game.match_id,
            matchDetails: displayMatches.find(i=>i.match_id === game.match_id),
            userID: displayData.user_id
          }
        })
      }} />

      <p><b>Rating by date</b></p>

      <PlayersByDate data={[{
        id: displayData.username,
        data: displayData.user_skill_history.slice(1).map((game, index) => {
          return {
            x: game.date.substr(0,10),
            y: game.SR,
          }
        }).filter((g,i,s)=>{
          if (i + 1 === s.length) return true;
          if (g.x === s[i+1].x) return false;
          return true;
        })
      }]} />

    </styles.PageWrapper>
  </>
}
export default Player;
