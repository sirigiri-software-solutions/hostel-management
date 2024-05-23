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

  useEffect(() => {
    const boysRef = ref(database, 'Hostel/boys');
    const girlsRef = ref(database, 'Hostel/girls');

    const fetchBoysHostels = onValue(boysRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const formattedData = Object.keys(data).map(key => ({
          id: key,
          name: data[key].name,
          address: data[key].address,
        }));
        setHostels(prev => ({ ...prev, boys: formattedData }));
      } else {
        setHostels(prev => ({ ...prev, boys: [] }));
      }
    });

    const fetchGirlsHostels = onValue(girlsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const formattedData = Object.keys(data).map(key => ({
          id: key,
          name: data[key].name,
          address: data[key].address,
        }));
        setHostels(prev => ({ ...prev, girls: formattedData }));
      } else {
        setHostels(prev => ({ ...prev, girls: [] }));
      }
    });

    return () => {
      fetchBoysHostels();
      fetchGirlsHostels();
    };
  }, []);

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

  const deleteHostel = (isBoys, id) => {
    const path = `Hostel/${isBoys ? 'boys' : 'girls'}/${id}`;
    remove(ref(database, path))
      .then(() => {
        toast.success("Hostel deleted successfully.", {
          position: "top-center",
          autoClose: 3000,
        });
      })
      .catch(error => {
        toast.error("Failed to delete hostel: " + error.message, {
          position: "top-center",
          autoClose: 3000,
        });
      });
  };

  const startEdit = (id, name, address, isBoys) => {
    setIsEditing({ id, name, originalName: name, address, isBoys });
  };

  const cancelEdit = () => {
    setIsEditing(null);
  };

  const submitHostelEdit = (e) => {
    e.preventDefault();
    const { id, name, originalName, address, isBoys } = isEditing;
    const basePath = `Hostel/${isBoys ? 'boys' : 'girls'}`;

    if (name !== originalName) {
      // Move the hostel data to the new name key
      const updates = {};
      updates[`${basePath}/${originalName}`] = null;
      updates[`${basePath}/${name}`] = { name, address };

      update(ref(database), updates)
        .then(() => {
          toast.success("Hostel updated successfully.", {
            position: "top-center",
            autoClose: 3000,
          });
          cancelEdit();
        })
        .catch(error => {
          toast.error("Failed to update hostel: " + error.message, {
            position: "top-center",
            autoClose: 3000,
          });
        });
    } else {
      // Only update the address under the existing name
      const hostelRef = ref(database, `${basePath}/${name}`);
      update(hostelRef, { name, address })
        .then(() => {
          toast.success("Hostel address updated successfully.", {
            position: "top-center",
            autoClose: 3000,
          });
          cancelEdit();
        })
        .catch(error => {
          toast.error("Failed to update hostel address: " + error.message, {
            position: "top-center",
            autoClose: 3000,
          });
        });
    }
  };

  const handleEditChange = (field, value) => {
    setIsEditing(prev => ({ ...prev, [field]: value }));
  };

  const renderHostelTable = (hostelData, isBoys) => (
    <table className="hostel-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {hostelData.map(({ id, name, address }) => (
          isEditing && isEditing.id === id ? (
            <tr key={id}>
              <td>
                <input
                  type="text"
                  value={isEditing.name}
                  onChange={(e) => handleEditChange('name', e.target.value)}
                  className="edit-hostel-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={isEditing.address}
                  onChange={(e) => handleEditChange('address', e.target.value)}
                  className="edit-hostel-input"
                />
              </td>
              <td>
                <button onClick={submitHostelEdit} className="action-btn">Save</button>
                <button onClick={cancelEdit} className="action-btn">Cancel</button>
              </td>
            </tr>
          ) : (
            <tr key={id}>
              <td>{name}</td>
              <td>{address}</td>
              <td>
                <button onClick={() => startEdit(id, name, address, isBoys)} className="action-btn">Edit</button>
                <button onClick={() => deleteHostel(isBoys, id)} className="action-btn">Delete</button>
              </td>
            </tr>
          )
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="settings">
      <h1>{t('menuItems.settings')}</h1>
      <div>
        <label className='languageLable' htmlFor="language-selector">Languages:</label>
        <LanguageSwitch id="language-selector" />
      </div>
      <div className="add-hostel-form">
        <h4>Add New Boys Hostel</h4>
        <form onSubmit={(e) => addNewHostel(e, true)}>
          <input
            type="text"
            placeholder="Enter new Hostel name"
            value={newBoysHostelName}
            onChange={(e) => setNewBoysHostelName(e.target.value)}
            className="new-hostel-input"
          />
          <input
            type="text"
            placeholder="Enter Hostel address"
            value={newBoysHostelAddress}
            onChange={(e) => setNewBoysHostelAddress(e.target.value)}
            className="new-hostel-input"
          />
          <button type="submit" className="addHostelBtn">Add Hostel</button>
        </form>
      </div>

      <div className="add-hostel-form">
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
      </div>

      <div className="hostel-table-container">
        <h2>Boys Hostels</h2>
        {renderHostelTable(hostels.boys, true)}
        <h2>Girls Hostels</h2>
        {renderHostelTable(hostels.girls, false)}
      </div>

      
    </div>
  );
};

export default Settings;
