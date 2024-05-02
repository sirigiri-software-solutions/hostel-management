import React, { useState, useEffect } from 'react';
import Admin from '../../images/Icons.png';
import DashboardBoys from '../../components/DashboardBoys/DashboardBoys';
import DashboardGirls from '../../components/DashboardGirls/DashboardGirls';
import { Tab, Tabs } from 'react-bootstrap';
import './Dashboard.css';

const Dashboard = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [activeTab, setActiveTab] = useState('boys');
  const name = localStorage.getItem("username")

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
