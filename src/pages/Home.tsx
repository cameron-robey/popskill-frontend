// Modules
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Contexts
import { useData } from './../contexts/DataContext';

// Components

// Styles
import * as styles from './styles/HomeStyles';

// Assets
import flashbang from './../assets/flash.png'

const Home = () => {
  const { data, getData } = useData();

  const [displayData, setDisplayData] = useState<Data[]>([]);

  useEffect(() => {
    // Get data on page load
    getData();
  }, []);

  useEffect(() => {
    const filtered = data.filter((i: Data)=>i.matches_played > 2);
    const sorted = filtered.sort((a: Data,b: Data) => b.SR - a.SR );

    setDisplayData(sorted);
  }, [data]);

  return <>
    <styles.PageWrapper>
      <h1>CUDGS CS:GO Leaderboard</h1>
      <p>WIP</p>
      <styles.Leaderboard striped bordered hover>
        <thead className="thead-dark">
          <tr>
            <td>Rank</td>
            <td>Name</td>
            <td>ELO</td>
            <td>Matches Played</td>
          </tr>
        </thead>
        <tbody>
          {displayData.map((player, index) => <tr>
            <td>{index + 1}</td>
            <td>
              <Link to={`/player/${player.user_id}`}>{player.username}</Link>
              <styles.PopflashLink href={`https://popflash.site/user/${player.user_id}`}>
                <img src={flashbang} />
              </styles.PopflashLink>
            </td>
            <td>{`${player.SR}`}
              <styles.DiffChange className={Math.sign(player.last_diff) === 1 ? 'text-success' : Math.sign(player.last_diff) === -1 ? 'text-danger' : ''}>
                {`${(player.last_diff<0?"":"+") + player.last_diff}`}
              </styles.DiffChange>
            </td>
            <td>{player.matches_played}</td>
          </tr>)}
        </tbody>
      </styles.Leaderboard>
    </styles.PageWrapper>
  </>
}
export default Home;
