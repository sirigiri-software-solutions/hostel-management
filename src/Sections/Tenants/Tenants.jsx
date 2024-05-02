
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
 
