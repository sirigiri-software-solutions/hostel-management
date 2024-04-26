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
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


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
  const [totalExpenses, setTotalExpenses] = useState(0);

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
  // const { data } = useContext(DataContext);

  const handleRoomsIntegerChange = (event) => {
    const value = event.target.value;
    const re = /^[0-9\b]+$/; // Regular expression to allow only numbers

    if (value === '' || re.test(value)) {
      switch (event.target.name) {
        case 'floorNumber':
          setFloorNumber(value);
          break;
        case 'roomNumber':
          setRoomNumber(value);
          break;
        case 'numberOfBeds':
          setNumberOfBeds(value);
          break;
        case 'bedRent':
          setBedRent(value);
          break;
        default:
          break;
      }
    }
  };

  // expenses related 
  const [formData, setFormData] = useState({
    expenseName: '',
    expenseAmount: '',
    expenseDate: '',
    createdBy: 'admin'
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
      }).then(() => {
        toast.success("Room added successfully.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }).catch(error => {
        toast.error("Error adding room: " + error.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const expensesRef = ref(database, 'Hostel/boys/expenses');
    onValue(expensesRef, (snapshot) => {
      const data = snapshot.val();
      let total = 0; // Variable to hold the total expenses
      for (const key in data) {
        const expense = {
          id: key,
          ...data[key],
          expenseDate: formatDate(data[key].expenseDate)
        };
        total += expense.expenseAmount; // Add expense amount to total
      }
      setTotalExpenses(total); // Set total expenses state
    });
  }, []);

  
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


  //------------------------------------
  
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
//--------------------------------------
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
      return tenant.roomNo === selectedRoom && tenant.bedNo === selectedBed && tenant.status === "occupied" && tenant.id !== currentTenantId;
    });

    if (isBedOccupied) {
      tempErrors.selectedBed = "This bed is already occupied.";
    }
    if (!tenantImage && !tenantImageUrl) {
      tempErrors.tenantImage = "Tenant image is required.";
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
    // if (!validate()) return;
    e.target.querySelector('button[type="submit"]').disabled = true;
    if (!validate()) {
      e.target.querySelector('button[type="submit"]').disabled = false;  
      return
    };

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

  //handle add rent==============================================
  
  const [selectedTenant, setSelectedTenant] = useState('');
  const [bedNumber, setBedNumber] = useState('');
  const [totalFee, setTotalFee] = useState('');
  const [paidAmount, setPaidAmount] = useState('');
  const [due, setDue] = useState('');
  const [tenantsWithRents, setTenantsWithRents] = useState([]);
  const [paidDate, setPaidDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [editingRentId, setEditingRentId] = useState(null);
  const [availableTenants, setAvailableTenants] = useState([]);

  // useEffect(() => {
  //   // Fetch tenants data once when component mounts
  //   const tenantsRef = ref(database, 'Hostel/boys/tenants');
  //   onValue(tenantsRef, (snapshot) => {
  //     const data = snapshot.val();
  //     const loadedTenants = data ? Object.keys(data).map(key => ({
  //       id: key,
  //       ...data[key],
  //     })) : [];
  //     setTenants(loadedTenants);
  //   });

  //   // Fetch room data once when component mounts
    
  // }, []);

  useEffect(() => {
    const updateTotalFeeFromRoom = () => {
      // Convert the rooms object into an array of its values
      const roomsArray = Object.values(rooms);
      // Find the room that matches the roomNumber
      const matchingRoom = roomsArray.find(room => room.roomNumber === roomNumber);

      if (matchingRoom && matchingRoom.bedRent) {
        setTotalFee(matchingRoom.bedRent.toString());
      } else {
        // Reset totalFee if no matching room is found
        setTotalFee('');
      }
    };
    if (roomNumber) {
      updateTotalFeeFromRoom();
    }
  }, [roomNumber, rooms]);


  useEffect(() => {
    if (selectedTenant) {
      const tenant = tenants.find(t => t.id === selectedTenant);
      if (tenant) {
        setRoomNumber(tenant.roomNo || '');
        setBedNumber(tenant.bedNo || '');
        setDateOfJoin(tenant.dateOfJoin || '');
      }
    } else {
      // Reset these fields if no tenant is selected
      setRoomNumber('');
      setBedNumber('');
      setPaidAmount('');
      setDue('');
      setDateOfJoin('');
      setDueDate('');
    }
  }, [selectedTenant, tenants]);

  useEffect(() => {
    // Assuming tenantsWithRents already populated
    const tenantIdsWithRents = tenantsWithRents.flatMap(tenant =>
      tenant.rents.length > 0 ? [tenant.id] : []
    );

    const availableTenants = tenants.filter(
      tenant => !tenantIdsWithRents.includes(tenant.id)
    );

    // Optionally, you can store availableTenants in a state if you need to use it elsewhere
    setAvailableTenants(availableTenants);
  }, [tenants, tenantsWithRents]);


  useEffect(() => {
    // Recalculate due when paid amount changes
    const calculatedDue = Math.max(parseFloat(totalFee) - parseFloat(paidAmount), 0).toString();
    setDue(calculatedDue);
  }, [paidAmount, totalFee]);

  useEffect(() => {
    // Fetch tenants data once when component mounts
    const tenantsRef = ref(database, 'Hostel/boys/tenants');
    onValue(tenantsRef, (snapshot) => {
      const tenantsData = snapshot.val();
      const tenantIds = tenantsData ? Object.keys(tenantsData) : [];

      // Initialize an array to hold promises for fetching each tenant's rents
      const rentsPromises = tenantIds.map(tenantId => {
        return new Promise((resolve) => {
          const rentsRef = ref(database, `Hostel/boys/tenants/${tenantId}/rents`);
          onValue(rentsRef, (rentSnapshot) => {
            const rents = rentSnapshot.val() ? Object.keys(rentSnapshot.val()).map(key => ({
              id: key,
              ...rentSnapshot.val()[key],
            })) : [];
            resolve({ id: tenantId, ...tenantsData[tenantId], rents });
          }, {
            onlyOnce: true // This ensures the callback is only executed once.
          });
        });
      });

      // Wait for all promises to resolve and then set the state
      Promise.all(rentsPromises).then(tenantsWithTheirRents => {
        setTenantsWithRents(tenantsWithTheirRents);
      });
    });
  }, []);

  const validateRentForm = () => {
    let formIsValid = true;
    let errors = {};

    if (!selectedTenant) {
      formIsValid = false;
      errors["selectedTenant"] = "Selecting a tenant is required.";
    }

    // Paid Amount
    if (!paidAmount) {
      formIsValid = false;
      errors["paidAmount"] = "Paid amount is required.";
    }

    // Paid Date
    if (!paidDate) {
      formIsValid = false;
      errors["paidDate"] = "Paid date is required.";
    }

    // Due Date
    if (!dueDate) {
      formIsValid = false;
      errors["dueDate"] = "Due date is required.";
    }

    setErrors(errors);
    return formIsValid;
  };


  const handleRentSubmit = async (e) => {
    e.preventDefault();

    // Validate form before proceeding
    if (!validateRentForm()) {
      // If validation fails, stop form submission
      return;
    }

    const rentData = {
      roomNumber,
      bedNumber,
      totalFee,
      paidAmount,
      due,
      dateOfJoin,
      paidDate,
      dueDate,
      status: parseFloat(due) <= 0 ? 'Paid' : 'Unpaid',
    };

    if (isEditing) {
      // Update the existing rent record
      const rentRef = ref(database, `Hostel/boys/tenants/${selectedTenant}/rents/${editingRentId}`);
      await update(rentRef, rentData).then(() => {
        toast.success("Rent updated successfully.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setIsEditing(false); // Reset editing state
      }).catch(error => {
        toast.error("Error updating rent: " + error.message, {
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
      // Create a new rent record
      const rentRef = ref(database, `Hostel/boys/tenants/${selectedTenant}/rents`);
      await push(rentRef, rentData).then(() => {
        toast.success("Rent adding successfully.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setIsEditing(false); // Reset editing state
      }).catch(error => {
        toast.error("Error addinging rent: " + error.message, {
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
   
  };

//-------------------------------------------------------------------------------------------------
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
    setFloorNumber('');
    setRoomNumber('');
    setNumberOfBeds('');
    setBedRent('');
    setCreatedBy('admin');

    setSelectedTenant(''); 
    setRoomNumber('');  
    setBedNumber('');      
    setTotalFee('');     
    setPaidAmount('');     
    setDue('');        
    setDateOfJoin('');     
    setPaidDate('');       
    setDueDate('');        
    setErrors({});         
    setIsEditing(false);
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
      btntext: 'Add Rent',
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
      number: `${totalExpenses}`,
      btntext: 'Add Expenses',
    },
  ];

  const Buttons = ['Add Rooms', 'Add Rent', 'Add Tenants', 'Add Expenses'];

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


  const expensesHandleSubmit = (e) => {
    e.preventDefault();
    // Validate the necessary fields
    let errors = {};
    let formIsValid = true;

    if (!formData.expenseName.match(/^[a-zA-Z\s]+$/)) {
      errors.expenseName = 'Expense name should contain only alphabets and spaces';
      formIsValid = false;
    }
    
  
    if (!formData.expenseAmount.match(/^\d+(\.\d{1,2})?$/)) {
      errors.expenseAmount = 'Expense amount should be a valid number';
      formIsValid = false;
    }
  

    if (!formData.expenseName) {
      errors.expenseName = 'Expense name is required';
      formIsValid = false;
    }

    if (!formData.expenseAmount) {
      errors.expenseAmount = 'Expense amount is required';
      formIsValid = false;
    }

    if (!formData.expenseDate) {
      errors.expenseDate = 'Expense date is required';
      formIsValid = false;
    }

    // Only proceed if form is valid
    if (formIsValid) {
      const expensesRef = ref(database, 'Hostel/boys/expenses');
      push(expensesRef, {
        ...formData,
        expenseAmount: parseFloat(formData.expenseAmount),
        expenseDate: new Date(formData.expenseDate).toISOString() // Proper ISO formatting
      })
        .then(() => {
          // alert('Expense added!');
          // Reset form or other UI updates here
          setFormData({
            expenseName: '',
            expenseAmount: '',
            expenseDate: '',
            createdBy: 'admin'
          });
        })
        .catch(error => {
          console.error("Error adding document: ", error);
          // alert('Error adding expense!');
        });
        setShowModal(false);
        setFormErrors({number: '',
        rent: '',
        rooms: '',
        status: ''});
    } else {
      // Set errors in state if form is not valid
      setFormErrors(errors);
    }

    
  };

  const renderFormLayout = () => {
    switch (formLayout) {
      case 'Add Rooms':
        return (
          <form className="row g-3" onSubmit={handleBoysRoomsSubmit}>
          <div className="col-md-6">
            <label htmlFor="inputNumber" className="form-label">Floor Number</label>
            <input type="text" className="form-control" id="inputNumber" name="floorNumber" value={floorNumber}  onChange={handleRoomsIntegerChange} onInput={e => e.target.value = e.target.value.replace(/[^0-9]/g, '')}/>
            {errors.floorNumber && <div style={{ color: 'red' }}>{errors.floorNumber}</div>}
          </div>
          <div className="col-md-6">
            <label htmlFor="inputRent" className="form-label">Room Number</label>
            <input type="text" className="form-control" id="inputRent" name="roomNumber" value={roomNumber} onChange={handleRoomsIntegerChange} onInput={e => e.target.value = e.target.value.replace(/[^0-9]/g, '')}/>
            {errors.roomNumber && <div style={{ color: 'red' }}>{errors.roomNumber}</div>}
          </div>
          <div className="col-md-6">
            <label htmlFor="inputRooms" className="form-label">Number of Beds</label>
            <input type="text" className="form-control" id="inputRooms" name="numberOfBeds" value={numberOfBeds} onChange={handleRoomsIntegerChange} onInput={e => e.target.value = e.target.value.replace(/[^0-9]/g, '')}/>
            {errors.numberOfBeds && <div style={{ color: 'red' }}>{errors.numberOfBeds}</div>}
          </div>
          <div className="col-md-6">
            <label htmlFor="inputStatus" className="form-label">Bed Rent</label>
            <input type="text" className="form-control" id="inputStatus" name="bedRent" value={bedRent} onChange={handleRoomsIntegerChange} onInput={e => e.target.value = e.target.value.replace(/[^0-9]/g, '')}/>
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
      case 'Add Rent':
        return (
          <form class="row lg-10" onSubmit={handleRentSubmit}>
          <div class='col-12 mb-3'>
            <select id="bedNo" class="form-select" value={selectedTenant} onChange={e => setSelectedTenant(e.target.value)}>
              <option value="">Select a Tenant *</option>
              {availableTenants.map(tenant => (
                <option key={tenant.id} value={tenant.id}>{tenant.name}</option>
              ))}
            </select>
            {errors.selectedTenant && <div style={{ color: 'red' }}>{errors.selectedTenant}</div>}
          </div>
          <div class="col-md-6 mb-3">
            <label htmlFor='roomNo' class="form-label">Room Number:</label>
            <input id="roomNo" class="form-control" type="text" value={roomNumber} readOnly/>
          </div>
          <div class="col-md-6 mb-3">
            <label htmlFor='BedNumber' class="form-label">Bed Number:</label>
            <input id="BedNumber" class="form-control" type="text" value={bedNumber} readOnly />
          </div>
          <div class="col-md-6 mb-3">
            <label htmlFor='TotalFee' class="form-label">Total Fee:</label>
            <input id="TotalFee" class="form-control" type="number" value={totalFee} readOnly />
          </div>
          <div class="col-md-6 mb-3">
            <label htmlFor="PaidAmount" class="form-label">Paid Amount:</label>
            <input id="PaidAmount" class="form-control" type="number" value={paidAmount} onChange={e => setPaidAmount(e.target.value)}/>
            {errors.paidAmount && <div style={{ color: 'red' }}>{errors.paidAmount}</div>}
          </div>
          <div class="col-md-6 mb-3">
            <label htmlFor="Due" class="form-label">Due:</label>
            <input id="Due" class="form-control" type="number" value={due} readOnly />
          </div>
          <div class="col-md-6 mb-3">
            <label htmlFor='DateOfJoin' class="form-label">Date of Join:</label>
            <input id="DateOfJoin" class="form-control" type="date" value={dateOfJoin} readOnly // Make this field read-only since it's auto-populated 
            />
          </div>
          <div class="col-md-6 mb-3">
            <label htmlFor='PaidDate' class="form-label">Paid Date:</label>
            <input
              id="PaidDate"
              class="form-control"
              type="date"
              value={paidDate}
              onChange={e => setPaidDate(e.target.value)}
            />
            {errors.paidDate && <div style={{ color: 'red' }}>{errors.paidDate}</div>}
          </div>
          <div class="col-md-6 mb-3">
            <label htmlFor="DueDate" class="form-label">Due Date:</label>
            <input
              id="DueDate"
              class="form-control"
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
            />
            {errors.dueDate && <div style={{ color: 'red' }}>{errors.dueDate}</div>}
          </div>
          <div class="col-12 text-center mt-2">
            <button type="submit" className="btn btn-warning">{isEditing ? "Update Rent" : "Submit Rent Details"}</button>
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
                {boysRooms.map((room) => (
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
              <input id="tenantName" class="form-control" type="text" value={name} onChange={(e) => setName(e.target.value)} onInput={e => e.target.value = e.target.value.replace(/[^a-zA-Z ]/g, '')}/>
            
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
              <input id="tenantUpload" class="form-control" type="file" onChange={handleTenantImageChange} ref={imageInputRef} required/>
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
          <form className="row 1g-10" onSubmit={expensesHandleSubmit}>
          <div className="col-md-6">
          <label htmlFor="inputExpenseName" className="form-label">Expense Name</label>
          <input type="text" className="form-control" name="expenseName" value={formData.expenseName} onChange={handleInputChange} />
          {formErrors.expenseName && <div className="text-danger">{formErrors.expenseName}</div>}
          </div>
          <div className="col-md-6">
          <label htmlFor="inputRent" className="form-label">Expense amount</label>
          <input type="number"   className="form-control" name="expenseAmount" value={formData.expenseAmount} onChange={handleInputChange} />
          {formErrors.expenseAmount && <div className="text-danger">{formErrors.expenseAmount}</div>}
          </div>
          <div className="col-md-6">
          <label htmlFor="inputRole" className="form-label">Created By</label>
          <select className="form-select" id="inputRole" name="createdBy" value={formData.createdBy} onChange={handleInputChange}>
          <option value="admin">Admin</option>
          <option value="sub-admin">Sub-admin</option>
          </select>
          </div>
          <div className="col-md-6">
          <label htmlFor="inputDate" className="form-label">Expense Date</label>
          <input type="date" className="form-control" name="expenseDate" value={formData.expenseDate} onChange={handleInputChange} />
          {formErrors.expenseDate && <div className="text-danger">{formErrors.expenseDate}</div>}
          </div>

                      <div className="col-12 text-center mt-3">
                   
                          <button  type="submit" className="btn btn-warning">Create</button>
                      
        
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
            <button id="deskaddButton" type="button"  onClick={() =>{ handleClick(item)}}>
                <img src={PlusIcon} alt="plusIcon" className='plusIconProperties' /> {item} </button>
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

