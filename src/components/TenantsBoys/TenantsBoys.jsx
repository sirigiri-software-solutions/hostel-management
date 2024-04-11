import React, { useEffect } from 'react'
import TenantsIcon from '../../images/Icons (4).png'
import SearchIcon from '../../images/Icons (9).png'
import Table from '../../Elements/Table'
import ImageIcon from '../../images/Icons (10).png'
import { useState,useContext } from 'react'
import { database, push, ref } from "../../firebase";
import './TenantsBoys.css';
import { DataContext } from '../../ApiData/ContextProvider'
import { FetchData } from '../../ApiData/FetchData'
 
const TenantsBoys = () => {
 
  const { data } = useContext(DataContext);


  const [boysTenants, setBoysTenants] = useState([]);
  
  const [searchQuery, setSearchQuery] = useState('');
 
 
  // let boysTenants = null;
  if(data!=null && data){
   
    // console.log(boysTenants);
  console.log(data && data,"fetchApidata")
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
  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        if (data) {
          const boysTenantsData = Object.values(data.boys.tenants);
          setBoysTenants(boysTenantsData);
          
        } else {
          const apiData = await FetchData();
          const boysTenantsData = Object.values(apiData.boys.tenants);
          setBoysTenants(boysTenantsData);
          
        }
      } catch (error) {
        console.error('Error fetching tenants data:', error);
      }
    };
 
    fetchDataFromAPI();
  }, [data]);
 
 
    // Filter tenants based on search query
   
    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value)
     
    };
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
      'Image',
      'Name',
      'ID',
      'Mobile No',
      'Room/Bed No',
      'Joining Date',
      'Status'
    ]
   
 
   
     const rows = boysTenants.map((tenant, index) => ({
      s_no: index + 1,
      image: tenant.tenantImageUrl,
      name: tenant.name, // Assuming 'name' property exists in the fetched data
      id: tenant.idNumber, // Assuming 'id' property exists in the fetched data
      mobile_no: tenant.mobileNo, // Assuming 'mobile_no' property exists in the fetched data
      room_bed_no: `${tenant.roomNo}/${tenant.bedNo}`, // Assuming 'room_bed_no' property exists in the fetched data
      joining_date: tenant.dateOfJoin, // Assuming 'payment_date' property exists in the fetched data
      edit: {
        icon: false,
        variant: { color: '#ff8a00', radius: '10px' },
        text: 'More'
      }
    }));


    const filteredRows = rows.filter(row => {
      return Object.values(row).some(value =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  
 
 
  return (
    <>
      <div className="row d-flex flex-wrap align-items-center justify-content-between">
        <div className="col-12 col-md-4 d-flex align-items-center mr-5">
          <div className='roomlogo-container'>
            <img src={TenantsIcon} alt="RoomsIcon" className='roomlogo'/>
          </div>
          <h1 className='fs-5'>Tenants Management</h1>
        </div>
        <div className="col-6 col-md-4 search-wrapper">
          <input
            type="text"
            placeholder='Search'
            className='search-input'
            value={searchQuery}
            onChange={handleSearchChange} // Handle search input change
          />
          <img
            src={SearchIcon}
            alt="search-icon"
            className='search-icon'
             
            />      
        </div>
        <div className="col-6 col-md-4 d-flex justify-content-end">
          <button type="button" class="add-button" data-bs-toggle="modal" data-bs-target="#exampleModalTenantsBoys">
            Add Tenants
          </button>
        </div>
      </div>
      <div>  
          <Table columns={columns} rows={filteredRows}/>
      </div>
      <div class="modal fade" id="exampleModalTenantsBoys" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
 
export default TenantsBoys;