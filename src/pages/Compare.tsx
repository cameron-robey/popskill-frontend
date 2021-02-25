// Modules
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// Contexts
import { useData } from '../contexts/DataContext';

// Components
import PageTitle from '../components/helpers/PageInfo';
import PlayersByDate from './../components/graphs/PlayersByDate';

// Styles
import * as styles from './styles/HomeStyles';

// Config
import { config } from './../config';

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
    <PageTitle title={`Comparing ${displayData.length} players`} />
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
