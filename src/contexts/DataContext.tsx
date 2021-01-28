import React, { useState, useEffect, useContext } from 'react';

interface DataContext {
  data: Data[],
  getData: () => void
}

const Data = React.createContext<DataContext>({} as DataContext);

export const useData = () => useContext(Data);

export const DataConsumer = Data.Consumer;

export const DataProvider: React.FC = ({ children }) => {
  const [ data, setData ] = useState<Data[]>([]);

  const getData = async (force = false) => {
    // Only update if object empty or forced refresh
    if (data.length === 0 || force ) {
      const resp = await fetch('http://localhost:5000/rankings');
      const json = await resp.json();
      setData(json);
    }
  }

  return(
    <Data.Provider
      value={{
        data,
        getData
      }}
    >
      {children}
    </Data.Provider>
  )
}

export default DataContext;