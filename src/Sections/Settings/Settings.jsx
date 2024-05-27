import React, { useState, useEffect } from 'react';
import { ref, set, push, remove, update, onValue } from 'firebase/database';
import { database } from '../../firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LanguageSwitch from '../../LanguageSwitch';
import { useTranslation } from 'react-i18next';
import './settings.css';

const Settings = () => {
  const [hostels, setHostels] = useState({ boys: [], girls: [] });
  const [newBoysHostelName, setNewBoysHostelName] = useState('');
  const [newBoysHostelAddress, setNewBoysHostelAddress] = useState('');
  const [newGirlsHostelName, setNewGirlsHostelName] = useState('');
  const [newGirlsHostelAddress, setNewGirlsHostelAddress] = useState('');
  const [isEditing, setIsEditing] = useState(null);
  const { t } = useTranslation();
  const [isBoysModalOpen, setIsBoysModalOpen] = useState(false);
  const [isGirlsModalOpen, setIsGirlsModalOpen] = useState(false);

  const addNewHostel = (e, isBoys) => {
    e.preventDefault();
    const name = isBoys ? newBoysHostelName : newGirlsHostelName;
    const address = isBoys ? newBoysHostelAddress : newGirlsHostelAddress;

    if (name.trim() === '' || address.trim() === '') {
      toast.error("Hostel name and address cannot be empty.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    const hostelRef = ref(database, `Hostel/${isBoys ? 'boys' : 'girls'}/${name}`);
    const hostelDetails = { name, address };

    set(hostelRef, hostelDetails)
      .then(() => {
        toast.success(`New ${isBoys ? 'boys' : 'girls'} hostel '${name}' added successfully.`, {
          position: "top-center",
          autoClose: 3000,
        });
        if (isBoys) {
          setNewBoysHostelName('');
          setNewBoysHostelAddress('');
        } else {
          setNewGirlsHostelName('');
          setNewGirlsHostelAddress('');
        }
      })
      .catch(error => {
        toast.error("Failed to add new hostel: " + error.message, {
          position: "top-center",
          autoClose: 3000,
        });
      });
  };


  return (
    <div className="settings">
      <h1>{t('menuItems.settings')}</h1>
      <div>
        <label className='languageLable' htmlFor="language-selector">Languages:</label>
        <LanguageSwitch id="language-selector" />
      </div>
      {/* <div className="add-hostel-form">
        <div className='add-hostel-text'>
          <text>Add New Boys Hostel</text>
        </div>
        <button className="addHostelBtn" onClick={() => setIsBoysModalOpen(true)} >Add Hostel</button>
      </div> */}

      {/* <div className="add-hostel-form">
        <h4>Add New Girls Hostel</h4>
        <form onSubmit={(e) => addNewHostel(e, false)}>
          <input
            type="text"
            placeholder="Enter new Hostel name"
            value={newGirlsHostelName}
            onChange={(e) => setNewGirlsHostelName(e.target.value)}
            className="new-hostel-input"
          />
          <input
            type="text"
            placeholder="Enter Hostel address"
            value={newGirlsHostelAddress}
            onChange={(e) => setNewGirlsHostelAddress(e.target.value)}
            className="new-hostel-input"
          />
          <button type="submit" className="addHostelBtn">Add Hostel</button>
        </form>
      </div> */}

      <div className="hostel-table-container">
        <div className="add-hostel-form">
          <div>
            <text>Boys Hostels</text>
          </div>
          <div>
            <button className="addHostelBtn" onClick={() => setIsBoysModalOpen(true)} >Add Hostel</button>
          </div>
        </div>

     
        <div className="add-hostel-form">
          <div>
            <text>Girls Hostels</text>
          </div>
          <div>
            <button className="addHostelBtn" onClick={() => setIsGirlsModalOpen(true)} >Add Hostel</button>
          </div>
        </div>

      </div>
      <div>
        {isBoysModalOpen && (
          <div className="confirmation-dialog">
            <div className='confirmation-card'>
              <form onSubmit={(e) => addNewHostel(e, true)}>
                <input
                  type="text"
                  placeholder="Enter new Hostel name"
                  value={newBoysHostelName}
                  onChange={(e) => setNewBoysHostelName(e.target.value)}
                  className="new-hostel-input"
                /><br /><br />
                <input
                  type="text"
                  placeholder="Enter Hostel address"
                  value={newBoysHostelAddress}
                  onChange={(e) => setNewBoysHostelAddress(e.target.value)}
                  className="new-hostel-input"
                /><br /><br />
                <button type="submit" className="addHostelBtn">Add Hostel</button>
                <button type="submit" className="addHostelBtn" onClick={() => setIsBoysModalOpen(false)}>close</button>
              </form>
            </div>
          </div>
        )}
      </div>
      <div>
        {isGirlsModalOpen && (
          <div className="confirmation-dialog">
            <div className='confirmation-card'>
              <form onSubmit={(e) => addNewHostel(e, false)}>
                <input
                  type="text"
                  placeholder="Enter new Hostel name"
                  value={newGirlsHostelName}
                  onChange={(e) => setNewGirlsHostelName(e.target.value)}
                  className="new-hostel-input"
                />
                <input
                  type="text"
                  placeholder="Enter Hostel address"
                  value={newGirlsHostelAddress}
                  onChange={(e) => setNewGirlsHostelAddress(e.target.value)}
                  className="new-hostel-input"
                />
                <button type="submit" className="addHostelBtn">Add Hostel</button>
                <button type="submit" className="addHostelBtn" onClick={() => setIsGirlsModalOpen(false)}>close</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
