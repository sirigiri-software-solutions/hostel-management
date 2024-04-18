import React, { useContext, useEffect } from 'react'
import RentIcon from '../../images/Icons (6).png'
import SearchIcon from '../../images/Icons (9).png'
import Table from '../../Elements/Table'
import { database, push, ref } from "../../firebase";
import { useState } from 'react'
import { DataContext } from '../../ApiData/ContextProvider';
import { onValue, update } from 'firebase/database';

const RentPageGirls = () => {
  const { data } = useContext(DataContext);
  // console.log(data && data, 'rentsBoysApi')
  const [searchQuery, setSearchQuery] = useState('');

  const [tenants, setTenants] = useState([]);
  const [rooms, setRooms] = useState({});
  const [selectedTenant, setSelectedTenant] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [bedNumber, setBedNumber] = useState('');
  const [totalFee, setTotalFee] = useState('');
  const [paidAmount, setPaidAmount] = useState('');
  const [due, setDue] = useState('');
  const [tenantsWithRents, setTenantsWithRents] = useState([]);
  const [paidDate, setPaidDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingRentId, setEditingRentId] = useState(null);
  const [errors, setErrors] = useState({});
  const [availableTenants, setAvailableTenants] = useState([]);
  const [dateOfJoin, setDateOfJoin] = useState()

  useEffect(() => {
    // Fetch tenants data once when component mounts
    const tenantsRef = ref(database, 'Hostel/girls/tenants');
    onValue(tenantsRef, (snapshot) => {
      const data = snapshot.val();
      const loadedTenants = data ? Object.keys(data).map(key => ({
        id: key,
        ...data[key],
      })) : [];
      setTenants(loadedTenants);
    });

    // Fetch room data once when component mounts
    const roomsRef = ref(database, 'Hostel/girls/rooms');
    onValue(roomsRef, (snapshot) => {
      const data = snapshot.val() || {};
      setRooms(data);
    });
  }, []);


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
    const tenantsRef = ref(database, 'Hostel/girls/tenants');
    onValue(tenantsRef, (snapshot) => {
      const tenantsData = snapshot.val();
      const tenantIds = tenantsData ? Object.keys(tenantsData) : [];

      // Initialize an array to hold promises for fetching each tenant's rents
      const rentsPromises = tenantIds.map(tenantId => {
        return new Promise((resolve) => {
          const rentsRef = ref(database, `Hostel/girls/tenants/${tenantId}/rents`);
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

  // edit======================
  const loadRentForEditing = (tenantId, rentId) => {
    const tenant = tenantsWithRents.find(t => t.id === tenantId);
    const rentRecord = tenant.rents.find(r => r.id === rentId);

    if (rentRecord) {
      setSelectedTenant(tenantId);
      setRoomNumber(rentRecord.roomNumber || '');
      setBedNumber(rentRecord.bedNumber || '');
      setTotalFee(rentRecord.totalFee || '');
      setPaidAmount(rentRecord.paidAmount || '');
      setDue(rentRecord.due || '');
      setPaidDate(rentRecord.paidDate || '');
      setDueDate(rentRecord.dueDate || '');
      setIsEditing(true);
      setEditingRentId(rentId);
    }
  };

  const validateForm = () => {
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


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before proceeding
    if (!validateForm()) {
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
      const rentRef = ref(database, `Hostel/girls/tenants/${selectedTenant}/rents/${editingRentId}`);
      await update(rentRef, rentData);
    } else {
      // Create a new rent record
      const rentRef = ref(database, `Hostel/girls/tenants/${selectedTenant}/rents`);
      await push(rentRef, rentData);
    }

    resetForm();
  };

  //===> For Clear Form for Add Rents
  const handleAddNew = () => {
    // Reset any previous data
    resetForm();
    // Set modal for a new entry
    setIsEditing(false);
    // Open the modal
    // setShowModal(true);
  };
  const resetForm = () => {
    setSelectedTenant('');
    setRoomNumber('');
    setBedNumber('');
    setTotalFee('');
    setPaidAmount('');
    setDue('');
    setPaidDate('');
    setDueDate('');
    setIsEditing(false);
    setEditingRentId(null);
    setErrors({});
  };

  // let rentsData = [];

  // if (data !== null && data !== undefined && data.girls && data.girls.tenants) {
  //   console.log(data,"know data")
  //   const rentsBoysData = data.girls.tenants;
  //   // console.log(rentsBoysData,"fetched all data")
  //   // console.log(Object.values(rentsBoysData),"eachData")
  //   for(let each of Object.values(rentsBoysData)){
  //     if(each.rents !== undefined){
  //     //   rentsData = Object.values(rentsBoysData).map(entry => Object.values(entry.rents))
  //          rentsData.push(Object.values(each.rents));
  //     //   console.log(rentsData,"see")
  //     }
  //     // console.log(each.rents,"rentsDefined")
  //   }
  // } else {
  //   console.error("Data structure mismatch or data is not available:", data);
  // }


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

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value
  //   });
  // };


  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

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
    'Room.No',
    'Person Name',
    'Person Mobile',
    'Bed No',
    'Rent',
    'Due Date',
    'Last Fee',
    'Status',
    'update'
  ];


  const rows = tenantsWithRents.flatMap((tenant, index) => tenant.rents.map(rent => ({
    s_no: index + 1,
    room_no: rent.roomNumber,
    person_name: tenant.name,
    person_mobile: tenant.mobileNo,
    bed_no: rent.bedNumber,
    rent: "Rs. " + rent.totalFee,
    due_date: rent.dueDate,
    last_fee: rent.paidDate,
    status: rent.status === 'Unpaid' ? 'Unpaid' : 'Paid',
    actions: <button
    style={{ backgroundColor: '#ff8a00', padding:'4px', borderRadius: '5px', color: 'white', border: 'none', }}
    onClick={() => loadRentForEditing(tenant.id, rent.id)}
    data-bs-toggle="modal"
    data-bs-target="#exampleModalRGirls"
  >
    update
  </button>,
  })));


  // const flatRentsData = rentsData.flat();
  // const rows = flatRentsData.map((rentData, index) => {

  //   const tenantInfo = Object.values(data.girls.tenants).find(tenant => tenant.bedNo === rentData.bedNumber);

  //   return {
  //     s_no: index + 1,
  //     room_no: rentData.roomNumber,
  //     person_name: tenantInfo.name ,
  //     person_mobile: tenantInfo.mobileNo ,
  //     bed_no: rentData.bedNumber,
  //     rent: "Rs. " + rentData.totalFee,
  //     due_date: rentData.dueDate,
  //     last_fee: rentData.paidDate, 
  //     edit: {
  //         icon: false,
  //         variant: { color: rentData.status === 'Unpaid' ? '#f71313' : '#166919', radius: '10px' },
  //         text: rentData.status === 'Unpaid' ? 'Unpaid' : 'Paid'
  //     }
  //   };
  // });



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
              <img src={RentIcon} alt="RoomsIcon" className='roomlogo' />
            </div>
            <h1 className='fs-5'>Rents Management</h1>
          </div>
          <div className="col-6 col-md-4 search-wrapper">
            <input type="text" placeholder='Search' className='search-input' value={searchQuery}
              onChange={handleSearch} />
            <img src={SearchIcon} alt="search-icon" className='search-icon' />
          </div>
          <div className="col-6 col-md-4 d-flex justify-content-end">
            <button type="button" class="add-button" data-bs-toggle="modal" onClick={handleAddNew} data-bs-target="#exampleModalRGirls">
              Add Rents
            </button>
          </div>
        </div>

        <div>
          <Table columns={columns} rows={filteredRows} />
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
                      <select value={selectedTenant} onChange={e => setSelectedTenant(e.target.value)}>
                        <option value="">Select a Tenant</option>
                        {availableTenants.map(tenant => (
                          <option key={tenant.id} value={tenant.id}>{tenant.name}</option>
                        ))}
                      </select>
                      {errors.selectedTenant && <div style={{ color: 'red' }}>{errors.selectedTenant}</div>}
                    </div>
                    <br /><br />

                    <label>Room Number:</label>
                    <input type="text" value={roomNumber} readOnly />
                    <br /><br />

                    <label>Bed Number:</label>
                    <input type="text" value={bedNumber} readOnly /><br /><br />
                    <label>Total Fee:</label>
                    <input type="number" value={totalFee} readOnly /><br /><br />
                    <div>
                      <label>Paid Amount:</label>
                      <input type="number" value={paidAmount} onChange={e => setPaidAmount(e.target.value)} />
                      {errors.paidAmount && <div style={{ color: 'red' }}>{errors.paidAmount}</div>}
                      <br /><br />
                    </div>
                    <label>Due:</label>
                    <input type="number" value={due} readOnly /><br /><br />
                    <div>
                      <label>Date of Join:</label>
                      <input
                        type="date"
                        value={dateOfJoin}
                        readOnly // Make this field read-only since it's auto-populated
                      />
                      <br /><br />
                    </div>
                    <div>
                      <label>Paid Date:</label>
                      <input
                        type="date"
                        value={paidDate}
                        onChange={e => setPaidDate(e.target.value)}
                      />
                      {errors.paidDate && <div style={{ color: 'red' }}>{errors.paidDate}</div>}
                      <br /><br />
                    </div>
                    <div>
                      <label>Due Date:</label>
                      <input
                        type="date"
                        value={dueDate}
                        onChange={e => setDueDate(e.target.value)}
                      />
                      {errors.dueDate && <div style={{ color: 'red' }}>{errors.dueDate}</div>}
                      <br /><br />
                    </div>
                    <button type="submit">{isEditing ? "Update Rent" : "Submit Rent Details"}</button>
                  </form>
                </div>
              </div>
             
            </div>
          </div>
        </div>


      </>
    </div>
  )
}

export default RentPageGirls