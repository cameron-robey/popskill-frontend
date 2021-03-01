import React, { useState, useEffect, useContext } from 'react';

// Config
import { config } from './../config';

interface DataContext {
  leaderboard: LeaderboardItem[],
  getLeaderboard: (force?: boolean, season?: string) => void
  users: User[],
  getUser: (user_id: number, force?: boolean) => void
}

const Data = React.createContext<DataContext>({} as DataContext);

export const useData = () => useContext(Data);

export const DataConsumer = Data.Consumer;

export const DataProvider: React.FC = ({ children }) => {


  const [ leaderboard, setLeaderboard ] = useState<LeaderboardItem[]>([]);

  // we store users in an array, so each only has to be fetched once
  // could probably set a max number that are stored locally such that memory
  // isn't too high, but with the current number of users we have, this will
  // never happen
  const [ users, setUsers ] = useState<User[]>([]);

  const getLeaderboard = async (force = false, season: string|undefined = undefined) => {
    if (leaderboard.length === 0 || force ) {
      const resp = await fetch(`${config.api_url}/v2/leaderboard${season ? `/${season}` : ''}`);
      const json = await resp.json();
      setLeaderboard(json.rankings);
    }
  }

  const getUser = async (user_id: number, force = false) => {
    if (users.filter(i=>i.user_id === user_id).length === 0 || force ) {
      const resp = await fetch(`${config.api_url}/v2/user/${user_id}`);
      const json = await resp.json();

      let temp_arr = [...users];
      temp_arr.push(json);
      setUsers(temp_arr);
    }
  }

  
  // const [ rankings, setRankings ] = useState<User[]>([]);
  // const [ matches, setMatches ] = useState<Match[]>([]);


  // const getRankings = async (force = false) => {
  //   // Only update if object empty or forced refresh
  //   if (rankings.length === 0 || force ) {
  //     const resp = await fetch(`${config.api_url}/rankings`);
  //     const json = await resp.json();
  //     setRankings(json);
  //   }
  // }
  
  // const getMatches = async (force = false) => {
  //   // Only update if object empty or forced refresh
  //   if (matches.length === 0 || force ) {
  //     const resp = await fetch(`${config.api_url}/matches`);
  //     const json = await resp.json();

  //     // Replace keys with more friendly ones
  //     const filtered_data: Match[] = json.map((i: APIMatch) => { 


  //       let newArr: Match = {
  //         map: MapDict[i.map_image as keyof typeof MapDict] as Match["map"],
  //         ...i
  //       };
        

  //       return newArr;
  //     });
  //     setMatches(filtered_data);
  //   }
  // }

  return(
    <Data.Provider
      value={{
        leaderboard,
        getLeaderboard,
        users,
        getUser
      }}
    >
      {children}
    </Data.Provider>
  )
}

export default DataContext;