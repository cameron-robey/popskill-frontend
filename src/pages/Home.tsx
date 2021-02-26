// Modules
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import InWords from 'num-words';

// Contexts
import { useData } from '../contexts/DataContext';

// Components
import PageTitle from '../components/helpers/PageInfo';

// Styles
import * as styles from './styles/HomeStyles';

// Assets
import flashbang from './../assets/flash.png'

// Config
import { config } from './../config';

// Helpers
import { rankedFilter, unrankedFilter } from './../helpers/data';

const Home = () => {
  const { rankings, getRankings } = useData();
  const { getMatches } = useData();
  const { push } = useHistory();

  const [displayData, setDisplayData] = useState<User[]>([]);
  const [show, setShow] = useState(false);

  const [input, setInput] = useState('');

  const [compareShow, setCompareShow] = useState(false);
  const [compareList, setCompareList] = useState<boolean[]>([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    // Get data on page load
    getRankings();
    getMatches();
  }, []);

  useEffect(() => {
    const filtered = rankings; //rankings.filter((i: User)=>i.matches_played > 2);
    const sorted = filtered.sort((a: User,b: User) => b.SR - a.SR );

    setDisplayData(sorted);
    setCompareList(new Array(sorted.length).fill(false));
  }, [rankings]);

  const countNumTrue = (arr: boolean[]) => arr.filter(i=>i).length;

  useEffect(() => {
    setCompareList(new Array(displayData.length).fill(false));
  }, [compareShow]);

  const redirectToPage = () => {
    push(`/compare/${compareList.map((u,i)=>u ? displayData[i].user_id:false).filter(a=>a).join(',')}`);
  }

  return <>
    <PageTitle title={''} />

    <styles.PageWrapper>
      <h1>{config.name}</h1>
      <p>Play <b>{InWords(config.ranking_conditions.matches)}</b> 10-mans to get a skill rating. Everyone starts with 1000 Rating, and it is updated after every match. Your Rating is based on <b>game</b> performance + individual performance in games.</p>
      <div>
      {!compareShow ? 
      <styles.Button onClick={() => setCompareShow(true)}>Compare players</styles.Button> : <>
      <styles.Button variant="secondary" onClick={() => setCompareShow(false)}>Cancel</styles.Button>
      <styles.Button disabled={(() => countNumTrue(compareList) < 2)()} onClick={redirectToPage}>Compare</styles.Button>
      </> }
      </div>
      

      <styles.Leaderboard>
        <thead>
          <tr>
            <td>{compareShow ? 'Rank' : 'Rank'}</td>
            <td>Name</td>
            <td><b>Rating</b></td>
            <td>Matches Played</td>
            <td>RW%</td>
            <td>ADR</td>
            <td>HLTV</td>
          </tr>
        </thead>
        <tbody>
          {displayData.filter(rankedFilter)
          .map((player, index) => <tr>
            <td>{compareShow ? <><input type="checkbox" checked={compareList[displayData.indexOf(player)]} onChange={() => {let a = [...compareList]; a[displayData.indexOf(player)] = !compareList[displayData.indexOf(player)]; setCompareList(a)}} /></>  : <>{index + 1}</>}</td>
            <td>
              <Link to={`/player/${player.user_id}`}>{player.username}</Link>
              <styles.PopflashLink href={`https://popflash.site/user/${player.user_id}`}>
                <img src={flashbang} />
              </styles.PopflashLink>
            </td>
            <td><b>{`${player.SR}`}</b>
              <styles.DiffChange change={Math.sign(player.last_diff)}>
                {`${(player.last_diff<0?"":"+") + player.last_diff}`}
              </styles.DiffChange>
            </td>
            <td>{player.matches_played}</td>
            <td>{Math.floor(player.rwp*100) + "%"}</td>
            <td>{Math.floor(player.adr)}</td>
            <td>{player.hltv.toFixed(2)}</td>
          </tr>)}
        </tbody>
      </styles.Leaderboard>
      
      <br />
      <h2>Unranked players</h2>
      <p>Players who have not played <strong>{InWords(config.ranking_conditions.matches)}</strong> games, or who have not played in <strong>{config.ranking_conditions.days} days</strong> are not shown on the main leaderboard.</p>
      <br />
      <styles.Leaderboard>
        <thead>
          <tr>
            <td>{compareShow ? 'Rank' : 'Rank'}</td>
            <td>Name</td>
            <td><b>Rating</b></td>
            <td>Matches Played</td>
            <td>RW%</td>
            <td>ADR</td>
            <td>HLTV</td>
          </tr>
        </thead>
        <tbody>
          {displayData.filter(unrankedFilter).sort((a, b) => a.username < b.username ? 1 : -1)
          .map((player, index) => <tr>
            <td>{compareShow ? <><input type="checkbox" checked={compareList[displayData.indexOf(player)]} onChange={() => {let a = [...compareList]; a[displayData.indexOf(player)] = !compareList[displayData.indexOf(player)]; setCompareList(a)}} /></>  : <>?</>}</td>
            <td>
              <Link to={`/player/${player.user_id}`}>{player.username}</Link>
              <styles.PopflashLink href={`https://popflash.site/user/${player.user_id}`}>
                <img src={flashbang} />
              </styles.PopflashLink>
            </td>
            <td><b>{`${player.SR}`}?</b>
              <styles.DiffChange change={Math.sign(player.last_diff)}>
                {`${(player.last_diff<0?"":"+") + player.last_diff}`}
              </styles.DiffChange>
            </td>
            <td>{player.matches_played}</td>
            <td>{Math.floor(player.rwp*100) + "%"}</td>
            <td>{Math.floor(player.adr)}</td>
            <td>{player.hltv.toFixed(2)}</td>
          </tr>)}
        </tbody>
      </styles.Leaderboard>

      <br />

      <p>{`Made by ${config.contributors.slice(0, -1).join(',')} and ${config.contributors.slice(-1)}.`}</p>
      <p>{`Rating v${config.rating_version}: 
        mu=${config.trueskill_parameters.mu} 
        sigma=${config.trueskill_parameters.sigma} 
        beta=${config.trueskill_parameters.beta} 
        tau=${config.trueskill_parameters.tau} 
        hltv=${config.trueskill_parameters.hltv} 
        mode=${config.trueskill_parameters.mode}`}</p>
      </styles.PageWrapper>
  </>
}
export default Home;
