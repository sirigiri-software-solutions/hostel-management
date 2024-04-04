import React, { useState } from 'react';
import RoomsIcon from '../../images/Icons (2).png';
import SearchIcon from '../../images/Icons (9).png';
import './RoomsBoys.css';
import Table from '../../Elements/Table';
//import Button from '../../Elements/Button';
import { database, push, ref } from "../../firebase"; 
//import CreateRoomsBoys from './CreateRoomsBoys';
//import { AgGridReact } from 'ag-grid-react';
//import "ag-grid-community/styles/ag-grid.css";
//import "ag-grid-community/styles/ag-theme-quartz.css";

const RoomsBoys = () => {

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

  // const [columnsData, setColumnsData] = useState([
  //   {field: "sno"},
  //   {field: "roomno"},
  //   {field: "floor"},
  //   {field: "remarks"},
  //   {field: "createdby"},
  //   {field: "lastupdateddate"},
  //   // {field: "edit"},
  // ]);
  // const [rowsData, setRowsData] = useState([
  //   {sno:1, roomno:125, floor: "1st", remarks:"Two Sharing", createdby:"Admin", lastupdateddate:"21 Aug 2021"},
  //   {sno:2, roomno:125, floor: "1st", remarks:"Two Sharing", createdby:"Admin", lastupdateddate:"21 Aug 2021"},
  //   {sno:3, roomno:125, floor: "1st", remarks:"Two Sharing", createdby:"Admin", lastupdateddate:"21 Aug 2021"},

  // ])

  const rows = [
    {
      s_no : 1,
      room_no : 125,
      floor : "1st",
      remarks: "Two Sharing",
      created_by: "Admin",
      last_updated_by: "13-03-2015",
      edit: {
        icon: false,
        variant: {color:'#ff8a00', radius:'10px'},
        text: 'Edit'
      }
    },
    {
      s_no : 2,
      room_no : 125,
      floor : "1st",
      remarks: "Two Sharing",
      created_by: "Admin",
      last_updated_by: "24-12-2012",
      edit: {
        icon: false,
        variant: {color:'#ff8a00', radius:'10px'},
        text: 'Edit'
      }
    },
    {
      s_no : 3,
      room_no : 125,
      floor : "1st",
      remarks: "Two Sharing",
      created_by: "Admin",
      last_updated_by: "12-05-2021",
      edit: {
        icon: false,
        variant: {color:'#ff8a00', radius:'10px'},
        text: 'Edit'
      }
    },
    {
      s_no : 4,
      room_no : 125,
      floor : "1st",
      remarks: "Two Sharing",
      created_by: "Admin",
      last_updated_by: "20-12-2022",
      edit: {
        icon: false,
        variant: {color:'#ff8a00', radius:'10px'},
        text: 'Edit'
      }
    },
    {
      s_no : 5,
      room_no : 125,
      floor : "1st",
      remarks: "Two Sharing",
      created_by: "Admin",
      last_updated_by: "21-02-2021",
      edit: {
        icon: false,
        variant: {color:'#ff8a00', radius:'10px'},
        text: 'Edit'
      }
    },
  ]

  // const [showCreateRoomsBoys, setShowCreateRoomsBoys] = useState(false);
  // const toggleCreateRoomsBoys = () => {
  //   setShowCreateRoomsBoys(!showCreateRoomsBoys);
  // };

  // const handleClick = () => {
  //   console.log("clicked")
  // }

  return (
        <>
          <div className="row d-flex flex-wrap align-items-center justify-content-between">
            <div className="col-12 col-md-4 d-flex align-items-center mr-5">
              <div className='roomlogo-container'>
                <img src={RoomsIcon} alt="RoomsIcon" className='roomlogo'/>
              </div>
              <h1 className='fs-5'>Rooms Management</h1>
            </div>
            <div className="col-6 col-md-4 search-wrapper">
              <input type="text" placeholder='Search' className='search-input'/>
              <img src={SearchIcon} alt="search-icon" className='search-icon'/>
            </div>
            <div className="col-6 col-md-4 d-flex justify-content-end">
              <button type="button" class="add-button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Add Rooms
              </button>
            </div>
          </div>
          <div>   
              <Table columns={columns} rows={rows}/>
          </div>
          <div className='d-flex justify-content-end mt-2'>
              {/* <Button
                onClick={handleClick}
                icon={false}
                variant={{ color: '#ff8a00', radius: '10px', padding: "1px" }}
                text={'0'}
              /> */}
              <span className='btn btn-outline-dark m-1'>1</span>
              <span className='btn btn-outline-dark m-1'>2</span>
              <span className='btn btn-outline-dark m-1'>...</span>
              <span className='btn btn-outline-dark m-1'>10</span>
          </div>

          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div className="container-fluid">
                    <h1 className='text-center mb-2 fs-5'>
                      Create Beds
                    </h1>
                    <form className="row g-3" onSubmit={handleSubmit}>
                      <div className="col-md-6">
                        <label htmlFor="inputNumber" className="form-label">Number</label>
                        <input type="number" className="form-control" id="inputNumber" name="number" value={formData.number} onChange={handleInputChange} />
                        {formErrors.number && <div className="text-danger">{formErrors.number}</div>}
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="inputRent" className="form-label">Rent</label>
                        <input type="number" className="form-control" id="inputRent" name="rent" value={formData.rent} onChange={handleInputChange} />
                        {formErrors.rent && <div className="text-danger">{formErrors.rent}</div>}
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="inputRooms" className="form-label">Select Rooms</label>
                        <input type="number" className="form-control" id="inputRooms" name="rooms" value={formData.rooms} onChange={handleInputChange} />
                        {formErrors.rooms && <div className="text-danger">{formErrors.rooms}</div>}
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="inputStatus" className="form-label">Select Status</label>
                        <input type="text" className="form-control" id="inputStatus" name="status" value={formData.status} onChange={handleInputChange} />
                        {formErrors.status && <div className="text-danger">{formErrors.status}</div>}
                      </div>
                      <div className="col-12 text-center">
                        <button type="submit" className="btn btn-warning">Create</button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>
        </>
  )
}

export default RoomsBoys