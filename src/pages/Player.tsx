// Modules
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Contexts
import { useData } from '../contexts/DataContext';

// Components
import PlayerByGame from './../components/graphs/PlayerByGame';

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

      <PlayerByGame data={{
        id: displayData.username,
        color: "hsl(337, 70%, 50%)",
        data: displayData.user_skill_history.map((game, index) => {
          return {
            x: index,
            y: game
          }
        })
      }} />

    </styles.PageWrapper>
  </>
}
export default Player;
