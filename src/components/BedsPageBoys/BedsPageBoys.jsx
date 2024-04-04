import React, {useState} from 'react'
import bedIcon from '../../images/Icons (3).png'
import Table from '../../Elements/Table'
import SearchIcon from '../../images/Icons (9).png'
//import CreateBedsBoys from './CreateBedsBoys'
import { database, push, ref } from "../../firebase"; 

const BedsPageBoys = () => {
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
    'Bed Number',
    'Room. No',
    'Floor',
    'Rent',
    'Last Updated date',
    'Status'
  ]

  const rows = [
    {
      s_no : 1,
      bed_number : 2,
      room_no : 125,
      floor: "1st",
      rent: "Rs. 5000",
      last_updated_by: "21 Aug 2021",
      edit: {
        icon: false,
        variant: {color:'#166919', radius:'10px'},
        text: 'Occupied'
      }
    },
    {
      s_no : 1,
      bed_number : 2,
      room_no : 125,
      floor: "1st",
      rent: "Rs. 5000",
      last_updated_by: "21 Aug 2021",
      edit: {
        icon: false,
        variant: {color:'#166919', radius:'10px'},
        text: 'Occupied'
      }
    },
    {
      s_no : 1,
      bed_number : 2,
      room_no : 125,
      floor: "1st",
      rent: "Rs. 5000",
      last_updated_by: "21 Aug 2021",
      edit: {
        icon: false,
        variant: {color:'#166919', radius:'10px'},
        text: 'Occupied'
      }
    },
    {
      s_no : 1,
      bed_number : 2,
      room_no : 125,
      floor: "1st",
      rent: "Rs. 5000",
      last_updated_by: "21 Aug 2021",
      edit: {
        icon: false,
        variant: {color:'#166919', radius:'10px'},
        text: 'Occupied'
      }
    },
    {
      s_no : 1,
      bed_number : 2,
      room_no : 125,
      floor: "1st",
      rent: "Rs. 5000",
      last_updated_by: "21 Aug 2021",
      edit: {
        icon: false,
        variant: {color:'grey', radius:'10px'},
        text: 'Unoccupied'
      }
    },
  ]

  // const [showCreateBedsBoys, setShowCreateBedsBoys] = useState(false);

  // const toggleCreateBedsBoys = () => {
  //   setShowCreateBedsBoys(!showCreateBedsBoys)
  // }

  return (
    <div className='h-100'>
      
    <>
    <div className="row d-flex align-items-center justify-content-between">
      <div className="col-12 col-md-4 d-flex align-items-center mr-5">
        <div className='roomlogo-container'>
          <img src={bedIcon} alt="RoomsIcon" className='roomlogo'/>
        </div>
        <h1 className='fs-5'>Beds Management</h1>
      </div>
      <div className="col-6 col-md-4 search-wrapper">
        <input type="text" placeholder='Search' className='search-input'/>
        <img src={SearchIcon} alt="search-icon" className='search-icon'/>
      </div>
      <div className="col-6 col-md-4 d-flex justify-content-end">
        <button type="button" class="add-button" data-bs-toggle="modal" data-bs-target="#exampleModalBedsBoys">
          Add Beds
        </button>
      </div>
    </div>
    <div>   
        <Table columns={columns} rows={rows}/>
    </div>
    <div className='d-flex justify-content-end mt-2'>
        <span className='btn btn-outline-dark m-1'>1</span>
        <span className='btn btn-outline-dark m-1'>2</span>
        <span className='btn btn-outline-dark m-1'>...</span>
        <span className='btn btn-outline-dark m-1'>10</span>
    </div>

    <div class="modal fade" id="exampleModalBedsBoys" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
    </div>
  )
}

export default BedsPageBoys