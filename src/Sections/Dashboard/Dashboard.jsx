import React, { useState, useEffect } from 'react';
import Admin from '../../images/Icons.png';
import DashboardBoys from '../../components/DashboardBoys/DashboardBoys';
import DashboardGirls from '../../components/DashboardGirls/DashboardGirls';
import { Tab, Tabs } from 'react-bootstrap';
import './Dashboard.css';

const Dashboard = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [activeTab, setActiveTab] = useState('boys');

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 650);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleTabSelect = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className='container_main'>
      <div className='top-div'>
        <img src={Admin} alt="admin" className='dashboard-icon' />
        <h1 className='dashboard-heading'>Admin</h1>
      </div>
      <h1 className='dashboard-welcome'>Welcome</h1>
      {isSmallScreen ? 
      (
      <Tabs activeKey={activeTab} onSelect={handleTabSelect} className="mb-3">
        <Tab eventKey="boys" title="Men's">
          <DashboardBoys />
        </Tab>
        <Tab eventKey="girls" title="Women's">
          <DashboardGirls />
        </Tab>
      </Tabs>
      ) : (
        <div style={{display:'flex', flexDirection:'column', gap:'40px'}}>
            <DashboardBoys />
            <DashboardGirls />
        </div>
      )
      }
    </div>
  );
}

export default Dashboard;
