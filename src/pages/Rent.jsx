import React, { useState } from 'react';
import Adminlogo from '../images/Icons (6).png'
import { Tab, Tabs } from 'react-bootstrap';
import RentPageBoys from '../components/RentPageBoys/RentPageBoys';
import RentPageGirls from '../components/RentPageGirls/RentPageGirls';

function Rent() {
    const [activeTab, setActiveTab] = useState('boys');

    const handleTabSelect = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="container">
            <div className='top-div'>
                <img src={Adminlogo} alt="admin" className='dashboard-icon' />
                <h1 className='dashboard-heading'>Admin</h1>
            </div>
            <Tabs activeKey={activeTab} onSelect={handleTabSelect} className="mb-3">
                <Tab eventKey="boys" title="Men's">
                    <RentPageBoys />
                </Tab>
                <Tab eventKey="girls" title="Women's">
                    <RentPageGirls />
                </Tab>
            </Tabs>
        </div>
    );
}

export default Rent;
