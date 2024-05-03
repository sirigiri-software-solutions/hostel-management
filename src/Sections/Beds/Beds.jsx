import React, { useState } from 'react';
import Admin from '../../images/Icons.png';
import { Tab, Tabs } from 'react-bootstrap';
import BedsPageBoys from '../../components/BedsPageBoys/BedsPageBoys';
import BedsPageGirls from '../../components/BedsPageGirls/BedsPageGirls';

const Beds = () => {
    const [activeTab, setActiveTab] = useState('boys');
    const handleTabSelect = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="container">
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
