import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import TenantsBoys from '../../components/TenantsBoys/TenantsBoys';
import TenantsGirls from '../../components/TenantsGirls/TenantsGirls';
// import FontsizeAdjuster from '../Settings/FontsizeAdjuster';
// import FontsizeSlider from '../../FontsizeAdjust/FontsizeSlider';
// import { useFontSize } from '../../FontsizeAdjust/FontSizeContext';
 
function Tenants() {
    const [activeTab, setActiveTab] = useState('boys');
    const [key, setKey] = useState('boys');
 
    const handleTabSelect = (tab) => {
        setActiveTab(tab);
        setKey(tab);
    };
 
    return (
        <div className="container">
            <Tabs activeKey={activeTab} onSelect={handleTabSelect} className="mb-3">
                <Tab eventKey="boys" title="Men's">
                    <TenantsBoys key={key}/>
                </Tab>
                <Tab eventKey="girls" title="Women's">
                    <TenantsGirls key={key}/>
                </Tab>
            </Tabs>
            {/* <FontsizeSlider/> */}
            
        </div>
    );
}
 
export default Tenants;
 
