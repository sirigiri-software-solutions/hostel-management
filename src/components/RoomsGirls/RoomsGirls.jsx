import React, { useContext, useEffect, useState } from 'react';
import RoomsIcon from '../../images/Icons (2).png';
import SearchIcon from '../../images/Icons (9).png';
import './RoomsGirls.css';
import Table from '../../Elements/Table';
import { database, push, ref } from "../../firebase";
import { DataContext } from '../../ApiData/ContextProvider';
import { onValue, remove, update } from 'firebase/database';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const RoomsGirls = () => {

  const [floorNumber, setFloorNumber] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [numberOfBeds, setNumberOfBeds] = useState('');
  const [bedRent, setBedRent] = useState('');
  const [rooms, setRooms] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState('');
  const [createdBy, setCreatedBy] = useState('admin'); // Default to 'admin'
  const [updateDate, setUpdateDate] = useState('');
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      console.log("Triggering")
        if (showModal && event.target.id === "exampleModalGirls") {
            setShowModal(false);
        }
       
    };
    window.addEventListener('click', handleOutsideClick);
    
}, [showModal]);

const handleRoomsIntegerChange = (event) => {
  const { name, value } = event.target;
  // const re = /^[0-9\b]+$/; // Regular expression to allow only numbers

  let sanitizedValue = value;

  if (name === 'floorNumber' || name === 'roomNumber') {
    // Allow alphanumeric characters and hyphens only
    sanitizedValue = value.replace(/[^a-zA-Z0-9-]/g, '');
  } else if (name === 'numberOfBeds' || name === 'bedRent') {
    // Allow numbers only
    sanitizedValue = value.replace(/[^0-9]/g, '');
  }

  // if (value === '' || re.test(sanitizedValue)) {
      switch(name) {
          case 'floorNumber':
              setFloorNumber(sanitizedValue);
              break;
          case 'roomNumber':
              setRoomNumber(sanitizedValue);
              break;
          case 'numberOfBeds':
              setNumberOfBeds(sanitizedValue);
              break;
          case 'bedRent':
              setBedRent(sanitizedValue);
              break;
          default:
              break;
      }
  // }
};


  const handleSubmit = (e) => {
    e.preventDefault();
    const now = new Date().toISOString();  // Get current date-time in ISO format

    // Initialize an object to collect errors
    const newErrors = {};

    // Validation checks
    if (!floorNumber.trim()) newErrors.floorNumber = 'Floor number is required';
    if (!roomNumber.trim()) newErrors.roomNumber = 'Room number is required';
    else if (rooms.some(room => room.roomNumber === roomNumber && room.id !== currentId)) {
      newErrors.roomNumber = 'Room number already exists';
    }
    if (!numberOfBeds) newErrors.numberOfBeds = 'Number of beds is required';
    if (!bedRent) newErrors.bedRent = 'Bed rent is required';

    // Check if there are any errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Prevent form submission if there are errors
    }
    // ---------------------------------------
    if (isEditing) {
      const roomRef = ref(database, `Hostel/girls/rooms/${currentId}`);
      update(roomRef, {
        floorNumber,
        roomNumber,
        numberOfBeds,
        bedRent,
        createdBy,
        updateDate: now
      }).then(() => {
        toast.success("Room updated successfully.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setIsEditing(false); // Reset editing state
      }).catch(error => {
        toast.error("Error updating room: " + error.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    } else {
      const roomsRef = ref(database, 'Hostel/girls/rooms');
      push(roomsRef, {
        floorNumber,
        roomNumber,
        numberOfBeds,
        bedRent,
        createdBy,
        updateDate: now
      }).then(() => {
        toast.success("Room added successfully.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }).catch(error => {
        toast.error("Error adding room: " + error.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    }
    // Close the modal
    setShowModal(false);
    // Reset form
    resetForm();
    // Set update date
    setUpdateDate(now);
    // Clear errors
    setErrors({});
  };
  const [showConfirmationPopUp,setShowConfirmationPopUp] = useState(false);

  const handleDeleteRoom = (id) => {
    // const roomRef = ref(database, `Hostel/girls/rooms/${id}`);
    // remove(roomRef).then(() => {
    //   toast.success("Room deleted successfully.", {
    //     position: "top-center",
    //     autoClose: 2000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    // }).catch(error => {
    //   toast.error("Error deleting room: " + error.message, {
    //     position: "top-center",
    //     autoClose: 2000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    // });
    setShowConfirmationPopUp(true);
    setShowModal(false);
  };

  const confirmDeleteYes = () => {
    const roomRef = ref(database, `Hostel/girls/rooms/${currentId}`);
    remove(roomRef).then(() => {
      toast.success("Room deleted successfully.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }).catch(error => {
      toast.error("Error deleting room: " + error.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
    setShowConfirmationPopUp(false);

  }

  const confirmDeleteNo = () => {
    setShowConfirmationPopUp(false);
  }
  

  const handleEdit = (room) => {
    setFloorNumber(room.floorNumber);
    setRoomNumber(room.roomNumber);
    setNumberOfBeds(room.numberOfBeds);
    setBedRent(room.bedRent || '');
    setIsEditing(true);
    setCurrentId(room.id);
    // Open the modal
    setShowModal(true);
    const formatedDate = formatDate(room.updateDate)
    setUpdateDate(formatedDate);
  };

  const handleAddNew = () => {
    // Reset form and errors
    resetForm();
    // Set modal for a new entry
    setIsEditing(false);
    // Open the modal
    setShowModal(true);
  };

  const resetForm = () => {
    setFloorNumber('');
    setRoomNumber('');
    setNumberOfBeds('');
    setBedRent('');
    setCurrentId('');
    setErrors({});
  };

  useEffect(() => {
    const roomsRef = ref(database, 'Hostel/girls/rooms');
    onValue(roomsRef, (snapshot) => {
      const data = snapshot.val();
      const loadedRooms = [];
      for (const key in data) {
        loadedRooms.push({
          id: key,
          ...data[key]
        });
      }
      setRooms(loadedRooms);
    });
  }, []);

  const columns = [
    'S.No',
    'Room.No',
    'Floor',
    'No.of Beds',
    'Bed Rent',
    'Created By',
    'Last Updated Date',
    'Edit'
  ];

  
  //for date format
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = ('0' + date.getDate()).slice(-2); // Add leading zero if needed
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add leading zero if needed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}




  useEffect(() => {
    const rows = rooms.map((room, index) => ({
      s_no: index + 1,
      room_no: room.roomNumber,
      floor: `${room.floorNumber}`,
      noofBeds: room.numberOfBeds,
      bedRent: room.bedRent,
      created_by: capitalizeFirstLetter(room.createdBy),
      last_updated_by: formatDate(room.updateDate),
      edit_room: <button
        style={{ backgroundColor: '#ff8a00', padding:'4px', borderRadius: '5px', color: 'white', border: 'none' }}
        onClick={() => handleEdit(room)}
      >
        Edit
      </button>
    }));
    setInitialRows(rows);
  }, [rooms]);

  const [searchTerm, setSearchTerm] = useState('');
  const [initialRows, setInitialRows] = useState([]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRows = initialRows.filter(row => {
    return Object.values(row).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const  closePopupModal = () => {
    setShowModal(false);
  }

  return (
    <div className='h-100'>
      <>
      <div className="row d-flex flex-wrap align-items-center justify-content-between">
        <div className="col-12 col-md-4 d-flex align-items-center mr-5 mb-2">
          <div className='roomlogo-container'>
            <img src={RoomsIcon} alt="RoomsIcon" className='roomlogo' />
          </div>
          <h1 className='management-heading'>Rooms Management</h1>
        </div>
        <div className="col-6 col-md-4 search-wrapper">
          <input type="text" placeholder='Search' className='search-input' value={searchTerm} onChange={handleChange} />
          <img src={SearchIcon} alt="search-icon" className='search-icon' />
        </div>
        <div className="col-6 col-md-4 d-flex justify-content-end">
          <button type="button" className="add-button" onClick={handleAddNew}>
            Add Rooms
          </button>
        </div>
      </div>
<div>
      <Table columns={columns} rows={filteredRows} />
      </div>
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} id="exampleModalGirls" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden={!showModal}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Create Rooms</h1>
              <button onClick={closePopupModal} className="btn-close" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <form className="row g-3" onSubmit={handleSubmit}>
                  <div className="col-md-6">
                    <label htmlFor="inputNumber" className="form-label">Floor Number</label>
                    <input type="text" className="form-control" id="inputNumber" name="floorNumber" value={floorNumber} onChange={handleRoomsIntegerChange} />
                    {errors.floorNumber && <div style={{ color: 'red' }}>{errors.floorNumber}</div>}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputRent" className="form-label">Room Number</label>
                    <input type="text" className="form-control" id="inputRent" name="roomNumber" value={roomNumber} onChange={handleRoomsIntegerChange} />
                    {/* {formErrors.rent && <div className="text-danger">{formErrors.rent}</div>} */}
                    {errors.roomNumber && <div style={{ color: 'red' }}>{errors.roomNumber}</div>}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputRooms" className="form-label">Number of Beds</label>
                    <input type="text" className="form-control" id="inputRooms" name="numberOfBeds" value={numberOfBeds} onChange={handleRoomsIntegerChange} />
                    {/* {formErrors.rooms && <div className="text-danger">{formErrors.rooms}</div>} */}
                    {errors.numberOfBeds && <div style={{ color: 'red' }}>{errors.numberOfBeds}</div>}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputStatus" className="form-label">Bed Rent</label>
                    <input type="text" className="form-control" id="inputStatus" name="bedRent" value={bedRent} onChange={handleRoomsIntegerChange} />
                    {/* {formErrors.status && <div className="text-danger">{formErrors.status}</div>} */}
                    {errors.bedRent && <div style={{ color: 'red' }}>{errors.bedRent}</div>}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputRole" className="form-label">Created By</label>
                    <select className="form-select" id="inputRole" name="role" value={createdBy} onChange={(e) => setCreatedBy(e.target.value)}>
                      <option value="admin">Admin</option>
                      <option value="sub-admin">Sub-admin</option>
                    </select>
                  </div>
                  <div className="col-12 text-center">
                    {isEditing && <p>Last Updated: {updateDate || 'N/A'}</p>}
                    {isEditing ? (
                      <>
                      <button type="button" className="btn btn-warning roomUpdateBtn" onClick={handleSubmit}>Update Room</button>
                      <button type="button" className='btn btn-warning' onClick={() => handleDeleteRoom(currentId)}>Delete Room</button>
                      </>
                    ) : (
                      <button type="submit" className="btn btn-warning">Submit</button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showConfirmationPopUp && (
         <div className="confirmation-dialog">
         <div className='confirmation-card'>
         <p style={{paddingBottom:'0px',marginBottom:'7px'}}>Are you sure you want to delete the room with number <span style={{color:'red'}}>{roomNumber}</span> ?</p>
         <p style={{fontSize:'15px',color:'red',textAlign:'center',paddingTop:'0px'}}>Note : Once you delete the room it will not be restored</p>
         <div className="buttons">
           <button onClick={confirmDeleteYes} >Yes</button>
           <button onClick={confirmDeleteNo} >No</button>
         </div>
         </div>
       </div>
      )}
      </>
    </div>
  );
}

export default RoomsGirls;
