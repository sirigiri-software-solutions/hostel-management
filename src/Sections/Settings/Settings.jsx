import React, { useState } from 'react';
import { ref, update } from 'firebase/database';
import { database } from '../../firebase'; // Adjust the path as necessary
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Settings = () => {
  const [newBoysHostelName, setNewBoysHostelName] = useState('');
  const [newGirlsHostelName, setNewGirlsHostelName] = useState('');

  const addNewActiveBoysHostel = (e) => {
    e.preventDefault();
    if (newBoysHostelName.trim() === '') {
      toast.error("Hostel name cannot be empty.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    const newButtonRef = ref(database, `Hostel/boys/${newBoysHostelName}`);

    // Initialize with placeholder data or any default structure you like
    update(newButtonRef, { placeholderData: true })
      .then(() => {
        toast.success(`New Hostel '${newBoysHostelName}' added successfully.`, {
          position: "top-center",
          autoClose: 3000,
        });
        setNewBoysHostelName(''); // Reset the input field
      })
      .catch(error => {
        toast.error("Failed to add new Hostel: " + error.message, {
          position: "top-center",
          autoClose: 3000,
        });
      });
  };

  const addNewActiveGirlsHostel = (e) => {
    e.preventDefault();
    if (newGirlsHostelName.trim() === '') {
      toast.error("Hostel name cannot be empty.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    const newButtonRef = ref(database, `Hostel/girls/${newGirlsHostelName}`);

    // Initialize with placeholder data or any default structure you like
    update(newButtonRef, { placeholderData: true })
      .then(() => {
        toast.success(`New Hostel '${newGirlsHostelName}' added successfully.`, {
          position: "top-center",
          autoClose: 3000,
        });
        setNewGirlsHostelName(''); // Reset the input field
      })
      .catch(error => {
        toast.error("Failed to add new Hostel: " + error.message, {
          position: "top-center",
          autoClose: 3000,
        });
      });
  };

  return (
    <div className="settings">
      <h1>Settings</h1>
      <div className="add-Hostel-form">
        <div>
          <h4>Add New Boys Hostel</h4>
        </div>
        <form onSubmit={addNewActiveBoysHostel}>
          <input
            type="text"
            placeholder="Enter new Hostel name"
            value={newBoysHostelName}
            onChange={(e) => setNewBoysHostelName(e.target.value)}
            className="new-Hostel-input"
          />
          <button type="submit" className="btn btn-success">Add Hostel</button>
        </form>
      </div>

      <div className="add-Hostel-form">
        <div>
          <h4>Add New Girls Hostel</h4>
        </div>
        <form onSubmit={addNewActiveGirlsHostel}>
          <input
            type="text"
            placeholder="Enter new Hostel name"
            value={newGirlsHostelName}
            onChange={(e) => setNewGirlsHostelName(e.target.value)}
            className="new-Hostel-input"
          />
          <button type="submit" className="btn btn-success">Add Hostel</button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
