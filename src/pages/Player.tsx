// Modules
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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

const Player = () => {
  const { playerID } = useParams<Params>();
  const { data, getData } = useData();
  
  const [displayData, setDisplayData] = useState<Data>({} as Data);

  const [filteredData, setFilteredData] = useState<Data[]>([]);

  useEffect(() => {
    // Get data on page load
    getData();
  }, []);

  useEffect(() => {
    const filtered = data.filter((i: Data)=>i.matches_played > 2);
    const sorted = filtered.sort((a: Data,b: Data) => b.SR - a.SR );

    setFilteredData(sorted);
  }, [data]);

  useEffect(() => {
    const player = data.filter((i:Data) => i.user_id === playerID);
    if (player.length > 0) {
      setDisplayData(player[0]);
    }
  }, [data]);

  useEffect(() => {
    if (Object.keys(displayData).length > 0) {
      console.log([{
        id: displayData.username,
        data: displayData.user_skill_history.slice(1).map((game, index) => {
          return {
            x: game.date.substr(0,10),
            y: game.SR
          }
        }).filter((g,i,s)=>{
          if (i + 1 === s.length) return true;
          if (g.x === s[i+1].x) return false;
          return true;
        })
      },{
        id: data[15].username,
        data: data[15].user_skill_history.slice(1).map((game, index) => {
          return {
            x: game.date.substr(0,10),
            y: game.SR
          }
        }).filter((g,i,s)=>{
          if (i + 1 === s.length) return true;
          if (g.x === s[i+1].x) return false;
          return true;
        })
      }])
    }
  }, [displayData]);

  if (Object.keys(displayData).length === 0) {
    // Loading
    return <>
      <styles.PageWrapper>
        <h1>CUDGS CS:GO Leaderboard</h1>
      </styles.PageWrapper>
    </>
  }

  return <>
    <styles.PageWrapper>
      <h1>CUDGS CS:GO Leaderboard</h1>
      <h4>Player data for: <b>{ displayData.username }</b></h4>
      <p>Current rating: <b>{ displayData.SR }</b> | Current rank: <b>{ filteredData.indexOf(displayData) + 1 }</b></p>

      <hr />
      <p><b>Rating by game</b></p>

      <PlayerByGame data={{
        id: displayData.username,
        color: "hsl(337, 70%, 50%)",
        data: displayData.user_skill_history.map((game, index) => {
          return {
            x: index,
            y: game.SR
          }
        })
      }} />

      <p><b>Rating by date</b></p>

      <PlayersByDate data={[{
        id: displayData.username,
        data: displayData.user_skill_history.slice(1).map((game, index) => {
          return {
            x: game.date.substr(0,10),
            y: game.SR
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
