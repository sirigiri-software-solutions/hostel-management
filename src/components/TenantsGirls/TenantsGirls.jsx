import React, { useContext, useRef } from 'react'
import TenantsIcon from '../../images/Icons (4).png'
import SearchIcon from '../../images/Icons (9).png'
import Table from '../../Elements/Table'
import ImageIcon from '../../images/Icons (10).png'
import { useState, useEffect } from 'react'
import { database, push, ref, storage } from "../../firebase";
import { DataContext } from '../../ApiData/ContextProvider'
import { FetchData } from '../../ApiData/FetchData'
import { onValue, remove, update } from 'firebase/database'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

const TenantsGirls = () => {

  const { data } = useContext(DataContext);
  const [girlsTenants, setGirlsTenants] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');

  const [selectedRoom, setSelectedRoom] = useState('');
  const [bedOptions, setBedOptions] = useState([]);
  const [selectedBed, setSelectedBed] = useState('');
  const [dateOfJoin, setDateOfJoin] = useState('');
  const [name, setName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [status, setStatus] = useState('occupied');
  const [tenants, setTenants] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState('');
  const [errors, setErrors] = useState({});
  const [tenantImage, setTenantImage] = useState(null);
  const [tenantImageUrl, setTenantImageUrl] = useState('');
  const [tenantId, setTenantId] = useState(null);
  const [tenantIdUrl, setTenantIdUrl] = useState('');
  const imageInputRef = useRef(null);
  const idInputRef = useRef(null);
  const [girlsRoomsData, setGirlsRoomsData]=useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const tenantsRef = ref(database, 'Hostel/girls/tenants');
    onValue(tenantsRef, snapshot => {
      const data = snapshot.val() || {};
      const loadedTenants = Object.entries(data).map(([key, value]) => ({
        id: key,
        ...value,
      }));
      setTenants(loadedTenants);
    });
  }, []);

  useEffect(() => {
    if (selectedRoom) {
      const room = girlsRoomsData.find(room => room.roomNumber === selectedRoom);
      if (room) {
        const options = Array.from({ length: room.numberOfBeds }, (_, i) => i + 1);
        setBedOptions(options);
      }
    } else {
      setBedOptions([]);
    }
  }, [selectedRoom, girlsRoomsData]);

  const validate = () => {
    let tempErrors = {};
    tempErrors.selectedRoom = selectedRoom ? "" : "Room number is required.";
    tempErrors.selectedBed = selectedBed ? "" : "Bed number is required.";
    tempErrors.dateOfJoin = dateOfJoin ? "" : "Date of join is required.";
    tempErrors.name = name ? "" : "Name is required.";
    // Validate mobile number
    if (!mobileNo) {
      tempErrors.mobileNo = "Mobile number is required.";
    } else if (!/^\d{10,15}$/.test(mobileNo)) {
      tempErrors.mobileNo = "Invalid mobile number";
    }
    tempErrors.idNumber = idNumber ? "" : "ID number is required.";
     // Validate emergency contact
     if (!emergencyContact) {
      tempErrors.emergencyContact = "Emergency contact is required.";
    } else if (!/^\d{10,15}$/.test(emergencyContact)) {
      tempErrors.emergencyContact = "Invalid emergency contact";
    }

    // Check if the selected bed is already occupied
    const isBedOccupied = tenants.some(tenant => {
      return tenant.roomNo === selectedRoom && tenant.bedNo === selectedBed && tenant.status === "occupied" && tenant.id !== currentId;
    });

    if (isBedOccupied) {
      tempErrors.selectedBed = "This bed is already occupied.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).every((key) => tempErrors[key] === "");
  };

  const handleTenantImageChange = (e) => {
    if (e.target.files[0]) {
      setTenantImage(e.target.files[0]);
    }
  };
  const handleTenantIdChange = (e) => {
    if (e.target.files[0]) {
      setTenantId(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    let imageUrlToUpdate = tenantImageUrl;

    if (tenantImage) {
      const imageRef = storageRef(storage, `Hostel/girls/tenants/images/tenantImage/${tenantImage.name}`);
      try {
        const snapshot = await uploadBytes(imageRef, tenantImage);
        imageUrlToUpdate = await getDownloadURL(snapshot.ref);
      } catch (error) {
        console.error("Error uploading tenant image:", error);

      }
    }

    let idUrlToUpdate = tenantIdUrl;
    if (tenantId) {
      const imageRef = storageRef(storage, `Hostel/girls/tenants/images/tenantId/${tenantId.name}`);
      try {
        const snapshot = await uploadBytes(imageRef, tenantId);
        idUrlToUpdate = await getDownloadURL(snapshot.ref);
      } catch (error) {
        console.error("Error uploading tenant image:", error);
      }
    }



    const tenantData = {
      roomNo: selectedRoom,
      bedNo: selectedBed,
      dateOfJoin,
      name,
      mobileNo,
      idNumber,
      emergencyContact,
      status,
      tenantImageUrl: imageUrlToUpdate,
      tenantIdUrl: idUrlToUpdate,
    };

    if (isEditing) {
      await update(ref(database, `Hostel/girls/tenants/${currentId}`), tenantData);
    } else {
      await push(ref(database, 'Hostel/girls/tenants'), tenantData);
    }
    setShowModal(false);

    resetForm();
    imageInputRef.current.value = "";
    idInputRef.current.value = "";
  };

  const handleEdit = (tenant) => {
    setSelectedRoom(tenant.roomNo);
    setSelectedBed(tenant.bedNo);
    setDateOfJoin(tenant.dateOfJoin);
    setName(tenant.name);
    setMobileNo(tenant.mobileNo);
    setIdNumber(tenant.idNumber);
    setEmergencyContact(tenant.emergencyContact);
    setStatus(tenant.status);
    setIsEditing(true);
    setCurrentId(tenant.id);
    // setTenantImage(tenant.tenantImageUrl);
    setTenantImageUrl(tenant.tenantImageUrl || ''); // Set the current image URL
    setTenantIdUrl(tenant.tenantIdUrl || '');
    imageInputRef.current.value = "";
    idInputRef.current.value = "";
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

  const handleDelete = async (id) => {
    await remove(ref(database, `Hostel/girls/tenants/${id}`));
  };

  const resetForm = () => {
    setSelectedRoom('');
    setSelectedBed('');
    setDateOfJoin('');
    setName('');
    setMobileNo('');
    setIdNumber('');
    setEmergencyContact('');
    setStatus('occupied');
    setIsEditing(false);
    setCurrentId('');
    setErrors({});
    setTenantImage(null);
    setTenantId(null);
    setTenantImageUrl('');
    setTenantIdUrl('');
  };





  // ==================================

  // const [formData, setFormData] = useState({
  //   number: '',
  //   rent: '',
  //   rooms: '',
  //   status: ''
  // });

  // const [formErrors, setFormErrors] = useState({
  //   number: '',
  //   rent: '',
  //   rooms: '',
  //   status: ''
  // });

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        if (data) {
          const girlsTenantsData = Object.values(data.girls.tenants);
          setGirlsTenants(girlsTenantsData);

        } else {
          const apiData = await FetchData();
          const girlsTenantsData = Object.values(apiData.girls.tenants);
          setGirlsTenants(girlsTenantsData);
        }
      } catch (error) {
        console.error('Error fetching tenants data:', error);
      }
    };

    fetchDataFromAPI();
  }, [data]);
  
  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        if (data) {
          const girlsRoomsData = Object.values(data.girls.rooms);
          setGirlsRoomsData(girlsRoomsData);

        } else {
          const apiData = await FetchData();
          const girlsRoomsData = Object.values(apiData.girls.rooms);
          setGirlsRoomsData(girlsRoomsData);
        }
      } catch (error) {
        console.error('Error fetching tenants data:', error);
      }
    };

    fetchDataFromAPI();
  }, [data]);

  
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

  //   // If form is valid, proceed with submission
  //   if (formIsValid) {
  //     // console.log('Form submitted successfully:', formData);
  //     const newData = {
  //       number: formData.number,
  //       rent: formData.rent,
  //       rooms: formData.rooms,
  //       status: formData.status
  //     };

  //     // Push the new data to the 'beds' node
  //     push(ref(database, 'beds'), newData)
  //       .then(() => {
  //         // Data successfully stored in Firebase
  //         // console.log('Data successfully stored in Firebase');
  //         // Clear the form after submission if needed
  //         setFormData({
  //           number: '',
  //           rent: '',
  //           rooms: '',
  //           status: ''
  //         });
  //       })
  //       .catch((error) => {
  //         // Handle errors
  //         // console.error('Error storing data in Firebase: ', error.message);
  //       });
  //   } else {
  //     // Set errors for form validation
  //     setFormErrors(errors);
  //   }
  // };


  const columns = [
    'S. No',
    'Image',
    'Name',
    'ID',
    'Mobile No',
    'Room/Bed No',
    'Joining Date',
    'Status',
    'actions'
  ]

  const rows = tenants.map((tenant, index) => ({
    s_no: index + 1,
    image: tenant.tenantImageUrl,
    name: tenant.name, // Assuming 'name' property exists in the fetched data
    id: tenant.idNumber, // Assuming 'id' property exists in the fetched data
    mobile_no: tenant.mobileNo, // Assuming 'mobile_no' property exists in the fetched data
    room_bed_no: `${tenant.roomNo}/${tenant.bedNo}`, // Assuming 'room_bed_no' property exists in the fetched data
    joining_date: tenant.dateOfJoin, // Assuming 'payment_date' property exists in the fetched data
    status:tenant.status,
    actions: <button
      style={{ backgroundColor: '#ff8a00', padding:'4px', borderRadius: '5px', color: 'white', border: 'none', }}
      onClick={() => handleEdit(tenant)}
      data-bs-toggle="modal"
      data-bs-target="#exampleModalTenantsGirls"
    >
      Edit
    </button>,
  }));

 

  const onChangeInput = (e) => {
    setSearchQuery(e.target.value);
  }

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
            <img src={TenantsIcon} alt="RoomsIcon" className='roomlogo' />
          </div>
          <h1 className='fs-5'>Rooms Management</h1>
        </div>
        <div className="col-6 col-md-4 search-wrapper">
          <input type="text" placeholder='Search' className='search-input' value={searchQuery} onChange={onChangeInput} />
          <img src={SearchIcon} alt="search-icon" className='search-icon' />
        </div>
        <div className="col-6 col-md-4 d-flex justify-content-end">
          <button type="button" class="add-button" data-bs-toggle="modal" onClick={handleAddNew} data-bs-target="#exampleModalTenantsGirls">
            Add Rooms
          </button>
        </div>
      </div>

      <div>
        <Table columns={columns} rows={filteredRows} />
      </div>

      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} id="exampleModalTenantsGirls" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden={!showModal}>
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Create Tenants</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div className="container-fluid">
                {/* <form className="row g-3" onSubmit={handleSubmit}>
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
              </form> */}
                <form onSubmit={handleSubmit}>
                  <div>
                    <label>
                      Room No:
                      <select value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)}>
                        <option value="">Select a Room</option>
                        {girlsRoomsData.map((room) => (
                          <option key={room.roomNumber} value={room.roomNumber}>
                            {room.roomNumber}
                          </option>
                        ))}
                      </select>
                    </label>
                    {errors.selectedRoom && <p style={{ color: 'red' }}>{errors.selectedRoom}</p>}
                  </div><br />
                  <div>
                    <label>
                      Bed No:
                      <select value={selectedBed} onChange={(e) => setSelectedBed(e.target.value)}>
                        <option value="">Select a Bed</option>
                        {bedOptions.map(bedNumber => (
                          <option key={bedNumber} value={bedNumber}>
                            {bedNumber}
                          </option>
                        ))}
                      </select>
                    </label>
                    {errors.selectedBed && <p style={{ color: 'red' }}>{errors.selectedBed}</p>}
                  </div><br />
                  <div>
                    <label>
                      Date of Join:
                      <input type="date" value={dateOfJoin} onChange={(e) => setDateOfJoin(e.target.value)} />
                    </label>
                    {errors.dateOfJoin && <p style={{ color: 'red' }}>{errors.dateOfJoin}</p>}
                  </div><br />
                  <div>
                    <label>
                      Name:
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </label>
                    {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                  </div><br />
                  <div>
                    <label>
                      Mobile No:
                      <input type="text" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} />
                    </label>
                    {errors.mobileNo && <p style={{ color: 'red' }}>{errors.mobileNo}</p>}
                  </div><br />
                  <div>
                    <label>
                      ID Number:
                      <input type="text" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} />
                    </label>
                    {errors.idNumber && <p style={{ color: 'red' }}>{errors.idNumber}</p>}
                  </div><br />
                  <div>
                    <label>
                      Emergency Contact:
                      <input type="text" value={emergencyContact} onChange={(e) => setEmergencyContact(e.target.value)} />
                    </label>
                    {errors.emergencyContact && <p style={{ color: 'red' }}>{errors.emergencyContact}</p>}
                  </div><br />
                  <div>
                    <label>
                      Status:
                      <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="occupied">Occupied</option>
                        <option value="unoccupied">Unoccupied</option>
                      </select>
                    </label>
                  </div><br />
                  <div>
                    <label>
                      Upload Image:
                      {isEditing && tenantImageUrl && (
                        <div>
                          <img src={tenantImageUrl} alt="Current Tenant" style={{ width: "100px", height: "100px" }} />
                          <p>Current Image</p>
                        </div>
                      )}
                      <input type="file" onChange={handleTenantImageChange} ref={imageInputRef} />
                    </label>
                  </div><br />
                  <div>
                    <label>
                      Upload Id:
                      {isEditing && tenantIdUrl && (
                        <div>
                          <img src={tenantIdUrl} alt="Current Tenant" style={{ width: "100px", height: "100px" }} />
                          <p>Current Id</p>
                        </div>
                      )}
                      <input type="file" onChange={handleTenantIdChange} ref={idInputRef} />
                    </label>
                  </div>
                  <div>
                    {isEditing ? (
                      <button type="button" className="btn btn-warning" onClick={handleSubmit}>Update Tenant</button>
                    ) : (
                      <button type="submit" className="btn btn-warning">Add Tenant</button>
                    )}
                  </div>
                </form>

              </div>
            </div>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default TenantsGirls
