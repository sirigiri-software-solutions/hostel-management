import React, { useState } from 'react';
import { ref, set } from 'firebase/database';
import { database } from '../../firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LanguageSwitch from '../../LanguageSwitch';
import { useTranslation } from 'react-i18next';
import './settings.css';
import { Modal, Button } from 'react-bootstrap';

const Settings = () => {
  const [newBoysHostelName, setNewBoysHostelName] = useState('');
  const [newBoysHostelAddress, setNewBoysHostelAddress] = useState('');
  const [newGirlsHostelName, setNewGirlsHostelName] = useState('');
  const [newGirlsHostelAddress, setNewGirlsHostelAddress] = useState('');
  const { t } = useTranslation();
  const [isBoysModalOpen, setIsBoysModalOpen] = useState(false);
  const [isGirlsModalOpen, setIsGirlsModalOpen] = useState(false);

  const capitalizeFirstLetter = (string) => {
    return string.replace(/\b\w/g, char => char.toUpperCase());
  };

  const addNewHostel = (e, isBoys) => {
    e.preventDefault();
    const name = isBoys ? capitalizeFirstLetter(newBoysHostelName) : capitalizeFirstLetter(newGirlsHostelName);
    const address = isBoys ? capitalizeFirstLetter(newBoysHostelAddress) : capitalizeFirstLetter(newGirlsHostelAddress);

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
          setIsBoysModalOpen(false);
        } else {
          setNewGirlsHostelName('');
          setNewGirlsHostelAddress('');
          setIsGirlsModalOpen(false);
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
      <div className="settings-top">
        <div className="language-switch-section">
          <label className="languageLabel" htmlFor="language-selector">Languages:</label>
          <LanguageSwitch id="language-selector" />
        </div>
        <div className="hostel-section">
          <div className="add-hostel-form">
            <text>Boys Hostels</text>
            <button className="addHostelBtn" onClick={() => setIsBoysModalOpen(true)}>Add Hostel</button>
          </div>
          <div className="add-hostel-form">
            <text>Girls Hostels</text>
            <button className="addHostelBtn" onClick={() => setIsGirlsModalOpen(true)}>Add Hostel</button>
          </div>
        </div>
      </div>

      <Modal show={isBoysModalOpen} onHide={() => setIsBoysModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Boys Hostel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(e) => addNewHostel(e, true)}>
            <div className="form-group">
              <label htmlFor="newBoysHostelName">Hostel Name</label>
              <input
                type="text"
                className="form-control"
                id="newBoysHostelName"
                placeholder="Enter new Hostel name"
                value={newBoysHostelName}
                onChange={(e) => setNewBoysHostelName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="newBoysHostelAddress">Hostel Address</label>
              <input
                type="text"
                className="form-control"
                id="newBoysHostelAddress"
                placeholder="Enter Hostel address"
                value={newBoysHostelAddress}
                onChange={(e) => setNewBoysHostelAddress(e.target.value)}
              />
            </div>
            <Button variant="primary" type="submit">Add Hostel</Button>
            <Button variant="secondary" onClick={() => setIsBoysModalOpen(false)}>Close</Button>
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={isGirlsModalOpen} onHide={() => setIsGirlsModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Girls Hostel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(e) => addNewHostel(e, false)}>
            <div className="form-group">
              <label htmlFor="newGirlsHostelName">Hostel Name</label>
              <input
                type="text"
                className="form-control"
                id="newGirlsHostelName"
                placeholder="Enter new Hostel name"
                value={newGirlsHostelName}
                onChange={(e) => setNewGirlsHostelName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="newGirlsHostelAddress">Hostel Address</label>
              <input
                type="text"
                className="form-control"
                id="newGirlsHostelAddress"
                placeholder="Enter Hostel address"
                value={newGirlsHostelAddress}
                onChange={(e) => setNewGirlsHostelAddress(e.target.value)}
              />
            </div>
            <Button variant="primary" type="submit">Add Hostel</Button>
            <Button variant="secondary" onClick={() => setIsGirlsModalOpen(false)}>Close</Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Settings;

