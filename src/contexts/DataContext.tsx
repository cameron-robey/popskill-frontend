import React, { useState, useEffect, useContext } from 'react';

interface DataContext {
  rankings: User[],
  getRankings: () => void
  matches: Match[],
  getMatches: () => void
}

const Data = React.createContext<DataContext>({} as DataContext);

export const useData = () => useContext(Data);

export const DataConsumer = Data.Consumer;

export const DataProvider: React.FC = ({ children }) => {
  const [ rankings, setRankings ] = useState<User[]>([]);
  const [ matches, setMatches ] = useState<Match[]>([]);

  const getRankings = async (force = false) => {
    // Only update if object empty or forced refresh
    if (rankings.length === 0 || force ) {
      const resp = await fetch('https://vm.mxbi.net:7355/rankings');
      const json = await resp.json();
      setRankings(json);
    }
  }
  
  const getMatches = async (force = false) => {
    // Only update if object empty or forced refresh
    if (matches.length === 0 || force ) {
      const resp = await fetch('https://vm.mxbi.net:7355/matches');
      const json = await resp.json();
      setMatches(json);
    }
  }

  return(
    <Data.Provider
      value={{
        rankings,
        getRankings,
        matches,
        getMatches
      }}
    >
      {children}
    </Data.Provider>
  )
}

export default DataContext;