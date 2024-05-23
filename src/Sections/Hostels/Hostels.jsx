import React, { useState } from 'react';
import { useData } from '../../ApiData/ContextProvider';
import { set, ref, remove } from 'firebase/database';
import { database } from '../../firebase';

const Hostels = () => {
    const { activeBoysHostel, setActiveBoysHostel, activeBoysHostelButtons, setActiveBoysHostelButtons } = useData();

    return (
        <div>
            <h2>Hostels</h2>        
        </div>
    );
};

export default Hostels;
