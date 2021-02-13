// Modules
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

// Contexts
import { useData } from './../contexts/DataContext';

// Components

// Styles
import * as styles from './styles/HomeStyles';

// Assets
import flashbang from './../assets/flash.png'

const Home = () => {
  const { data, getData } = useData();
  const { push } = useHistory();

  const [displayData, setDisplayData] = useState<Data[]>([]);
  const [show, setShow] = useState(false);

  const [input, setInput] = useState('');

  const [compareShow, setCompareShow] = useState(false);
  const [compareList, setCompareList] = useState<boolean[]>([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    // Get data on page load
    getData();
  }, []);

  useEffect(() => {
    const filtered = data.filter((i: Data)=>i.matches_played > 2);
    const sorted = filtered.sort((a: Data,b: Data) => b.SR - a.SR );

    setDisplayData(sorted);
    setCompareList(new Array(sorted.length).fill(false));
  }, [data]);

  // const submitMatch = async () => {
  //   let headers = new Headers();
  //   headers.append("Content-Type", "application/x-www-form-urlencoded");
  //   let urlencoded = new URLSearchParams();
  //   urlencoded.append("match_url", "https://popflash.site/match/1148142");

  //   const response = await fetch('https://vm.mxbi.net:7355/submit_match', {
  //     method: 'post',
  //     headers: headers,
  //     body: urlencoded
  //   });
    
  //   const json = await response.json();

  //   alert(`Error: ${json}`)


  //   setShow(false);
  // }

  const countNumTrue = (arr: boolean[]) => arr.filter(i=>i).length;

  useEffect(() => {
    setCompareList(new Array(displayData.length).fill(false));
  }, [compareShow]);

  const redirectToPage = () => {
    push(`/compare/${compareList.map((u,i)=>u ? displayData[i].user_id:false).filter(a=>a).join(',')}`);
  }

  return <>
    <styles.PageWrapper>
      <h1>CUDGS CS:GO Skill Ratings</h1>
      <p>Play <b>six</b> 10-mans to get a skill rating. Everyone starts with 1000 Rating, and it is updated after every match. Your Rating is based on <b>game</b> performance + individual performance in games.</p>
      <div>
      {!compareShow ? 
      <styles.Button onClick={() => setCompareShow(true)}>Compare players</styles.Button> : <>
      <styles.Button variant="secondary" onClick={() => setCompareShow(false)}>Cancel</styles.Button>
      <styles.Button disabled={(() => countNumTrue(compareList) < 2)()} onClick={redirectToPage}>Compare</styles.Button>
      </> }
      </div>
      
      {/* <styles.AddButton onClick={handleShow}>Add match</styles.AddButton>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add match</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <input className="input" value={input} onChange={(e) => setInput(e.target.value)}></input>
          </form>
       </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={submitMatch}>
            Add Match
          </Button>
        </Modal.Footer>
      </Modal> */}

      <styles.Leaderboard striped bordered hover>
        <thead className="thead-dark">
          <tr>
            <td>{compareShow ? 'Rank' : 'Rank'}</td>
            <td>Name</td>
            <td><b>Rating</b></td>
            <td>Matches Played</td>
            <td>RW%</td>
            <td>HTLV</td>
          </tr>whoo
        </thead>
        <tbody>
          {displayData.map((player, index) => <tr>
            <td>{compareShow ? <><input type="checkbox" checked={compareList[index]} onChange={() => {let a = [...compareList]; a[index] = !compareList[index]; setCompareList(a)}} /></>  : <>{index + 1}</>}</td>
            <td>
              <Link to={`/player/${player.user_id}`}>{player.username}</Link>
              <styles.PopflashLink href={`https://popflash.site/user/${player.user_id}`}>
                <img src={flashbang} />
              </styles.PopflashLink>
            </td>
            <td><b>{`${player.SR}`}</b>
              <styles.DiffChange className={Math.sign(player.last_diff) === 1 ? 'text-success' : Math.sign(player.last_diff) === -1 ? 'text-danger' : ''}>
                {`${(player.last_diff<0?"":"+") + player.last_diff}`}
              </styles.DiffChange>
            </td>
            <td>{player.matches_played}</td>
            <td>{Math.floor(player.rwp*100) + "%"}</td>
            <td>{player.hltv.toFixed(2)}</td>
          </tr>)}
        </tbody>
      </styles.Leaderboard>
      <p>Made by Mikel and Cameron.</p>
      <p>Rating v2: mu=1000 sigma=166 beta=166 tau=3.32 hltv=0.75 mode=GAME</p>
    </styles.PageWrapper>
  </>
}
export default Home;
