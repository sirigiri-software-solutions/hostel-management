
import React, { useState } from 'react';
import Adminlogo from '../../images/Icons.png';
import { Tab, Tabs } from 'react-bootstrap';
import TenantsBoys from '../../components/TenantsBoys/TenantsBoys';
import TenantsGirls from '../../components/TenantsGirls/TenantsGirls';
 
function Tenants() {
    const [activeTab, setActiveTab] = useState('boys');
    const name=localStorage.getItem("username");
 
    const handleTabSelect = (tab) => {
        setActiveTab(tab);
    };
 
    return (
        <div className="container">
            <div className='top-div'>
                <img src={Adminlogo} alt="admin" className='dashboard-icon' />
                <h1 className='dashboard-heading'>{name}</h1>
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
<<<<<<< HEAD
 
export default Tenants;
 
=======

export default Tenants;
>>>>>>> f4d63b408381c4baf95f6c381e922f2cfef47cdb
