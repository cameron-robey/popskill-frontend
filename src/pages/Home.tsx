// Modules
import React, { useState, useEffect } from 'react';
// Contexts

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

const Home = () => {

  const [data, setData] = useState<Data[]>([]);

  const getData = async () => {
    const resp = await fetch('https://vm.mxbi.net:7355/rankings');
    const json = await resp.json();
    
    const filtered = json.filter((i: Data)=>i.matches_played > 2);
    
    const sorted = filtered.sort((a: Data,b: Data) => b.SR - a.SR )

    setData(sorted);
  }

  useEffect(() => {
    // Get data on page load
    getData();
  }, []);

  return <>
    <styles.PageWrapper>
      <styles.Leaderboard striped bordered hover>
        <thead className="thead-dark">
          <tr>
            <td>Name</td>
            <td>ELO</td>
            <td>Matches Played</td>
          </tr>
        </thead>
        <tbody>
          {data.map(player => <tr>
            <td><a href={`https://popflash.site/user/${player.user_id}`}>{player.username}</a></td>
            <td>{player.SR}</td>
            <td>{player.matches_played}</td>
          </tr>)}
        </tbody>
      </styles.Leaderboard>
    </styles.PageWrapper>
  </>
}
export default Home;
