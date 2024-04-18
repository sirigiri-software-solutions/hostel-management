import React, { useContext, useEffect, useState } from 'react';
import RoomsIcon from '../../images/Icons (2).png';
import SearchIcon from '../../images/Icons (9).png';
import './RoomsGirls.css';
import Table from '../../Elements/Table';
import { database, push, ref } from "../../firebase";
import { DataContext } from '../../ApiData/ContextProvider';
import { onValue, remove, update } from 'firebase/database';

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
      });
      setIsEditing(false); // Reset editing state
    } else {
      const roomsRef = ref(database, 'Hostel/girls/rooms');
      push(roomsRef, {
        floorNumber,
        roomNumber,
        numberOfBeds,
        bedRent,
        createdBy,
        updateDate: now
      });
    }
    // Close the modal
    setShowModal(false);
    // Reset form
    setFloorNumber('');
    setRoomNumber('');
    setNumberOfBeds('');
    setBedRent('');
    setCurrentId('');
    setUpdateDate(now); // Update state with current date-time
    setErrors({}); // Clear errors
  };

  const handleDelete = (id) => {
    const roomRef = ref(database, `Hostel/girls/rooms/${id}`);
    remove(roomRef);
  };

  const handleEdit = (room) => {
    setFloorNumber(room.floorNumber);
    setRoomNumber(room.roomNumber);
    setNumberOfBeds(room.numberOfBeds);
    setBedRent(room.bedRent || '');
    setIsEditing(true);
    setCurrentId(room.id);
     // Open the modal
     setShowModal(true);
  };

  
  const handleAddNew = () => {
    // Reset any previous data
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




  //==========================================
  let roomsData = []
  const { data } = useContext(DataContext);
  const [searchQuery, setSearchQuery] = useState("")

  // console.log(data && data, "ApiData")

  if (data !== null) {
    const RoomsBoysData = data.girls.rooms
    // console.log(RoomsBoysData, "RoomsBoys")

    roomsData = Object.values(RoomsBoysData)
    // console.log(roomsData)
  }


  //=================================================
  // const [formData, setFormData] = useState({
  //   number: '',
  //   rent: '',
  //   rooms: '',
  //   status: '',
  //   role: ''
  // });

  // const [formErrors, setFormErrors] = useState({
  //   number: '',
  //   rent: '',
  //   rooms: '',
  //   status: '',
  //   role: ''
  // });

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value
  //   });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   let errors = {};
  //   let formIsValid = true;

  //   // Basic validation for required fields
  //   if (!formData.number) {
  //     errors.number = 'Number is required';
  //     formIsValid = false;
  //   }

  //   if (!formData.rent) {
  //     errors.rent = 'Rent is required';
  //     formIsValid = false;
  //   }

  //   if (!formData.rooms) {
  //     errors.rooms = 'Rooms is required';
  //     formIsValid = false;
  //   }

  //   if (!formData.status) {
  //     errors.status = 'Status is required';
  //     formIsValid = false;
  //   }

  //   if (!formData.role) {
  //     errors.role = 'Role is required';
  //     formIsValid = false;
  //   }

  //   // If form is valid, proceed with submission
  //   if (formIsValid) {
  //     const newData = {
  //       number: formData.number,
  //       rent: formData.rent,
  //       rooms: formData.rooms,
  //       status: formData.status,
  //       role: formData.role // Assuming role corresponds to createdBy
  //     };

  //     // Push the new data to the 'beds' node
  //     push(ref(database, 'beds'), newData)
  //       .then(() => {
  //         // Clear the form after submission if needed
  //         setFormData({
  //           number: '',
  //           rent: '',
  //           rooms: '',
  //           status: '',
  //           role: ''
  //         });
  //       })
  //       .catch((error) => {
  //         // Handle errors
  //         console.error('Error storing data in Firebase: ', error.message);
  //       });
  //   } else {
  //     // Set errors for form validation
  //     setFormErrors(errors);
  //   }
  // };

  const columns = [
    'S. No',
    'Room.No',
    'Floor',
    'Remarks',
    'Created By',
    'Last Updated date',
    'Edit'
  ];

  
  useEffect(() => {
    // if (data !== null) {
      const rows = rooms.map((room, index) => ({
        s_no: index + 1,
        room_no: room.roomNumber,
        floor: `${room.floorNumber}`,
        remarks: room.numberOfBeds,
        created_by: room.createdBy,
        last_updated_by: room.updateDate,
        edit_room: <button
          style={{ backgroundColor: '#ff8a00', padding:'4px', borderRadius: '5px', color: 'white', border: 'none',  }}
          onClick={() => handleEdit(room)}
          data-bs-toggle="modal"
          data-bs-target="#exampleModalGirls"
        >
          Edit
        </button>
      }));
      setInitialRows(rows);
    // }
  }, [rooms]);


  // const rows = Object.keys(roomsData).map(index => {
  //   const data = roomsData[index];
  //   return {
  //     s_no: parseInt(index) + 1, // Adding 1 to index to make it 1-based
  //     room_no: data.roomNumber,
  //     floor: `${data.floorNumber}st`, // Assuming you want to concatenate "st"
  //     remarks: data.numberOfBeds,
  //     created_by: data.createdBy,
  //     last_updated_by: data.updateDate,
  //     edit: {
  //       icon: false,
  //       variant: { color: '#ff8a00', radius: '10px' },
  //       text: 'Edit'
  //     }
  //   };
  // });

  // console.log(rows);
  const [searchTerm, setSearchTerm] = useState('');
  const [initialRows, setInitialRows] = useState([]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredRows = initialRows.filter(row => {
    return Object.values(row).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  const onChangeInput = (e) => {
    setSearchQuery(e.target.value)
  }

  return (
    <div className='h-100'>
      <div className="row d-flex align-items-center justify-content-between">
        <div className="col-md-4 d-flex align-items-center mr-5 image-section">
          <div className='roomlogo-container'>
            <img src={RoomsIcon} alt="RoomsIcon" className='roomlogo' />
          </div>
          <h1 className='fs-5'>Rooms Management</h1>
        </div>
        <div className="col-6 col-md-4 search-wrapper">
          <input type="text" placeholder='Search' className='search-input' value={searchTerm} onChange={handleChange} />
          <img src={SearchIcon} alt="search-icon" className='search-icon' />
        </div>
        <div className="col-6 col-md-4 d-flex justify-content-end">
          <button type="button" className="add-button" data-bs-toggle="modal"  onClick={handleAddNew} data-bs-target="#exampleModalGirls">
            Add Rooms
          </button>
        </div>
      </div>

      <Table columns={columns} rows={filteredRows} />

      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} id="exampleModalGirls" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden={!showModal}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Create Rooms</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <form className="row g-3" onSubmit={handleSubmit}>
                  <div className="col-md-6">
                    <label htmlFor="inputNumber" className="form-label">Floor Number</label>
                    <input type="number" className="form-control" id="inputNumber" name="number" value={floorNumber} onChange={(e) => setFloorNumber(e.target.value)} />
                    {/* {formErrors.number && <div className="text-danger">{formErrors.number}</div>} */}
                    {errors.floorNumber && <div style={{ color: 'red' }}>{errors.floorNumber}</div>}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputRent" className="form-label">Room Number</label>
                    <input type="number" className="form-control" id="inputRent" name="rent" value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} />
                    {/* {formErrors.rent && <div className="text-danger">{formErrors.rent}</div>} */}
                    {errors.roomNumber && <div style={{ color: 'red' }}>{errors.roomNumber}</div>}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputRooms" className="form-label">Number of Beds</label>
                    <input type="number" className="form-control" id="inputRooms" name="rooms" value={numberOfBeds} onChange={(e) => setNumberOfBeds(e.target.value)} />
                    {/* {formErrors.rooms && <div className="text-danger">{formErrors.rooms}</div>} */}
                    {errors.numberOfBeds && <div style={{ color: 'red' }}>{errors.numberOfBeds}</div>}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputStatus" className="form-label">Bed Rent</label>
                    <input type="text" className="form-control" id="inputStatus" name="status" value={bedRent} onChange={(e) => setBedRent(e.target.value)} />
                    {/* {formErrors.status && <div className="text-danger">{formErrors.status}</div>} */}
                    {errors.bedRent && <div style={{ color: 'red' }}>{errors.bedRent}</div>}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputRole" className="form-label">Created By</label>
                    <select className="form-select" id="inputRole" name="role" value={createdBy} onChange={(e) => setCreatedBy(e.target.value)}>

                      <option value="admin">Admin</option>
                      <option value="sub-admin">Sub-admin</option>
                    </select>
                    {/* {formErrors.role && <div className="text-danger">{formErrors.role}</div>} */}
                  </div>

                  <div className="col-12 text-center">
                    {isEditing && <p>Last Updated: {updateDate || 'N/A'}</p>}
                    {isEditing ? (
                      <button type="button" className="btn btn-warning" onClick={handleSubmit}>Update</button>
                    ) : (
                      <button type="submit" className="btn btn-warning" onClick={handleSubmit}>Submit</button>
                    )}
                    {/* <button type="submit" className="btn btn-warning">Create</button> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomsGirls;
