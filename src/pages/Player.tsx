// Modules
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// Contexts
import { useData } from '../contexts/DataContext';

// Components
import PageTitle from '../components/helpers/PageInfo';
import PlayerByGame from './../components/graphs/PlayerByGame';
import PlayersByDate from './../components/graphs/PlayersByDate';

// Styles
import * as styles from './styles/HomeStyles';

// Helpers
import { rankedFilter } from './../helpers/data';
import { config } from '../config';

interface Params {
  playerID: string
}

interface UserParsedStats {
  rank: number|string,
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
    de_dust2: number,
    de_inferno: number,
    de_mirage: number,
    de_nuke: number,
    de_overpass: number,
    de_train: number,
    de_vertigo: number
  }
}

const Player = () => {
  const { playerID } = useParams<Params>();
  const { users, getUser } = useData();
  const { leaderboard, getLeaderboard } = useData();
  
  const [user, setUser] = useState<User>({} as User);
  const [leaderboardUser, setLeaderboardUser] = useState<LeaderboardItem>({} as LeaderboardItem);

  const [displayMatches, setDisplayMatches] = useState<Match[]>([]);

  const [filteredData, setFilteredData] = useState<User[]>([]);

  const [stats, setStats] = useState({} as UserParsedStats);

  useEffect(() => {
    // Get data on page load
    getUser(Number(playerID));
    getLeaderboard();
  }, []);

  useEffect(() => {
    updateUser();
  }, [leaderboard]);

  useEffect(() => {
    // check if data exists for user
    if (users.filter(i=>i.user_id === Number(playerID)).length > 0) {
      setUser(users.filter(i=>i.user_id === Number(playerID))[0]);
    }

    updateUser();
  }, [users]);

  useEffect(() => {
    // When id changes, clear data
    updateUser();
  }, [playerID]);


  useEffect(() => {
    updateUser();
  }, [user]);

  const updateUser = () => {
    // check we have data for both the leaderboard and the user
    if (Object.keys(user).length === 0 && user.user_id !== Number(playerID)) return;
    
    let rank: string|number = "?";

    if (leaderboard.length > 0) {
      const currentUser = leaderboard.find(i=> Number(i.user_id) === user.user_id);
      if (currentUser) setLeaderboardUser(currentUser);
      const sorted = leaderboard.sort((a: LeaderboardItem, b: LeaderboardItem) => b.SR - a.SR );
      rank = sorted.indexOf(sorted.filter(i=>i.user_id === playerID)[0]) + 1;
    }


    const id = String(user.user_id);



    let matchesPlayedIn: Match[] = [];


    Object.keys(user.seasons).forEach(i=> matchesPlayedIn = matchesPlayedIn.concat(user.seasons[i]));
    const matchesWonArr = [];
    const matchesLostArr = [];
    const matchesTiedArr = [];
    let ktotal = 0;
    let atotal = 0;
    let dtotal = 0;
    let hltvtotal = 0;
    let adrtotal = 0;
    let maps = {
      de_dust2: 0,
      de_inferno: 0,
      de_mirage: 0,
      de_nuke: 0,
      de_overpass: 0,
      de_train: 0,
      de_vertigo: 0
    }
    
    matchesPlayedIn.forEach(i=>{
      // Find whether in team 1 or 2
      let team: 1|2 = 2;
      if (Object.keys(i.team1table).includes(id)) team = 1;
      let teamkey: "team1table"|"team2table";
      teamkey = (team === 1) ? "team1table" : "team2table";

      // Win vs lose
      if ((team === 1 && i.team1score > i.team2score) || 
      (team === 2 && i.team2score > i.team1score)) matchesWonArr.push(i);
      else if (i.team1score === i.team2score) matchesTiedArr.push(i);
      else matchesLostArr.push(i);

      // Averages
      ktotal += i[teamkey][id].K;
      atotal += i[teamkey][id].A;
      dtotal += i[teamkey][id].D;
      hltvtotal += i[teamkey][id].HLTV;
      adrtotal += i[teamkey][id].ADR;

      // Maps
      if (i.map !== undefined && Object.keys(maps).includes(i.map)) {
        maps[i.map as keyof typeof maps] = maps[i.map as keyof typeof maps] + 1;
      }

    });

    const newStats: UserParsedStats = {
      rank: rank,
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
    
    setDisplayMatches(user.seasons[Object.keys(user.seasons).slice(-1)[0]]);
  }

  if (user.user_id === undefined || stats.averages === undefined) {
    // Loading
    return <>
      <styles.PageWrapper>
        <h1>
          <Link to={'/'}>
            <styles.VerticalAlignWrapper>
              <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="currentColor" d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z" />
              </svg>
              <span>{config.name}</span>
            </styles.VerticalAlignWrapper>
          </Link>
        </h1>
      </styles.PageWrapper>
    </>
  }

  return <>
    <PageTitle 
      title={user.username}
      metaDescription={`Statistics for ${user.username}. Current rank: ${stats.rank}. Average HLTV rating: ${stats.averages.hltv}. View page for more detailed statistics...`}
      metaTitle={user.username}
      metaSiteName={config.name}
    />

    <styles.PageWrapper>
      <h1>
        <Link to={'/'}>
          <styles.VerticalAlignWrapper>
            <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor" d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z" />
            </svg>
            <span>{config.name}</span>
          </styles.VerticalAlignWrapper>
        </Link>
      </h1>
      <h4>Player data for: <b>{ user.username }</b></h4>
      <p>Current rating: <b>{ leaderboardUser.SR }</b> | Current rank: <b>{ stats.rank }</b></p>

      <hr />

      <styles.Row>
        <p><b>Player stats (average per game)</b></p>

        <styles.InlineWrapper>
          <styles.StatsTable>
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
      
      <br />

      <styles.Row>
        <styles.InlineWrapper>
          <p><b>Map stats</b></p>

          <styles.StatsTable>
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

          {/* TODO: make this part automatic with maps (so new maps can be added) */}

          <styles.StatsTable>
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
                <td>{stats.maps.de_dust2}</td>
                <td>{stats.maps.de_inferno}</td>
                <td>{stats.maps.de_mirage}</td>
                <td>{stats.maps.de_nuke}</td>
                <td>{stats.maps.de_overpass}</td>
                <td>{stats.maps.de_train}</td>
                <td>{stats.maps.de_vertigo}</td>
              </tr>
            </tbody>
          </styles.StatsTable>
        </styles.InlineWrapper>
      </styles.Row>

      <br />

      <p><b>Rating by game</b></p>

      <PlayerByGame data={{
        id: user.username,
        color: "hsl(337, 70%, 50%)",
        data: user.user_skill_history[Object.keys(user.user_skill_history).slice(-1)[0]].map((game, index) => {

          return {
            x: index,
            y: game.SR,
            matchID: game.match_id,
            matchDetails: displayMatches.find(i=>i.match_id === game.match_id),
            userID: String(user.user_id)
          }
        })
      }} />

      <p><b>Rating by date</b></p>

      <PlayersByDate data={[{
        id: user.username,
        data: user.user_skill_history[Object.keys(user.user_skill_history).slice(-1)[0]].slice(1).map((game, index) => {
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
