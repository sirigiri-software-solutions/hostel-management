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
import { onValue, remove, set, update } from 'firebase/database'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FaDownload } from "react-icons/fa";
import { toast } from "react-toastify";
import { Camera, CameraResultType } from '@capacitor/camera';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';



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
  // const imageInputRef = useRef(null);
  // const idInputRef = useRef(null);
  // const [boysRoomsData, setBoysRoomsData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);


  const [userDetailsTenantPopup, setUserDetailsTenantsPopup] = useState(false);
  const [singleTenantDetails, setSingleTenantDetails] = useState(false);
  const [dueDateOfTenant, setDueDateOfTenant] = useState("");
  const [singleTenantProofId,setSingleTenantProofId] = useState("");

  const [boysRooms, setBoysRooms] = useState([]);
  const [exTenants, setExTenants] = useState([]);
  const [showExTenants, setShowExTenants] = useState(false);
  const [hasBike, setHasBike] = useState(false);
  const [bikeNumber, setBikeNumber] = useState('');

  // for camera icon
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    // Check if the user agent is a mobile device
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    setIsMobile(/iPhone|iPod|iPad|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(userAgent));
}, []);

  const takePicture = async () => {

    if (!isMobile) {
      console.error("Camera access is not supported on your device.");
      return;
  }
    try {
      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri
      });
      const response = await fetch(photo.webPath);
      const blob = await response.blob();
      const imageRef = storageRef(storage, `Hostel/boys/tenants/images/${new Date().getTime()}`);
      const snapshot = await uploadBytes(imageRef, blob);
      const url = await getDownloadURL(snapshot.ref);
      
      setPhotoUrl(url); // Display in UI
      setTenantImageUrl(url); // Use in form submission
      // setPhotoUrl(photo.webPath);
    } catch (error) {
      console.error("Error accessing the camera", error);
      toast.error("Image not Uploaded");
    }
  };
  const[bikeOption,setBikeOption]=useState('no');

  const tenantImageInputRef = useRef(null);
  const tenantProofIdRef = useRef(null);

  const handleCheckboxChange = (e) => {
    setHasBike(e.target.value === 'yes');
    setBikeOption(e.target.value);
    if (e.target.value === 'no') {
      setBikeNumber('--N/A--');
    } else {
      setBikeNumber('');
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      console.log("Triggering")
        if (showModal && (event.target.id === "exampleModalTenantsBoys" || event.key === "Escape" )) {
            setShowModal(false);
            setTenantIdUrl('')
        }
    };

    window.addEventListener('click', handleOutsideClick);
    window.addEventListener('keydown', handleOutsideClick);
    
}, [showModal]);




useEffect(() => {
  const handleClickOutside = (event) => {
    const popup = document.getElementById('userDetailsTenantPopupId');
    if (popup && (!popup.contains(event.target) || event.key === "Escape")) {
      setUserDetailsTenantsPopup(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  document.addEventListener("keydown",handleClickOutside)
}, []);







  

  

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
          setBoysTenants(boysTenantsData)
        }
      } catch (error) {
        console.error('Error fetching tenants data:', error);
      }
    };
    fetchDataFromAPI();
  }, [data]);

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

    // tryin to compress code



    // previous code
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
    if(!isEditing){
    e.target.querySelector('button[type="submit"]').disabled = true;
    if (!validate()) {
      e.target.querySelector('button[type="submit"]').disabled = false;  
      return
    };
  } else{
    if(!validate()) return;
  }


    let imageUrlToUpdate = tenantImageUrl;

    if (tenantImage  && !tenantImageUrl) {
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
      name:name.charAt(0).toUpperCase() + name.slice(1),
      mobileNo,
      idNumber,
      emergencyContact,
      status,
      tenantImageUrl: imageUrlToUpdate,
      tenantIdUrl: idUrlToUpdate,
      // tenantIdUrl,
    };

    if (isEditing) {
      await update(ref(database, `Hostel/boys/tenants/${currentId}`), tenantData).then(() => {
        toast.success("Tenant updated successfully.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        
      }).catch(error => {
        toast.error("Error update Tenant: " + error.message, {
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
      await push(ref(database, 'Hostel/boys/tenants'), tenantData).then(() => {
        toast.success("Tenant added successfully.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        e.target.querySelector('button[type="submit"]').disabled = false;
      }).catch(error => {
        toast.error("Error adding Tenant: " + error.message, {
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
    setShowModal(false);

    resetForm();
    setErrors({});
   
    
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
    setTenantImageUrl(tenant.tenantImageUrl);
    setTenantIdUrl(tenant.tenantIdUrl || '');
    setBikeNumber("");
    setHasBike(false);
    
 

    setShowModal(true);

  };
  

  
  const handleAddNew = () => {
    // Reset any previous data
    resetForm();
    // Set modal for a new entry
    setIsEditing(false);
    // Open the modal
    setShowModal(true);
    setUserDetailsTenantsPopup(false);
    setTenantIdUrl('')

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
    setBikeNumber('');
    setHasBike(false);
    tenantImageInputRef.current.value = null;
    tenantProofIdRef.current.value = null;
    
  };

  // Filter tenants based on search query
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  };

  const columns = [
    'S. No',
    'Image',
    'Name',
    'ID',
    'Mobile No',
    'Room/Bed No',
    'Joining Date',
    'Status',
    'Actions'
  ]

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


  const rows = tenants.map((tenant, index) => ({
    s_no: index + 1,
    image: tenant.tenantImageUrl,
    name: tenant.name, // Assuming 'name' property exists in the fetched data
    id: tenant.idNumber, // Assuming 'id' property exists in the fetched data
    mobile_no: tenant.mobileNo, // Assuming 'mobile_no' property exists in the fetched data
    room_bed_no: `${tenant.roomNo}/${tenant.bedNo}`, // Assuming 'room_bed_no' property exists in the fetched data
    joining_date: tenant.dateOfJoin,
    status:capitalizeFirstLetter(tenant.status),
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
    setTenantIdUrl('')
    setHasBike(false);
    setBikeNumber('');
    console.log("popupclosed");
    

  }


  const handleTentantRow = (tenant) => {

    setUserDetailsTenantsPopup(true);
    setShowModal(false);
    setSingleTenantDetails(tenant);

    

    const singleUserDueDate = tenants.find(eachTenant => eachTenant.name === tenant.name && eachTenant.mobileNo === tenant.mobile_no);

    if (singleUserDueDate && singleUserDueDate.rents) {
      const dataWithDueDate = Object.values(singleUserDueDate.rents);
      const dueDate = dataWithDueDate[0].dueDate;
      console.log("Due date:", dueDate);
      setDueDateOfTenant(dueDate);
    } else {
      console.log("Tenant with due date not found or due date is missing");
    }

    if(singleUserDueDate && singleUserDueDate.tenantIdUrl){
      setSingleTenantProofId(singleUserDueDate.tenantIdUrl)
    } 
};

  const tenantPopupClose = () => {
    setUserDetailsTenantsPopup(false);
    setDueDateOfTenant("")
    setSingleTenantProofId("");
    
  }

  //=====Vacate tenant ===========
  const handleVacate = async (id) => {
    const tenantRef = ref(database, `Hostel/boys/tenants/${currentId}`);
    const newTenantRef = ref(database, `Hostel/boys/extenants/${currentId}`);
    // Retrieve the data from the original location
    onValue(tenantRef, async (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Write the data to the new location
        await set(newTenantRef, data);
        // Remove the data from the original location
        await remove(tenantRef).then(() => {
          toast.success("Tenant Vacated", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }).catch(error => {
          toast.error("Error Tenant Vacate " + error.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
        fetchExTenants()
      }
    }, {
      onlyOnce: true // This ensures the callback is only executed once
    });

    setShowModal(false);
    resetForm();
    setErrors({});
    // imageInputRef.current.value = "";
    // idInputRef.current.value = "";
  };
  const fetchExTenants = () => {
    const exTenantsRef = ref(database, 'Hostel/boys/extenants');
    onValue(exTenantsRef, (snapshot) => {
      const data = snapshot.val();
      const loadedExTenants = data ? Object.entries(data).map(([key, value]) => ({ id: key, ...value })) : [];
      setExTenants(loadedExTenants);
    });
  };
  useEffect(() => { fetchExTenants() }, []);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [tenantIdToDelete, setTenantIdToDelete] = useState(null);

  const handleExTenantDelete = (id,name) => {
    setShowConfirmation(true);
    setTenantIdToDelete(id);
    setName(name);
    
  };

  const handleConfirmDelete = async () => {
    const removeRef = ref(database, `Hostel/boys/extenants/${tenantIdToDelete}`);
    remove(removeRef)
      .then(() => {
        toast.success('Tenant Deleted', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        toast.error('Error Deleting Tenant: ' + error.message, {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    setShowConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  
  const exTenantRows = exTenants.map((tenant, index) => ({
    s_no: index + 1, // Assuming `id` is a unique identifier for each tenant
    image: tenant.tenantImageUrl,
    name: tenant.name,
    id: tenant.idNumber,
    mobile_no: tenant.mobileNo,
    room_bed_no: `${tenant.roomNo}/${tenant.bedNo}`,
    joining_date: tenant.dateOfJoin,
    status: 'Vacated',
    actions: (
      <button
        style={{
          backgroundColor: '#ff8a00',
          padding: '4px',
          borderRadius: '5px',
          color: 'white',
          border: 'none',
        }}
        onClick={() => handleExTenantDelete(tenant.id,tenant.name)} // Pass the `id` of the tenant
      >
        Delete
      </button>
    ),
  }));
  

  const showExTenantsData = () => {
    setShowExTenants(!showExTenants)
  }


  return (
    <>
      <div className="row d-flex flex-wrap align-items-center justify-content-between">
        <div className="col-12 col-md-4 d-flex align-items-center mr-5 mb-2">
          <div className='roomlogo-container'>
            <img src={TenantsIcon} alt="RoomsIcon" className='roomlogo' />
          </div>
          <h1 className='management-heading'>Tenants Management</h1>
        </div>
        <div className="col-5 col-md-4 search-wrapper">
          <input type="text" placeholder='Search' className='search-input' value={searchQuery} onChange={handleSearchChange} />
          <img src={SearchIcon} alt="search-icon" className='search-icon' />
        </div>
        <div className="col-7 col-md-4 d-flex justify-content-end gap-2">
          {showExTenants ? '' : <button type="button" class="add-button tenantaddBtn" onClick={() => { handleAddNew() }} >
            Add Tenants
          </button>}
          {showExTenants ? <button type="button" class="add-button" onClick={showExTenantsData} >
            Present-Tenants
          </button> : <button type="button" class="add-button tenantaddBtn" onClick={showExTenantsData} >
            Vacated
          </button>}
        </div>
      </div>
      <div>
        {showExTenants ? <Table columns={columns} rows={exTenantRows} onClickTentantRow={handleTentantRow} /> : <Table columns={columns} rows={filteredRows} onClickTentantRow={handleTentantRow} />}
      </div>
      <div   className={`modal fade ${showModal ? 'show' : ''}`}  style={{ display: showModal ? 'block' : 'none' }} id="exampleModalTenantsBoys" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden={!showModal}  >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title fs-5" id="exampleModalLabel">Add Tenants</h5>
              <button onClick={handleClosePopUp} className="btn-close" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div className="container-fluid">
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
                    <input id="tenantName" class="form-control" type="text" value={name} onChange={(e) => setName(e.target.value)} onInput={e => e.target.value = e.target.value.replace(/[^a-zA-Z ]/g, '')} />

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
                    <input id="tenantUpload" class="form-control" type="file" onChange={handleTenantImageChange}  required />
                    {errors.tenantImage && <p style={{ color: 'red' }}>{errors.tenantImage}</p>}
                  </div>
                 <div className="col-md-6">
                    <label htmlFor='tenantUploadId' className="form-label">
                      Upload Id:
                    </label>
                    {isEditing && tenantIdUrl && (
                      <div>
                        <object
                          data={tenantIdUrl}
                          type="application/pdf"
                          width="100%"
                          height="133px"
                        >
                          {/* Anchor tag for downloading the PDF */}
                           
                        </object>
                      </div>
                    )}
                    {/* Show input for uploading ID only if not editing or tenantIdUrl doesn't exist */}
                    
                      <input ref={tenantProofIdRef} id="tenantUploadId" className="form-control" type="file" onChange={handleTenantIdChange} />
                    
                  </div> 
                  <div className="col-12 col-sm-12 col-md-12" style={{ marginTop: '20px' }}>
  <label className='col-sm-12 col-md-4' htmlFor="bikeCheck">Do you have a bike?</label>
  <input
    type="radio"
    className="Radio"
    id="bikeCheck"
    name="bike"
    value="yes"
    onClick={handleCheckboxChange}
    checked={hasBike}
  />
  <label htmlFor='bikeCheck' className='bike'>Yes</label>
  <input
    type="radio"
    id="bikeCheck1"
    name="bike"
    value="no"
    onClick={handleCheckboxChange}
    checked={!hasBike}
    style={{ marginLeft: '30px' }}
  />
  <label htmlFor='bikeCheck1' className='bike'>No</label>
</div>

{hasBike && (
  <div className='bikeField' style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
    <label class="bikenumber" htmlFor="bikeNumber" >Bike Number:</label>
    <input
      type="text"
      id="bikeNumber"
      
      className='form-control'
      placeholder="Enter number plate ID"
      value={bikeNumber}
      onChange={(event) => setBikeNumber(event.target.value)}
      style={{ flex: '2', borderRadius: '5px', borderColor: 'beize', outline: 'none', marginTop: '0', borderStyle: 'solid', borderWidth: '1px',borderHeight:'40px',marginLeft:'8px' }}
    />
  </div>
)}
            



                  
                  
                  {/* =============== */}
                  <div className='col-12 text-center mt-3'>
                    {isEditing ? (
                      <div className="d-flex justify-content-center gap-2">
                        <button type="button" className="btn btn-warning" onClick={handleSubmit}>Update Tenant</button>
                        <button type="button" className="btn btn-warning" onClick={handleVacate}>Vacate Tenant</button>
                      </div>
                    ) : (
                      <button id="tenantAddBtn"  className="btn btn-warning" type="submit">Add Tenant</button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
   

     

      {userDetailsTenantPopup && 
      <div  id="userDetailsTenantPopupId"  className='userDetailsTenantPopup'>
        <div className='tenants-dialog-container'>
          <h1 className="tenants-popup-heading">Tenant Details </h1>
          <div className='tenants-popup-mainContainer'>
            <div className='tenants-profile-container'>
             <img src={singleTenantDetails.image} alt="profile" className='tenants-popup-profile' />
             </div>
             <div className='tenants-popup-detailsContainer'>
                 <p><strong>Name :</strong> {singleTenantDetails.name}</p>
                  <p><strong>Mobile No :</strong> {singleTenantDetails.mobile_no}</p>
                  <p><strong>Proof ID :</strong> {singleTenantDetails.id}</p>
                  <p><strong>Room/Bed No :</strong> {singleTenantDetails.room_bed_no}</p>
                  <p><strong>Joining Date :</strong> {singleTenantDetails.joining_date}</p>
                  <p><strong>Due Date :</strong> {dueDateOfTenant}</p>
                  <p><strong>ID Proof:</strong>
                    {singleTenantProofId ? (
                      <a className='downloadPdfText' href={singleTenantProofId} download> <FaDownload /> Download PDF</a>
                    ) : (
                      <span className='NotUploadedText'> Not Uploaded</span>
                    )}
                  </p>
             </div>
          </div>
          <div className='popup-tenants-closeBtn'>
          <button className='btn btn-warning' onClick={tenantPopupClose}>Close</button>
          </div>
        </div>
      </div>
      }
      {showConfirmation && (
        <div className="confirmation-dialog">
          <div className='confirmation-card'>
          <p style={{paddingBottom:'0px',marginBottom:'7px',fontSize:'20px'}}>Are you sure you want to delete the tenant with name <span style={{color:'red'}}>{name}</span>?</p>
          <p style={{color:'red',fontSize:'15px',textAlign:'center'}}>Note : Once you delete he/she from tenant it can't be restored</p>
          <div className="buttons">
            <button onClick={handleConfirmDelete}>Yes</button>
            <button onClick={handleCancelDelete}>No</button>
          </div>
          </div>
        </div>
      )}

    </>
  );

}

export default TenantsBoys;