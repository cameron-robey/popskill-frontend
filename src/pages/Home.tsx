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
  matches_played: number
}

const Home = () => {

  const [data, setData] = useState<Data[]>([]);

  const getData = async () => {
    const resp = await fetch('http://vm.mxbi.net:7355/rankings');
    const json = await resp.json();
    
    const filtered = json.filter((i: Data)=>i.matches_played > 2);
    
    const sorted = filtered.sort((a: Data,b: Data) => b.SR - a.SR )

    setData(sorted);
  }

  useEffect(() => {
    // Get data on page load
    getData();
    
    // setData([
    //   {
    //     username: "Player 1",
    //     SR: 987,
    //     SRvar: 100,
    //     matches_played: 5
    //   },
    //   {
    //     username: "Player 2",
    //     SR: 1003,
    //     SRvar: 100,
    //     matches_played: 6
    //   },
    //   {
    //     username: "Player 3",
    //     SR: 821,
    //     SRvar: 100,
    //     matches_played: 5
    //   },
    //   {
    //     username: "Player 4",
    //     SR: 1203,
    //     SRvar: 100,
    //     matches_played: 9
    //   },
    //   {
    //     username: "Player 1",
    //     SR: 1203,
    //     SRvar: 100,
    //     matches_played: 1
    //   },
    // ])
  }, []);

  return <>
    <styles.PageWrapper>
      <styles.Leaderboard>
        <thead>
          <tr>
            <td>Name</td>
            <td>ELO</td>
            <td>Matches Played</td>
          </tr>
        </thead>
        <tbody>
          {data.map(player => <tr>
            <td>{player.username}</td>
            <td>{player.SR}</td>
            <td>{player.matches_played}</td>
          </tr>)}
        </tbody>
      </styles.Leaderboard>
    </styles.PageWrapper>
  </>
}
export default Home;