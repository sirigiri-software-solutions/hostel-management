import React, { useEffect, useState } from 'react';
import { useData } from '../../ApiData/ContextProvider';
import { set, ref, remove, onValue, update } from 'firebase/database';
import { database } from '../../firebase';
import { toast } from 'react-toastify';
import './Hostels.css';
import { Modal, Button } from 'react-bootstrap';

const Hostels = () => {
  const { activeBoysHostel, setActiveBoysHostel, activeBoysHostelButtons, setActiveBoysHostelButtons } = useData();
  const [isEditing, setIsEditing] = useState(null);
  const [hostels, setHostels] = useState({ boys: [], girls: [] });
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [hostelToDelete, setHostelToDelete] = useState(null);

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

  const submitHostelEdit = (e) => {
    e.preventDefault();
    const { id, name, originalName, address, isBoys } = isEditing;
    const basePath = `Hostel/${isBoys ? 'boys' : 'girls'}`;

    if (name !== originalName) {
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

  const deleteHostel = (isBoys, id) => {
    setIsDeleteConfirmationOpen(true);
    setHostelToDelete({ isBoys, id });
  };

  const confirmDeleteHostel = () => {
    const { isBoys, id } = hostelToDelete;
    const path = `Hostel/${isBoys ? 'boys' : 'girls'}/${id}`;
    remove(ref(database, path))
      .then(() => {
        toast.success("Hostel deleted successfully.", {
          position: "top-center",
          autoClose: 3000,
        });
        setIsDeleteConfirmationOpen(false);
        setHostelToDelete(null);
      })
      .catch(error => {
        toast.error("Failed to delete hostel: " + error.message, {
          position: "top-center",
          autoClose: 3000,
        });
      });
  };

  const cancelDeleteHostel = () => {
    setIsDeleteConfirmationOpen(false);
    setHostelToDelete(null);
  };

  const cancelEdit = () => {
    setIsEditing(null);
  };

  const startEdit = (id, name, address, isBoys) => {
    setIsEditing({ id, name, originalName: name, address, isBoys });
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
          <th>Delete Data</th>
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
              </td>
              <td>
                <button onClick={() => deleteHostel(isBoys, id)} className="action-btn">Delete</button>
              </td>
            </tr>
          )
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      <h2>Hostels</h2>
      <div className="hostels-container">
        <div className="hostel-section">
          <h3>Boys Hostels</h3>
          {renderHostelTable(hostels.boys, true)}
        </div>
        <div className="hostel-section">
          <h3>Girls Hostels</h3>
          {renderHostelTable(hostels.girls, false)}
        </div>
      </div>
      <Modal show={isEditing !== null} onHide={cancelEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Hostel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isEditing && (
            <div>
              <p>Edit Name:</p>
              <input
                type="text"
                value={isEditing.name}
                onChange={(e) => handleEditChange('name', e.target.value)}
                className="edit-hostel-input"
              />
              <p>Edit Address:</p>
              <input
                type="text"
                value={isEditing.address}
                onChange={(e) => handleEditChange('address', e.target.value)}
                className="edit-hostel-input"
              />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelEdit}>
            Cancel
          </Button>
          <Button variant="primary" onClick={submitHostelEdit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={isDeleteConfirmationOpen} onHide={cancelDeleteHostel}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this hostel?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDeleteHostel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteHostel}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Hostels;
