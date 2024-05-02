import React, { useContext, useState } from 'react';
import Adminlogo from '../../images/Icons.png'
import { Tab, Tabs } from 'react-bootstrap';
import RentPageBoys from '../../components/RentPageBoys/RentPageBoys';
import RentPageGirls from '../../components/RentPageGirls/RentPageGirls';
import { DataContext } from '../../ApiData/ContextProvider';

const Rents = () => {
    
    const [activeTab, setActiveTab] = useState('boys');

    const handleTabSelect = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="container">
            <Tabs activeKey={activeTab} onSelect={handleTabSelect} className="mb-3">
                <Tab eventKey="boys" title="Men's">
                    <RentPageBoys  />
                </Tab>
                <Tab eventKey="girls" title="Women's">
                    <RentPageGirls />
                </Tab>
            </Tabs>
        </div>
    );
}

export default Rents;
