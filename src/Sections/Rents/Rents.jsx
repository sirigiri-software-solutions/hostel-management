import React, { useContext, useState } from 'react';
import Adminlogo from '../../images/Icons.png'
import { Tab, Tabs } from 'react-bootstrap';
import RentPageBoys from '../../components/RentPageBoys/RentPageBoys';
import RentPageGirls from '../../components/RentPageGirls/RentPageGirls';
import { DataContext } from '../../ApiData/ContextProvider';

const Rents = () => {
    
    // let boysrent = [];
    // if(data !== null && data){
    //     const boysData = data.boys
    // const tenantsData = boysData.tenants;
    
    // console.log("tenantns")
    // console.log(tenatnsData);
    // console.log("tenants");
    // console.log(boysData)
    
    // const tenantsArray = Object.entries(tenantsData);

// Iterate over the tenants array
// tenantsArray.forEach(([tenantId, tenant]) => {
//     // const { rents } = tenant;
//     // boysrent.push(rents);
//     // console.log("boysRents")
//     // console.log(rents);
//     // console.log("boysRents")
//     // Now you have access to the rents data for each tenant
// });
    
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
