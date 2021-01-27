// Modules
import React, { useState, useEffect } from 'react';

// Contexts

// Components

// Styles
import * as styles from './styles/HomeStyles';
import { useParams } from 'react-router-dom';

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

  const [data, setData] = useState<Data[]>([]);

  const getData = async () => {
    const resp = await fetch(`https://vm.mxbi.net:7355/user/${playerID}`);
    const json = await resp.json();
    
    setData(json);
  }

  useEffect(() => {
    // Get data on page load
    getData();
  }, []);

  return <>
    <styles.PageWrapper>
      <h1>CUDGS CS:GO Leaderboard</h1>
      <p>{playerID}</p>

      <p>cool graphs and stats will go here</p>

    </styles.PageWrapper>
  </>
}
export default Player;
