import React, { createContext, useState, useEffect, useContext } from 'react';
import { FetchData } from './FetchData';
import { onValue, ref } from 'firebase/database';
import { database } from '../firebase';


const DataContext = createContext();
const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [activeBoysHostel, setActiveBoysHostel] = useState(null);
  const [activeBoysHostelButtons, setActiveBoysHostelButtons] = useState([]);
  const [activeGirlsHostel, setActiveGirlsHostel] = useState(null);
  const [activeGirlsHostelButtons, setActiveGirlsHostelButtons] = useState([]);

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

  useEffect(() => {
    // Reference to the 'Hostel/boys' path in your Firebase database
    const boysRef = ref(database, 'Hostel/boys');

    // Listen for value changes at this reference
    const unsubscribe = onValue(boysRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const keys = Object.keys(data);
        setActiveBoysHostelButtons(keys);
      } else {
        setActiveBoysHostelButtons([]);
      }
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Reference to the 'Hostel/boys' path in your Firebase database
    const girlsRef = ref(database, 'Hostel/girls');

    // Listen for value changes at this reference
    const unsubscribe = onValue(girlsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const keys = Object.keys(data);
        setActiveGirlsHostelButtons(keys);
      } else {
        setActiveGirlsHostelButtons([]);
      }
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (activeBoysHostelButtons.length > 0) {
      setActiveBoysHostel(activeBoysHostelButtons[0]);
    }
  }, [activeBoysHostelButtons]);

  useEffect(() => {
    if (activeGirlsHostelButtons.length > 0) {
      setActiveGirlsHostel(activeGirlsHostelButtons[0]);
    }
  }, [activeGirlsHostelButtons]);
 
  return (
    <DataContext.Provider value={{ data, activeBoysHostel, setActiveBoysHostel, activeBoysHostelButtons,  activeGirlsHostel,setActiveBoysHostelButtons,setActiveGirlsHostelButtons, setActiveGirlsHostel, activeGirlsHostelButtons }}>
      {children}
    </DataContext.Provider>
  );
};
// Define the useData hook using the DataContext
const useData = () => useContext(DataContext);
export { DataContext, useData, DataProvider };