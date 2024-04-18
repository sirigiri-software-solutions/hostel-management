import React, { createContext, useState, useEffect } from 'react';
import { FetchData } from './FetchData';

const DataContext = createContext();
const DataProvider = ({ children }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
      const fetchApiData = async () => {
        try {
          const fetchedData = await FetchData();
          setData(fetchedData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchApiData();
    }, []);
  return (
    <DataContext.Provider value={{ data }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };