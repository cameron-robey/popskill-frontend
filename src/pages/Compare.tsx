// Modules
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Contexts
import { useData } from '../contexts/DataContext';

// Components
import PlayersByDate from './../components/graphs/PlayersByDate';

// Styles
import * as styles from './styles/HomeStyles';

interface Params {
  playerIDs: string
}

const Compare = () => {
  const { playerIDs } = useParams<Params>();
  const { rankings, getRankings } = useData();
  
  const [displayData, setDisplayData] = useState<User[]>([]);

  useEffect(() => {
    // Get data on page load
    getRankings();
  }, []);

  useEffect(() => {
    const filtered = rankings.filter((i: User)=>i.matches_played > 2);
    const sorted = filtered.sort((a: User,b: User) => b.SR - a.SR );

    const ids = playerIDs.split(',');
    const display = sorted.filter((i:User) => ids.includes(i.user_id));
    setDisplayData(display);
  }, [rankings]);

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
      <p>Player data for: <b>{ displayData.map(i=>i.username).join(', ') }</b></p>
      <hr />

      <p><b>Rating by date</b></p>

      <PlayersByDate height="800px" data={displayData.map(p => ({
          id: p.username,
          data: p.user_skill_history.slice(1).map((game, index) => {
            return {
              x: game.date.substr(0,10),
              y: game.SR
            }
          }).filter((g,i,s)=>{
            if (i + 1 === s.length) return true;
            if (g.x === s[i+1].x) return false;
            return true;
          })
        }))
      } />

    </styles.PageWrapper>
  </>
}
export default Compare;
