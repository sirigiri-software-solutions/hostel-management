import React, { useState } from 'react';
import Adminlogo from '../../images/Icons.png';
import { Tab, Tabs } from 'react-bootstrap';
import TenantsBoys from '../../components/TenantsBoys/TenantsBoys';
import TenantsGirls from '../../components/TenantsGirls/TenantsGirls';

function Tenants() {
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
                    <TenantsBoys/>
                </Tab>
                <Tab eventKey="girls" title="Women's">
                    <TenantsGirls/>
                </Tab>
            </Tabs>
        </div>
    );
}

export default Tenants;
