
import React, { useState } from 'react';
import Adminlogo from '../../images/Icons.png'
import { Tab, Tabs } from 'react-bootstrap';
import ExpensesBoys from '../../components/ExpensesBoys/ExpensesBoys';
import ExpensesGirls from '../../components/ExpensesGirls/ExpensesGirls';
 
function Expenses() {
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
                    <ExpensesBoys />
                </Tab>
                <Tab eventKey="girls" title="Women's">
                    <ExpensesGirls />
                </Tab>
            </Tabs>
        </div>
    );
}
 
export default Expenses;
 
