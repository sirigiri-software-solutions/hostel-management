import React, { useContext, useState,useEffect } from 'react';
import RoomsIcon from '../../images/Icons (2).png';
import SearchIcon from '../../images/Icons (9).png';
import './RoomsBoys.css';
import Table from '../../Elements/Table';
import { database, push, ref } from "../../firebase"; 
import {DataContext} from "../../ApiData/ContextProvider"

const RoomsBoys = () => {
  let roomsData = []
  const {data} = useContext(DataContext);

  console.log(data && data, "ApiData")

  if(data !== null){
  const RoomsBoysData = data.boys.rooms
  console.log(RoomsBoysData, "RoomsBoys")

  roomsData = Object.values(RoomsBoysData)
    console.log(roomsData)
  }

  const [formData, setFormData] = useState({
    number: '',
    rent: '',
    rooms: '',
    status: ''
  });
  
  const [formErrors, setFormErrors] = useState({
    number: '',
    rent: '',
    rooms: '',
    status: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    let formIsValid = true;

    // Basic validation for required fields
    if (!formData.number) {
      errors.number = 'Number is required';
      formIsValid = false;
    }

    if (!formData.rent) {
      errors.rent = 'Rent is required';
      formIsValid = false;
    }

    if (!formData.rooms) {
      errors.rooms = 'Rooms is required';
      formIsValid = false;
    }

    if (!formData.status) {
      errors.status = 'Status is required';
      formIsValid = false;
    }

    // If form is valid, proceed with submission
    if (formIsValid) {
      // console.log('Form submitted successfully:', formData);
      const newData = {
        number: formData.number,
        rent: formData.rent,
        rooms: formData.rooms,
        status: formData.status
      };

      // Push the new data to the 'beds' node
      push(ref(database, 'beds'), newData)
        .then(() => {
          // Data successfully stored in Firebase
          // console.log('Data successfully stored in Firebase');
          // Clear the form after submission if needed
          setFormData({
            number: '',
            rent: '',
            rooms: '',
            status: ''
          });
        })
        .catch((error) => {
          // Handle errors
          // console.error('Error storing data in Firebase: ', error.message);
        });
    } else {
      // Set errors for form validation
      setFormErrors(errors);
    }
  };

  const columns = [
    'S. No',
    'Room.No',
    'Floor',
    'Remarks',
    'Created By',
    'Last Updated date',
    'Edit'
  ]

  // const rows = Object.keys(roomsData).map(index => {
  //   const data = roomsData[index];
  //   return {
  //     s_no: parseInt(index) + 1, // Adding 1 to index to make it 1-based
  //     room_no: data.roomNumber,
  //     floor: `${data.floorNumber}st`, // Assuming you want to concatenate "st"
  //     remarks: "Two Sharing",
  //     created_by: data.createdBy,
  //     last_updated_by: "13-03-2015",
  //     edit: {
  //       icon: false,
  //       variant: { color: '#ff8a00', radius: '10px' },
  //       text: 'Edit'
  //     }
  //   };
  // });
  
  // console.log(rows);
  useEffect(() => {
    if(data !== null){
      const roomsData = Object.values(data.boys.rooms);
      const rows = roomsData.map((data, index) => ({
        s_no: index + 1,
        room_no: data.roomNumber,
        floor: `${data.floorNumber}st`,
        remarks: "Two Sharing",
        created_by: data.createdBy,
        last_updated_by: "11-03-2015",
        edit: {
          icon: false,
          variant: { color: '#ff8a00', radius: '10px' },
          text: 'Edit'
        }
      }));
      setInitialRows(rows);
    }
  }, [data]);

  // const rows = [
  //   {
  //     s_no : 1,
  //     room_no : 125,
  //     floor : "1st",
  //     remarks: "Two Sharing",
  //     created_by: "Admin",
  //     last_updated_by: "13-03-2015",
  //     edit: {
  //       icon: false,
  //       variant: {color:'#ff8a00', radius:'10px'},
  //       text: 'Edit'
  //     }
  //   },
  // ]

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

  return (
        <div className='row'>
          <div className="row d-flex flex-wrap align-items-center justify-content-between">
            <div className="col-12 col-md-5 desktop-layout align-items-center mr-5">
              <div className='roomlogo-container'>
                <img src={RoomsIcon} alt="RoomsIcon" className='roomlogo'/>
              </div>
              <h1 className='fs-5'>Rooms Management</h1>
            </div>
            <div className="col-6 col-md-4 desktop-layout search-wrapper">
              <input type="text" placeholder='Search' className='search-input' onChange={handleChange} value={searchTerm}/>
              <img src={SearchIcon} alt="search-icon" className='search-icon'/>
            </div>
            <div className="col-6 col-md-3 desktop-layout justify-content-end">
              <button type="button" class="add-button" data-bs-toggle="modal" data-bs-target="#exampleModalRoomsBoys">
                Add Rooms
              </button>
            </div>
            <div className='mobile-layout !sticky-top'>
              <div className="d-flex align-items-center justify-content-between mr-5">
                <div className='d-flex flex-column gap-2 !align-items-start'>
                  <div className='roomlogo-container w-sm-[75px]'>
                    <img src={RoomsIcon} alt="RoomsIcon" className='roomlogo'/>
                  </div>
                  <h1 className='fs-5'>Rooms Management</h1>
                </div>
                <div className='d-flex flex-column gap-2 align-items-center'>
                  <div className="search-wrapper">
                    <input type="text" placeholder='Search' className='search-input'/>
                    <img src={SearchIcon} alt="search-icon" className='search-icon'/>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button type="button" class="add-button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                      Add Rooms
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>   
              <Table columns={columns} rows={filteredRows}/>
          </div>

          <div className="modal fade" id="exampleModalRoomsBoys" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                        <input type="number" className="form-control" id="inputNumber" name="number" value={formData.number} onChange={handleInputChange} />
                        {formErrors.number && <div className="text-danger">{formErrors.number}</div>}
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="inputRent" className="form-label">Room Number</label>
                        <input type="number" className="form-control" id="inputRent" name="rent" value={formData.rent} onChange={handleInputChange} />
                        {formErrors.rent && <div className="text-danger">{formErrors.rent}</div>}
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="inputRooms" className="form-label">Number of Beds</label>
                        <input type="number" className="form-control" id="inputRooms" name="rooms" value={formData.rooms} onChange={handleInputChange} />
                        {formErrors.rooms && <div className="text-danger">{formErrors.rooms}</div>}
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="inputStatus" className="form-label">Bed Rent</label>
                        <input type="text" className="form-control" id="inputStatus" name="status" value={formData.status} onChange={handleInputChange} />
                        {formErrors.status && <div className="text-danger">{formErrors.status}</div>}
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="inputRole" className="form-label">Created By</label>
                        <select className="form-select" id="inputRole" name="role" value={formData.role} onChange={handleInputChange}>
                          <option value="">Select Role</option>
                          <option value="admin">Admin</option>
                          <option value="sub-admin">Sub-admin</option>
                        </select>
                        {formErrors.role && <div className="text-danger">{formErrors.role}</div>}
                      </div>
                      <div className="col-12 text-center">
                        <button type="submit" className="btn btn-warning">Create</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default RoomsBoys