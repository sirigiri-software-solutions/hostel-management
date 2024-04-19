import React, { useContext, useEffect, useRef, useState } from 'react';
import Rooms from '../../images/Icons (2).png'
import Beds from '../../images/Icons (3).png'
import Tenants from '../../images/Icons (4).png'
import Expenses from '../../images/Icons (5).png'
import './DashboardBoys.css'
import SmallCard from '../../Elements/SmallCard'
import './DashboardBoys.css';
import PlusIcon from "../../images/Icons (8).png"
import { database, push, ref, storage } from "../../firebase";
import { DataContext } from '../../ApiData/ContextProvider';
import { FetchData } from '../../ApiData/FetchData';
import { onValue, remove, update } from 'firebase/database'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';


const DashboardBoys = () => {

  const [modelText, setModelText] = useState('');
  const [formLayout, setFormLayout] = useState('');

  const [floorNumber, setFloorNumber] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [numberOfBeds, setNumberOfBeds] = useState('');
  const [rooms, setRooms] = useState([]);
  const [bedRent, setBedRent] = useState('');
  const [currentId, setCurrentId] = useState('');
  const [createdBy, setCreatedBy] = useState('admin'); // Default to 'admin'
  const [updateDate, setUpdateDate] = useState('');
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  //===============================
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
  const [currentTenantId, setCurrentTenantId] = useState('');
  const [tenatErrors, setTenantErrors] = useState({});
  const [tenantImage, setTenantImage] = useState(null);
  const [tenantImageUrl, setTenantImageUrl] = useState(''); // For the image URL from Firebase Storage
  const [tenantId, setTenantId] = useState(null);
  const [tenantIdUrl, setTenantIdUrl] = useState('');
  const imageInputRef = useRef(null);
  const idInputRef = useRef(null);
  const [boysRoomsData, setBoysRoomsData] = useState([]);
  const { data } = useContext(DataContext);

  const handleBoysRoomsSubmit = (e) => {
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
   
      const roomsRef = ref(database, 'Hostel/boys/rooms');
      push(roomsRef, {
        floorNumber,
        roomNumber,
        numberOfBeds,
        bedRent,
        createdBy,
        updateDate: now
      });
    // }(

    // Reset form
    setFloorNumber('');
    setRoomNumber('');
    setNumberOfBeds('');
    setBedRent('');
    setCurrentId('');
    setUpdateDate(now); // Update state with current date-time
    setErrors({}); // Clear errors
    setShowModal(false);
  };

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
      setRooms(loadedRooms);
    });
  }, []);
  // Calculate the total number of beds
  const totalBeds = rooms.reduce((acc, room) => acc + Number(room.numberOfBeds), 0);

  //==============================================================

  
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

  // useEffect(() => {
  //   const fetchDataFromAPI = async () => {
  //     try {
  //       if (data) {
  //         const boysTenantsData = Object.values(data.boys.tenants);
  //         setBoysTenants(boysTenantsData);

  //       } else {
  //         const apiData = await FetchData();
  //         const boysTenantsData = Object.values(apiData.boys.tenants);
  //         setBoysTenants(boysTenantsData);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching tenants data:', error);
  //     }
  //   };
  //   fetchDataFromAPI();
  // }, [data]);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        if (data) {
          const boysRoomsData = Object.values(data.boys.rooms);
          setBoysRoomsData(boysRoomsData);
        } else {
          const apiData = await FetchData();
          const boysRoomsData = Object.values(apiData.boys.rooms);
          setBoysRoomsData(boysRoomsData);
        }
      } catch (error) {
        console.error('Error fetching tenants data:', error);
      }
    };

    fetchDataFromAPI();
  }, [data]);
 
  useEffect(() => {
    if (selectedRoom) {
      const room = boysRoomsData.find(room => room.roomNumber === selectedRoom);
      if (room) {
        const options = Array.from({ length: room.numberOfBeds }, (_, i) => i + 1);
        setBedOptions(options);
      }
    } else {
      setBedOptions([]);
    }
  }, [selectedRoom, boysRoomsData]);

  const validate = () => {
    let tempErrors = {};
    tempErrors.selectedRoom = selectedRoom ? "" : "Room number is required.";
    tempErrors.selectedBed = selectedBed ? "" : "Bed number is required.";
    tempErrors.dateOfJoin = dateOfJoin ? "" : "Date of join is required.";
    tempErrors.name = name ? "" : "Name is required.";
    tempErrors.mobileNo = mobileNo ? "" : "Mobile number is required.";
    tempErrors.idNumber = idNumber ? "" : "ID number is required.";
    tempErrors.emergencyContact = emergencyContact ? "" : "Emergency contact is required.";

    // Check if the selected bed is already occupied
    const isBedOccupied = tenants.some(tenant => {
      return tenant.roomNo === selectedRoom && tenant.bedNo === selectedBed && tenant.status === "occupied" && tenant.id !== currentTenantId;
    });

    if (isBedOccupied) {
      tempErrors.selectedBed = "This bed is already occupied.";
    }
    setTenantErrors(tempErrors);
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

  const handleTenantSubmit = async (e) => {
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
      await update(ref(database, `Hostel/boys/tenants/${currentTenantId}`), tenantData);
    } else {
      await push(ref(database, 'Hostel/boys/tenants'), tenantData);
    }
    // setShowModal(false);
    setShowModal(false);
    resetForm();
    imageInputRef.current.value = "";
    idInputRef.current.value = "";
    
  };

  const resetForm = () => {
    setSelectedRoom('');
    setSelectedBed('');
    setDateOfJoin('');
    setName('');
    setMobileNo('');
    setIdNumber('');
    setEmergencyContact('');
    setStatus('unoccupied');
    setIsEditing(false);
    setCurrentId('');
    setErrors({});
    setTenantImage(null);
    setTenantId(null);
    setTenantImageUrl('');
    setTenantIdUrl('');
    setFloorNumber('');
    setRoomNumber('');
    setNumberOfBeds('');
    setBedRent('');
    setCreatedBy('admin')
  };


  

  const menu = [
    {
      image: Rooms,
      heading: 'Total Rooms',
      number:`${rooms.length}` ,
      btntext: 'Add Rooms',
    },
    {
      image: Beds,
      heading: 'Total Beds',
      number: `${totalBeds}`,
      btntext: 'Add Beds',
    },
    {
      image: Tenants,
      heading: 'Total Tenants',
      number: `${tenants.length}`,
      btntext: 'Add Tenants',
    },
    {
      image: Expenses,
      heading: 'Total Expenses',
      number: 28635,
      btntext: 'Add Expenses',
    },
  ];

  const Buttons = ['Add Rooms', 'Add Beds', 'Add Tenants', 'Add Expenses'];

  const handleClick = (text) => {
    setModelText(text);
    setFormLayout(text);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setModelText('');
    setFormLayout('');
    resetForm();
    setShowModal(false);
    
  };

  // useEffect(() => {

  //   const handleResize = () => {
  //     if (window.innerWidth < 650) {
  //       setBtn(true);
  //     } else {
  //       setBtn(false);
  //     }
  //   };
  //   handleResize();
  //   window.addEventListener('resize', handleResize);
  //   // Cleanup
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  const renderFormLayout = () => {
    switch (formLayout) {
      case 'Add Rooms':
        return (
          <form className="row g-3" onSubmit={handleBoysRoomsSubmit}>
          <div className="col-md-6">
            <label htmlFor="inputNumber" className="form-label">Floor Number</label>
            <input type="number" className="form-control" id="inputNumber" name="number" value={floorNumber} onChange={(e) => setFloorNumber(e.target.value)} />
            {errors.floorNumber && <div style={{ color: 'red' }}>{errors.floorNumber}</div>}
          </div>
          <div className="col-md-6">
            <label htmlFor="inputRent" className="form-label">Room Number</label>
            <input type="number" className="form-control" id="inputRent" name="rent" value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} />
            {errors.roomNumber && <div style={{ color: 'red' }}>{errors.roomNumber}</div>}
          </div>
          <div className="col-md-6">
            <label htmlFor="inputRooms" className="form-label">Number of Beds</label>
            <input type="number" className="form-control" id="inputRooms" name="rooms" value={numberOfBeds} onChange={(e) => setNumberOfBeds(e.target.value)} />
            {errors.numberOfBeds && <div style={{ color: 'red' }}>{errors.numberOfBeds}</div>}
          </div>
          <div className="col-md-6">
            <label htmlFor="inputStatus" className="form-label">Bed Rent</label>
            <input type="text" className="form-control" id="inputStatus" name="status" value={bedRent} onChange={(e) => setBedRent(e.target.value)} />
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
              <button type="submit" className="btn btn-warning" onClick={handleBoysRoomsSubmit}>Create Room</button>
          </div>
        </form>
        )
      case 'Add Beds':
        return (
          <form class="row g-3">
            <div class="col-md-6">
              <label for="inputslno" class="form-label">S.No</label>
              <input type="number" class="form-control" id="inputslno" />
            </div>
            <div class="col-md-6">
              <label for="inputBedNum" class="form-label">Bed Number</label>
              <input type="number" class="form-control" id="inputBedNum" />
            </div>
            <div class="col-md-6">
              <label for="inputroomNo" class="form-label">Room No</label>
              <input type="number" class="form-control" id="inputroomNo" />
            </div>
            <div class="col-md-6">
              <label for="inputfloor" class="form-label">Floor</label>
              <input type="number" class="form-control" id="inputfloor" />
            </div>
            <div class="col-md-6">
              <label for="inputRemarks" class="form-label">Rent</label>
              <input type="number" class="form-control" id="inputRemarks" />
            </div>
            <div class="col-md-6">
              <label for="inputupdatedDate" class="form-label">Date</label>
              <input type="date" class="form-control" id="inputupdatedDate" />
            </div>
          </form>
        )
      case 'Add Tenants':
        return (
          <form class="row lg-10" onSubmit={handleTenantSubmit}>
          <div class="col-md-6">
            <label htmlFor='roomNo' class="form-label">Room No:</label>
              <select id="roomNo" class="form-select" value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)}>
                <option value="">Select a Room</option>
                {boysRoomsData.map((room) => (
                  <option key={room.roomNumber} value={room.roomNumber}>
                    {room.roomNumber}
                  </option>
                ))}
              </select>
            
          {tenatErrors.selectedRoom && <p style={{ color: 'red' }}>{tenatErrors.selectedRoom}</p>}
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
            
            {tenatErrors.selectedBed && <p style={{ color: 'red' }}>{tenatErrors.selectedBed}</p>}
          </div>
          <div class="col-md-6">
            <label htmlFor='dataofJoin' class="form-label">
              Date of Join:
              </label>
              <input id="dataofJoin" class="form-control" type="date" value={dateOfJoin} onChange={(e) => setDateOfJoin(e.target.value)} />
            
            {tenatErrors.dateOfJoin && <p style={{ color: 'red' }}>{tenatErrors.dateOfJoin}</p>}
          </div>
          <div class="col-md-6">
            <label htmlFor='tenantName' class="form-label">
              Name:
              </label>
              <input id="tenantName" class="form-control" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            
            {tenatErrors.name && <p style={{ color: 'red' }}>{tenatErrors.name}</p>}
          </div>
          <div class="col-md-6">
            <label htmlFor='tenantMobileNo' class="form-label">
              Mobile No:
              </label>
              <input id="tenantMobileNo" class="form-control" type="text" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} />
            
            {tenatErrors.mobileNo && <p style={{ color: 'red' }}>{tenatErrors.mobileNo}</p>}
          </div>
          <div class="col-md-6">
            <label htmlFor='tenantIdNum' class="form-label">
              ID Number:
              </label>
              <input id="tenantIdNum" class="form-control" type="text" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} />
            
            {tenatErrors.idNumber && <p style={{ color: 'red' }}>{tenatErrors.idNumber}</p>}
          </div>
          <div class="col-md-6">
            <label htmlFor='tenantEmergency' class="form-label">
              Emergency Contact:
              </label>
              <input id="tenantEmergency" class="form-control" type="text" value={emergencyContact} onChange={(e) => setEmergencyContact(e.target.value)} />
            
            {tenatErrors.emergencyContact && <p style={{ color: 'red' }}>{tenatErrors.emergencyContact}</p>}
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
              <input id="tenantUpload" class="form-control" type="file" onChange={handleTenantImageChange} ref={imageInputRef} />
            
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
            <label htmlFor='tenantIdInput'  for="file-upload" class="custom-file-upload form-label">
              {/* <i class="fa fa-cloud-upload"></i> */}
              {/* <MdUploadFile /> */}
            </label>
            <input  class="form-control" id="file-upload" type="file" onChange={handleTenantIdChange} ref={idInputRef} multiple style={{ display: 'none' }} />
          </div>

          {/* =============== */}
          <div className='col-12 text-center'>
            {isEditing ? (
              <button type="button" className="btn btn-warning" onClick={handleTenantSubmit}>Update Tenant</button>
            ) : (
              <button className='btn btn-warning' type="submit">Add Tenant</button>
            )}
          </div>
        </form>
        )

      case "Add Expenses":
        return (
          <form class="row lg-10">
            <div class="col-md-6">
              <label for="inputName" class="form-label">Name</label>
              <input type="text" class="form-control" id="inputName" />
            </div>

            <div class="col-md-6">
              <label for="inputName" class="form-label">Month</label>
              <select class="form-select" id="inputName">
                <option value="">Select Month</option>
                <option value="1">01</option>
                <option value="2">02</option>
                <option value="3">03</option>
                <option value="4">04</option>
                <option value="5">05</option>
                <option value="6">06</option>
                <option value="7">07</option>
                <option value="8">08</option>
                <option value="9">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
            </div>

            <div class="col-md-6">
              <label for="inputYear" class="form-label">Year</label>
              <input type="number" pattern="[0-9]" class="form-control" id="inputYear" />
            </div>

            <div class="col-md-6">
              <label for="inputRoomNo" class="form-label">Due Date</label>
              <input type="date" class="form-control" id="inputRoomNo" />
            </div>

            <div class="col-md-6">
              <label for="inputAmount" class="form-label">Amount</label>
              <input type="number" class="form-control" id="inputAmount" />
            </div>

            <div class="col-md-6">
              <label for="inputNum" class="form-label">Number</label>
              <input type="tel" class="form-control" id="inputNum" />
            </div>

            <div class="col-md-6">
              <label for="inputCreatedON" class="form-label">Created on</label>
              <input type="dal" class="form-control" id="inputCreatedON" />
            </div>

          </form>

        )

      default:
        return null
    }
  }

  return (
    <div className="dashboardboys">
      <h1 className="heading">Men's</h1>
      <div className="menu">

        {menu.map((item, index) => (
          <>
            <SmallCard key={index} index={index} item={item} />
            <button id="mbladdButton" type="button"  onClick={() => handleClick(item.btntext)}><img src={PlusIcon} alt="plusIcon" className='plusIconProperties' /> {item.btntext} </button>
          </>
        ))}
        <div className='button-container'>
          {Buttons?.map((item, index) => (
            <button id="deskaddButton" type="button"  onClick={() => handleClick(item)}><img src={PlusIcon} alt="plusIcon" className='plusIconProperties' /> {item} </button>
          ))}
        </div>



      </div>


      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} id="exampleModalRoomsBoys" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden={!showModal} >
        <div className="modal-dialog ">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">{modelText}</h1>
              <button onClick={handleCloseModal} className="btn-close" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
               {renderFormLayout()}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  );
};

export default DashboardBoys;

