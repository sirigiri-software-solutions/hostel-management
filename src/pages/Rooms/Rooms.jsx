import React, { useState } from 'react';
import Admin from '../../images/Icons.png';
import { Tab, Tabs } from 'react-bootstrap';
import RoomsBoys from '../../components/RoomsBoys/RoomsBoys';
import RoomsGirls from '../../components/RoomsGirls/RoomsGirls';

function Rooms() {
    const [activeTab, setActiveTab] = useState('boys');

    const handleTabSelect = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="container">
            <div className='top-div'>
                <img src={Admin} alt="admin" className='dashboard-icon' />
                <h1 className='dashboard-heading'>Admin</h1>
            </div>
            <Tabs activeKey={activeTab} onSelect={handleTabSelect} className="mb-3">
                <Tab eventKey="boys" title="Men's">
                    <RoomsBoys />
                </Tab>
                <Tab eventKey="girls" title="Women's">
                    <RoomsGirls />
                </Tab>
            </Tabs>
        </div>
    );
}

export default Rooms;
