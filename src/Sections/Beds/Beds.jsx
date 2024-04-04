import React, { useState } from 'react';
import Admin from '../../images/Icons.png';
import { Tab, Tabs } from 'react-bootstrap';
import CreateBedsBoys from '../../components/CreateBedsBoys/CreateBedsBoys';
import CreateBedsGirls from '../../components/CreateBedsGirls/CreateBedsGirls';

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
            <h1 className='dashboard-welcome'>&lt;-- Back</h1>
            <Tabs activeKey={activeTab} onSelect={handleTabSelect} className="mb-3">
                <Tab eventKey="boys" title="Men's">
                    <CreateBedsBoys />
                </Tab>
                <Tab eventKey="girls" title="Women's">
                    <CreateBedsGirls />
                </Tab>
            </Tabs>
        </div>
    );
}

export default Beds;
