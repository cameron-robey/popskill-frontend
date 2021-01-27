// Modules
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Contexts
import { useData } from '../contexts/DataContext';

// Components

// Styles
import * as styles from './styles/HomeStyles';

interface Data {
  username: string,
  SR: number,
  SRvar: number,
  matches_played: number,
  user_id: string
}

interface Params {
  playerID: string
}

const Player = () => {
  const { playerID } = useParams<Params>();
  const { data, getData } = useData();
  
  const [displayData, setDisplayData] = useState<Data|undefined>({} as Data);

  useEffect(() => {
    // Get data on page load
    getData();
  }, []);

  useEffect(() => {
    const player = data.find((i:Data) => i.user_id === playerID);
    console.log(player);
    setDisplayData(player);
  }, [data]);

  return <>
    <styles.PageWrapper>
      <h1>CUDGS CS:GO Leaderboard</h1>
      <p>{displayData ? displayData.username : "Player not found"}</p>

      <p>cool graphs and stats will go here</p>

    </styles.PageWrapper>
  </>
}
export default Player;
