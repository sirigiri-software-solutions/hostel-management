import React, { useEffect, useRef } from 'react'
import TenantsIcon from '../../images/Icons (4).png'
import SearchIcon from '../../images/Icons (9).png'
import Table from '../../Elements/Table'
import ImageIcon from '../../images/Icons (10).png'
import { useState, useContext } from 'react'
import { database, push, ref, storage } from "../../firebase";
import './TenantsBoys.css';
import { DataContext } from '../../ApiData/ContextProvider'
import { FetchData } from '../../ApiData/FetchData'
import { onValue, remove, update } from 'firebase/database'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

const TenantsBoys = () => {
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
  const [tenantImageUrl, setTenantImageUrl] = useState(''); // For the image URL from Firebase Storage
  const [tenantId, setTenantId] = useState(null);
  const [tenantIdUrl, setTenantIdUrl] = useState('');
  const imageInputRef = useRef(null);
  const idInputRef = useRef(null);
  // const [boysRoomsData, setBoysRoomsData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [boysRooms, setBoysRooms] = useState([]);
  useEffect(() => {
    const roomsRef = ref(database, 'Hostel/boys/rooms');
    onValue(roomsRef, (snapshot) => {
      const data = snapshot.val();
      const loadedRooms = [];
      for (const key in data) {
        loadedRooms.push({
          id: key,
          ...data[key]
        });
      }
      setBoysRooms(loadedRooms);
    });
    // Fetch tenants
  }, []);

  useEffect(() => {
    if (selectedRoom) {
      const room = boysRooms.find(room => room.roomNumber === selectedRoom);
      if (room) {
        const options = Array.from({ length: room.numberOfBeds }, (_, i) => i + 1);
        setBedOptions(options);
      }
    } else {
      setBedOptions([]);
    }
  }, [selectedRoom, boysRooms]);


  // ================================
  const { data } = useContext(DataContext);
  const [boysTenants, setBoysTenants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  // let boysTenants = null;
  if (data != null && data) {

    // console.log(data && data, "fetchApidata")
  }

  useEffect(() => {
    const tenantsRef = ref(database, 'Hostel/boys/tenants');
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

  // useEffect(() => {
  //   const fetchDataFromAPI = async () => {
  //     try {
  //       if (data) {
  //         const boysRoomsData = Object.values(data.boys.rooms);
  //         setBoysRoomsData(boysRoomsData);
  //       } else {
  //         const apiData = await FetchData();
  //         const boysRoomsData = Object.values(apiData.boys.rooms);
  //         setBoysRoomsData(boysRoomsData);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching tenants data:', error);
  //     }
  //   };

  //   fetchDataFromAPI();
  // }, [data]);

  // useEffect(() => {
  //   if (selectedRoom) {
  //     const room = boysRoomsData.find(room => room.roomNumber === selectedRoom);
  //     if (room) {
  //       const options = Array.from({ length: room.numberOfBeds }, (_, i) => i + 1);
  //       setBedOptions(options);
  //     }
  //   } else {
  //     setBedOptions([]);
  //   }
  // }, [selectedRoom, boysRoomsData]);

  const validate = () => {
    let tempErrors = {};
    tempErrors.selectedRoom = selectedRoom ? "" : "Room number is required.";
    tempErrors.selectedBed = selectedBed ? "" : "Bed number is required.";
    tempErrors.dateOfJoin = dateOfJoin ? "" : "Date of join is required.";
    if (!name) {
      tempErrors.name = "Name is required.";
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
      tempErrors.name = "Name must contain only letters and spaces.";
    }
    // Validate mobile number
    if (!mobileNo) {
      tempErrors.mobileNo = "Mobile number is required.";
    } else if (!/^\d{10,13}$/.test(mobileNo)) {
      tempErrors.mobileNo = "Invalid mobile number";
    }
    tempErrors.idNumber = idNumber ? "" : "ID number is required.";
    // Validate emergency contact
    if (!emergencyContact) {
      tempErrors.emergencyContact = "Emergency contact is required.";
    } else if (!/^\d{10,13}$/.test(emergencyContact)) {
      tempErrors.emergencyContact = "Invalid emergency contact";
    }

    // Check if the selected bed is already occupied
    const isBedOccupied = tenants.some(tenant => {
      return tenant.roomNo === selectedRoom && tenant.bedNo === selectedBed && tenant.status === "occupied" && tenant.id !== currentId;
    });

    if (isBedOccupied) {
      tempErrors.selectedBed = "This bed is already occupied.";
    }
    if (!tenantImage && !tenantImageUrl) {
      tempErrors.tenantImage = "Tenant image is required.";
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
      const imageRef = storageRef(storage, `Hostel/boys/tenants/images/tenantImage/${tenantImage.name}`);
      try {
        const snapshot = await uploadBytes(imageRef, tenantImage);
        imageUrlToUpdate = await getDownloadURL(snapshot.ref);
      } catch (error) {
        console.error("Error uploading tenant image:", error);

      }
    }

    let idUrlToUpdate = tenantIdUrl;
    if (tenantId) {
      const imageRef = storageRef(storage, `Hostel/boys/tenants/images/tenantId/${tenantId.name}`);
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
      // tenantIdUrl,
    };

    if (isEditing) {
      await update(ref(database, `Hostel/boys/tenants/${currentId}`), tenantData);
    } else {
      await push(ref(database, 'Hostel/boys/tenants'), tenantData);
    }
    setShowModal(false);

    resetForm();
    setErrors({});
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
    // setTenantImage(tenant.tenantImageUrl ? tenant.tenantImageUrl : null);
    setTenantImageUrl(tenant.tenantImageUrl || ''); // Set the current image URL
    setTenantIdUrl(tenant.tenantIdUrl || '');
    // setTenantId(tenant.tenantIdUrl ? tenant.tenantIdUrl : null);
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
    await remove(ref(database, `Hostel/boys/tenants/${id}`));
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



  // ================================================




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



  // Filter tenants based on search query

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)

  };
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
    joining_date: tenant.dateOfJoin,
    status: tenant.status,
    actions: <button
      style={{ backgroundColor: '#ff8a00', padding: '4px', borderRadius: '5px', color: 'white', border: 'none', }}
      onClick={() => handleEdit(tenant)}
    // data-bs-toggle="modal"
    // data-bs-target="#exampleModalTenantsBoys"
    >
      Edit
    </button>


  }));

  const filteredRows = rows.filter(row => {
    return Object.values(row).some(value =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleClosePopUp = () => {
    setShowModal(false);
  }

  const handleTenantRowClick = (tenant) => {
    // Handle the action when a tenant row is clicked, such as showing a popup
    console.log("Tenant row clicked:", tenant);
  };

  return (
    <>
      <div className="row d-flex flex-wrap align-items-center justify-content-between">
        <div className="col-12 col-md-4 d-flex align-items-center mr-5 mb-2">
          <div className='roomlogo-container'>
            <img src={TenantsIcon} alt="RoomsIcon" className='roomlogo' />
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
          <button type="button" class="add-button" onClick={handleAddNew} >
            Add Tenants
          </button>
        </div>
      </div>
      <div>
        <Table columns={columns} rows={filteredRows} onTenantRowClick={handleTenantRowClick} />
      </div>
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} id="exampleModalTenantsBoys" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden={!showModal}>
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Add Tenants</h1>
              <button onClick={handleClosePopUp} className="btn-close" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div className="container-fluid">
                <h1 className='text-center mb-2 fs-5'>
                  Create Tenants
                </h1>
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
                <form class="row lg-10" onSubmit={handleSubmit}>
                  <div class="col-md-6">
                    <label htmlFor='roomNo' class="form-label">
                      Room No:
                    </label>
                    <select id="roomNo" class="form-select" value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)}>
                      <option value="">Select a Room</option>
                      {boysRooms.map((room) => (
                        <option key={room.roomNumber} value={room.roomNumber}>
                          {room.roomNumber}
                        </option>
                      ))}
                    </select>

                    {errors.selectedRoom && <p style={{ color: 'red' }}>{errors.selectedRoom}</p>}
                  </div>

                  <div class="col-md-6">
                    <label htmlFor='bedNo' class="form-label">
                      Bed No:
                    </label>
                    <select id="bedNo" class="form-select" value={selectedBed} onChange={(e) => setSelectedBed(e.target.value)}>
                      <option value="">Select a Bed</option>
                      {bedOptions.map(bedNumber => (
                        <option key={bedNumber} value={bedNumber}>
                          {bedNumber}
                        </option>
                      ))}
                    </select>

                    {errors.selectedBed && <p style={{ color: 'red' }}>{errors.selectedBed}</p>}
                  </div>

                  <div class="col-md-6">
                    <label htmlFor='dataofJoin' class="form-label">
                      Date of Join:
                    </label>
                    <input id="dataofJoin" class="form-control" type="date" value={dateOfJoin} onChange={(e) => setDateOfJoin(e.target.value)} />

                    {errors.dateOfJoin && <p style={{ color: 'red' }}>{errors.dateOfJoin}</p>}
                  </div>
                  <div class="col-md-6">
                    <label htmlFor='tenantName' class="form-label">
                      Name:
                    </label>
                    <input id="tenantName" class="form-control" type="text" value={name} onChange={(e) => setName(e.target.value)} />

                    {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                  </div>

                  <div class="col-md-6">
                    <label htmlFor='tenantMobileNo' class="form-label">
                      Mobile No:
                    </label>
                    <input id="tenantMobileNo" class="form-control" type="text" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} />

                    {errors.mobileNo && <p style={{ color: 'red' }}>{errors.mobileNo}</p>}
                  </div>
                  <div class="col-md-6">
                    <label htmlFor='tenantIdNum' class="form-label">
                      ID Number:
                    </label>
                    <input id="tenantIdNum" class="form-control" type="text" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} />

                    {errors.idNumber && <p style={{ color: 'red' }}>{errors.idNumber}</p>}
                  </div>
                  <div class="col-md-6">
                    <label htmlFor='tenantEmergency' class="form-label">
                      Emergency Contact:
                    </label>
                    <input id="tenantEmergency" class="form-control" type="text" value={emergencyContact} onChange={(e) => setEmergencyContact(e.target.value)} />

                    {errors.emergencyContact && <p style={{ color: 'red' }}>{errors.emergencyContact}</p>}
                  </div>
                  <div class="col-md-6">
                    <label htmlFor='tenantStatus' class="form-label">
                      Status:
                    </label>
                    <select id="tenantStatus" class="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                      <option value="occupied">Occupied</option>
                      <option value="unoccupied">Unoccupied</option>
                    </select>

                  </div>
                  <div class="col-md-6">
                    <label htmlFor='tenantUpload' class="form-label">
                      Upload Image:
                    </label>
                    {isEditing && tenantImageUrl && (
                      <div>
                        <img src={tenantImageUrl} alt="Current Tenant" style={{ width: "100px", height: "100px" }} />
                        <p>Current Image</p>
                      </div>
                    )}
                    <input id="tenantUpload" class="form-control" type="file" onChange={handleTenantImageChange} ref={imageInputRef} required />
                    {errors.tenantImage && <p style={{ color: 'red' }}>{errors.tenantImage}</p>}
                  </div>
                  <div class="col-md-6">
                    <label htmlFor='tenantUploadId' class="form-label">
                      Upload Id:
                    </label>
                    {isEditing && tenantIdUrl && (
                      <object
                        data={tenantIdUrl}
                        type="application/pdf"
                        width="50%"
                        height="200px"
                      >
                        <a href={tenantIdUrl}>Download PDF</a>
                      </object>
                    )}
                    <input id="tenantUploadId" class="form-control" type="file" onChange={handleTenantIdChange} ref={idInputRef} multiple />

                  </div>
                  {/* ===== */}
                  <div class="col-md-6">
                    <label for="file-upload" class="custom-file-upload">
                      {/* <i class="fa fa-cloud-upload"></i> */}
                      {/* <MdUploadFile /> */}
                    </label>
                    <input id="file-upload" type="file" onChange={handleTenantIdChange} ref={idInputRef} multiple style={{ display: 'none' }} />
                  </div>

                  {/* =============== */}
                  <div className='col-12 text-center'>
                    {isEditing ? (
                      <button type="button" className="btn btn-warning" onClick={handleSubmit}>Update Tenant</button>
                    ) : (
                      <button className="btn btn-warning" type="submit">Add Tenant</button>
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

export default TenantsBoys;