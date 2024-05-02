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
        <div className='container'>
            <Tabs activeKey={activeTab} onSelect={handleTabSelect} className="mb-3 tabs-nav">
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
