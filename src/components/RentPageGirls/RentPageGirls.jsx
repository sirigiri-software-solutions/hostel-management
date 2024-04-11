import React, { useContext } from 'react'
import RentIcon from '../../images/Icons (6).png'
import SearchIcon from '../../images/Icons (9).png'
import Table from '../../Elements/Table'
import { database, push, ref } from "../../firebase"; 
import { useState } from 'react'
import { DataContext } from '../../ApiData/ContextProvider';

const RentPageGirls = () => {
  const {data} = useContext(DataContext);
  // console.log(data && data, 'rentsBoysApi')
  const [searchQuery, setSearchQuery] = useState('');
  let rentsData = [];
 
  if (data !== null && data !== undefined && data.girls && data.girls.tenants) {
    console.log(data,"know data")
    const rentsBoysData = data.girls.tenants;
    // console.log(rentsBoysData,"fetched all data")
    // console.log(Object.values(rentsBoysData),"eachData")
    for(let each of Object.values(rentsBoysData)){
      if(each.rents !== undefined){
      //   rentsData = Object.values(rentsBoysData).map(entry => Object.values(entry.rents))
           rentsData.push(Object.values(each.rents));
      //   console.log(rentsData,"see")
      }
      // console.log(each.rents,"rentsDefined")
    }
   
    
  } else {
    console.error("Data structure mismatch or data is not available:", data);
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


  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
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
    'Person Name',
    'Person Mobile',
    'Bed No',
    'Rent',
    'Due Date',
    'Last Fee',
    'Status'
  ]

  const flatRentsData = rentsData.flat();
  const rows = flatRentsData.map((rentData, index) => {
  
    const tenantInfo = Object.values(data.girls.tenants).find(tenant => tenant.bedNo === rentData.bedNumber);
  
    return {
      s_no: index + 1,
      room_no: rentData.roomNumber,
      person_name: tenantInfo.name ,
      person_mobile: tenantInfo.mobileNo ,
      bed_no: rentData.bedNumber,
      rent: "Rs. " + rentData.totalFee,
      due_date: rentData.dueDate,
      last_fee: rentData.paidDate, 
      edit: {
          icon: false,
          variant: { color: rentData.status === 'Unpaid' ? '#f71313' : '#166919', radius: '10px' },
          text: rentData.status === 'Unpaid' ? 'Unpaid' : 'Paid'
      }
    };
  });

  // const rows = [
  //   {
  //     s_no : 1,
  //     room_no : 125,
  //     person_name : "ABCD",
  //     person_mobile : "+91 9087654321",
  //     bed_no : 2,
  //     rent : "Rs. 5000",
  //     due_date : "21 sep 2021",
  //     last_fee : "21 Aug 2021",
  //     edit: {
  //       icon: false,
  //       variant: {color:'#ff8a00', radius:'10px'},
  //       text: 'Unpaid'
  //     }
  //   },
  //   {
  //     s_no : 2,
  //     room_no : 125,
  //     person_name : "ABCD",
  //     person_mobile : "+91 9087654321",
  //     bed_no : 5,
  //     rent : "Rs. 5000",
  //     due_date : "21 sep 2021",
  //     last_fee : "21 Aug 2021",
  //     edit: {
  //       icon: false,
  //       variant: {color:'#ff8a00', radius:'10px'},
  //       text: 'paid'
  //     }
  //   },
  //   {
  //     s_no : 3,
  //     room_no : 125,
  //     person_name : "ABCD",
  //     person_mobile : "+91 9087654321",
  //     bed_no : 1,
  //     rent : "Rs. 5000",
  //     due_date : "21 sep 2021",
  //     last_fee : "21 Aug 2021",
  //     edit: {
  //       icon: false,
  //       variant: {color:'#ff8a00', radius:'10px'},
  //       text: 'paid'
  //     }
  //   },
  //   {
  //     s_no : 4,
  //     room_no : 125,
  //     person_name : "ABCD",
  //     person_mobile : "+91 9087654321",
  //     bed_no : 4,
  //     rent : "Rs. 5000",
  //     due_date : "21 sep 2021",
  //     last_fee : "21 Aug 2021",
  //     edit: {
  //       icon: false,
  //       variant: {color:'#ff8a00', radius:'10px'},
  //       text: 'paid'
  //     }
  //   },
  //   {
  //     s_no : 5,
  //     room_no : 125,
  //     person_name : "ABCD",
  //     person_mobile : "+91 9087654321",
  //     bed_no : 2,
  //     rent : "Rs. 5000",
  //     due_date : "21 sep 2021",
  //     last_fee : "21 Aug 2021",
  //     edit: {
  //       icon: false,
  //       variant: {color:'#ff8a00', radius:'10px'},
  //       text: 'Unpaid'
  //     }
  //   },
  // ]

  const filteredRows = rows.filter(row => {
    return Object.values(row).some(value =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className='h-100'>

        <>
      <div className="row d-flex align-items-center justify-content-between">
        <div className="col-12 col-md-4 d-flex align-items-center mr-5">
          <div className='roomlogo-container'>
            <img src={RentIcon} alt="RoomsIcon" className='roomlogo'/>
          </div>
          <h1 className='fs-5'>Rents Management</h1>
        </div>
        <div className="col-6 col-md-4 search-wrapper">
          <input type="text" placeholder='Search' className='search-input' value={searchQuery}
              onChange={handleSearch}/>
          <img src={SearchIcon} alt="search-icon" className='search-icon'/>
        </div>
        <div className="col-6 col-md-4 d-flex justify-content-end">
          <button type="button" class="add-button" data-bs-toggle="modal" data-bs-target="#exampleModalRGirls">
            Add Rents
          </button>
        </div>
      </div>

        <div>   
            <Table columns={columns} rows={filteredRows}/>
        </div>

      <div class="modal fade" id="exampleModalRGirls" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Create Rents</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div className="container-fluid">
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

export default RentPageGirls