import React, { useState, useEffect, useContext } from 'react';

interface DataContext {
  rankings: User[],
  getRankings: () => void
  matches: Match[],
  getMatches: () => void
}

const MapDict = {
  "https://i.imgur.com/Ub8EZLi.jpg": "dust2",
  "https://i.imgur.com/Vi8dXOq.jpg": "inferno",
  "https://i.imgur.com/S9GlJb4.png": "mirage",
  "https://i.imgur.com/FCFRbtC.jpg": "nuke",
  "https://i.imgur.com/K3cQRu3.png": "overpass",
  "https://i.imgur.com/P7sDkYE.png": "train",
  "https://i.imgur.com/gnlxCdI.jpg": "vertigo"
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

      // Replace keys with more friendly ones
      const filtered_data: Match[] = json.map((i: APIMatch) => { 


        let newArr: Match = {
          map: MapDict[i.map_image as keyof typeof MapDict] as Match["map"],
          ...i
        };
        

        return newArr;
      });
      setMatches(filtered_data);
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