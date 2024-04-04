import React, { useState } from 'react';
import Admin from '../../images/Icons.png';
import { Tab, Tabs } from 'react-bootstrap';
import BedsPageBoys from '../../components/BedsPageBoys/BedsPageBoys';
import BedsPageGirls from '../../components/BedsPageGirls/BedsPageGirls';

const Beds = () => {
    const [activeTab, setActiveTab] = useState('boys');
    const name=localStorage.getItem("username")
    const handleTabSelect = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="container">
            <div className='top-div'>
                <img src={Admin} alt="admin" className='dashboard-icon' />
                <h1 className='dashboard-heading'>{name}</h1>
            </div>
            <Tabs activeKey={activeTab} onSelect={handleTabSelect} className="mb-3">
                <Tab eventKey="boys" title="Men's">
                    <BedsPageBoys />
                </Tab>
                <Tab eventKey="girls" title="Women's">
                    <BedsPageGirls />
                </Tab>
            </Tabs>
        </div>
    );
}

export default Beds;
