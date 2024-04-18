import React, { useEffect, useState } from 'react';
import Rooms from '../../images/Icons (2).png'
import Beds from '../../images/Icons (3).png'
import Tenants from '../../images/Icons (4).png'
import Expenses from '../../images/Icons (5).png'
import './DashboardBoys.css'
import SmallCard from '../../Elements/SmallCard'
import './DashboardBoys.css';
import PlusIcon from "../../images/Icons (8).png"
//import PlusIcon from '../../images/Icons (8).png'

// const DashboardBoys = () => {
//   const [btn, setBtn] = useState(false);
//   const menu = [
//     {
//       image: Rooms,
//       heading: "Total Rooms",
//       number: 25,
//       btntext: "Add Rooms",
//     },
//     {
//       image: Beds,
//       heading: "Total Beds",
//       number: 86,
//       btntext: "Add Beds",
//     },
//     {
//       image: Tenants,
//       heading: "Total Tenants",
//       number: 25,
//       btntext: "Add Tenants",
//     },
//     {
//       image: Expenses,
//       heading: "Total Expenses",
//       number: 28635,
//       btntext: "Add Expenses",
//     },
//   ];

//   const handleClick = () => {
//     console.log("button clicked");
//   };

//   const Buttons = ['Add Rooms', 'Add Beds', 'Add Tenants', 'Add Expenses'];

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 576) {
//         setBtn(true);
//       } else {
//         setBtn(false);
//       }
//     };
//     handleResize();
//     window.addEventListener('resize', handleResize);
//   }, []);

//   return (
//     <div className='dashboardboys'>
//       <h1 className='heading'>Men's</h1>

//       <div className='menu'>
//         {btn ? (
//           menu.map((item, index) => (
//             <React.Fragment key={index}>
//               <SmallCard index={index} item={item} />
//               <Button 
//                 variant={{ color: '#ff8a00', radius: '20px', padding: '8px 24px',margin:"5px"}}
//                 text={item.btntext}
//                 icon={true}
//               />
              
//             </React.Fragment>
//           ))
//         ) : (
//           <React.Fragment>
//          { menu.map((item, index) => (
//             <SmallCard key={index} index={index} item={item} />
//           ))}
//          <div className='button-container'> 
//         {Buttons?.map((item, index) => (
//           <Button className='btn'
//             key={index}
//             onClick={handleClick}
//             icon={true}
//             variant={{ color: '#ff8a00', radius: '20px', padding: '8px 24px'}}
//             text={item}
//           />
          
//         ))}
//          </div> 
//          </React.Fragment>
//          )}
//       </div>
//     </div>
//   );
// };

// export default DashboardBoys;

 
 
const DashboardBoys = () => {
  // const [btn, setBtn] = useState(false);
  const [modelText, setModelText] = useState('');
  const [formLayout, setFormLayout] = useState('');
 
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
      number: 25,
      btntext: 'Add Rooms',
    },
    {
      image: Beds,
      heading: 'Total Beds',
      number: 86,
      btntext: 'Add Beds',
    },
    {
      image: Tenants,
      heading: 'Total Tenants',
      number: 25,
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
  };
 
  const handleCloseModal = () => {
    setModelText('');
    setFormLayout('');
    resetForm();
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
    switch(formLayout){
      case 'Add Rooms':
        return(
          <form class="row g-3">
          <div class="col-md-6">
            <label for="inputslno" class="form-label">S.No</label>
            <input type="number" class="form-control" id="inputslno"/>
          </div>
          <div class="col-md-6">
            <label for="inputRoomNo" class="form-label">Room No</label>
            <input type="number" class="form-control" id="inputRoomNo"/>
          </div>
          <div class="col-md-6">
            <label for="inputfloor" class="form-label">Floor</label>
            <input type="number" class="form-control" id="inputfloor"/>
          </div>
          <div class="col-md-6">
            <label for="inputRemarks" class="form-label">Remarks</label>
            <input type="text" class="form-control" id="inputRemarks"/>
          </div>
          <div class="col-md-6">
          <label for="inputcreatedby" class="form-label">Created By</label>
            <input type="text" class="form-control" id="inputcreatedby"/>
          </div>
          <div class="col-md-6">
          <label for="inputupdatedDate" class="form-label">Date</label>
            <input type="date" class="form-control" id="inputupdatedDate"/>
          </div>
 
         
    </form>
        )
      case 'Add Beds':
        return (
          <form class="row g-3">
          <div class="col-md-6">
            <label for="inputslno" class="form-label">S.No</label>
            <input type="number" class="form-control" id="inputslno"/>
          </div>
          <div class="col-md-6">
            <label for="inputBedNum" class="form-label">Bed Number</label>
            <input type="number" class="form-control" id="inputBedNum"/>
          </div>
          <div class="col-md-6">
            <label for="inputroomNo" class="form-label">Room No</label>
            <input type="number" class="form-control" id="inputroomNo"/>
          </div>
          <div class="col-md-6">
            <label for="inputfloor" class="form-label">Floor</label>
            <input type="number" class="form-control" id="inputfloor"/>
          </div>
          <div class="col-md-6">
            <label for="inputRemarks" class="form-label">Rent</label>
            <input type="number" class="form-control" id="inputRemarks"/>
          </div>
          <div class="col-md-6">
          <label for="inputupdatedDate" class="form-label">Date</label>
            <input type="date" class="form-control" id="inputupdatedDate"/>
          </div>
 
         
    </form>
        )
      case 'Add Tenants':
        return (
          // <form class="row lg-10">
          //   <div class="col-md-6">
          //     <label for="inputslno" class="form-label">S.No</label>
          //     <input type="number" class="form-control" id="inputslno" />
          //   </div>
          //   <div class="col-md-6">
          //     <label for="inputImage" class="form-label">Image</label>
          //     <input type="file" class="form-control" id="inputImage" />
          //   </div>
          //   <div class="col-md-6">
          //     <label for="inputName" class="form-label">Name</label>
          //     <input type="text" class="form-control" id="inputName" />
          //   </div>
          //   <div class="col-md-6">
          //     <label for="inputDocumentType" class="form-label">ID</label>
          //     <select class="form-select" id="inputDocumentType">
          //       <option value="">Select Document Type</option>
          //       <option value="aadhar">Aadhar Card</option>
          //       <option value="pan">PAN</option>
          //     </select>
          //   </div>
          //   <div class="col-md-6">
          //     <label for="inputMbNo" class="form-label">Mobile No</label>
          //     <input type="tel" pattern="[0-9]" class="form-control" id="inputMbNo" />
          //   </div>
          //   <div class="col-md-6">
          //     <label for="inputRoomNo" class="form-label">Room No</label>
          //     <input type="number" class="form-control" id="inputRoomNo" />
          //   </div>
          // </form>
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
          <div class="col-md-6">
              <label for="inputDocumentType" class="form-label">ID</label>
              <select class="form-select" id="inputDocumentType">
              <option value="">Select Document Type</option>
                <option value="aadhar">Aadhar Card</option>
                <option value="pan">PAN</option>
              </select>
            </div>
          <div class="col-md-6">
            <label for="inputMbNo" class="form-label">Mobile No</label>
            <input type="tel" pattern="[0-9]" class="form-control" id="inputMbNo"/>
          </div>
          <div class="col-md-6">
            <label for="inputRoomNo" class="form-label">Room No</label>
            <input type="number" class="form-control" id="inputRoomNo"/>
          </div>
    </form>
    )
 
      case "Add Expenses":
        return (
          <form class="row lg-10">
          <div class="col-md-6">
            <label for="inputName" class="form-label">Name</label>
            <input type="text" class="form-control" id="inputName"/>
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
            <input type="number" pattern="[0-9]" class="form-control" id="inputYear"/>
          </div>
 
          <div class="col-md-6">
            <label for="inputRoomNo" class="form-label">Due Date</label>
            <input type="date" class="form-control" id="inputRoomNo"/>
          </div>
 
          <div class="col-md-6">
            <label for="inputAmount" class="form-label">Amount</label>
            <input type="number" class="form-control" id="inputAmount"/>
          </div>
 
          <div class="col-md-6">
            <label for="inputNum" class="form-label">Number</label>
            <input type="tel" class="form-control" id="inputNum"/>
          </div>
 
          <div class="col-md-6">
            <label for="inputCreatedON" class="form-label">Created on</label>
            <input type="dal" class="form-control" id="inputCreatedON"/>
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
            {/* {btn ?
          (
            menu.map((item, index) => (
              <React.Fragment key={index}>
                <SmallCard index={index} item={item} />
                <button id="addButton" key={index} onClick={() => handleClick(item.btntext)} type="button" className="btn" data-bs-toggle="modal" data-bs-target="#exampleModalBoysDashboard"><img src={PlusIcon} alt="plusIcon" className='plusIconProperties' />{item.btntext}</button>
              </React.Fragment>
            ))
          )
          :
          (
              <React.Fragment>
                { menu.map((item, index) => (
                      <SmallCard key={index} index={index} item={item} />
                     
                ))}
                <div className='button-container'>
                    {Buttons?.map((item, index) => (
                        <button id="addButton" key={index} onClick={() => handleClick(item)} type="button" className="btn" data-bs-toggle="modal" data-bs-target="#exampleModalBoysDashboard"><img src={PlusIcon} alt="plusIcon" className='plusIconProperties' /> {item}</button>
                    ))}
                </div>
              </React.Fragment>
          )}   */}

        {menu.map((item, index) => (
          <>
            <SmallCard key={index} index={index} item={item} />
            <button id="mbladdButton" key={index} onClick={() => handleClick(item.btntext)} type="button" className="btn" data-bs-toggle="modal" data-bs-target="#exampleModalBoysDashboard"><img src={PlusIcon} alt="plusIcon" className='plusIconProperties' />{item.btntext}</button>
          </>
        ))}
        <div className='button-container'>
          {Buttons?.map((item, index) => (
            <button id="deskaddButton" key={index} onClick={() => handleClick(item)} type="button" className="btn" data-bs-toggle="modal" data-bs-target="#exampleModalBoysDashboard"><img src={PlusIcon} alt="plusIcon" className='plusIconProperties' /> {item}</button>
          ))}
        </div>
      </div>
 
      {/* popup model */}
      <div class="modal fade" id="exampleModalBoysDashboard" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">{modelText}</h1>
              <button onClick={handleCloseModal} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
               {renderFormLayout()} 
            </div>
            {/* <div class="modal-footer">
              <button onClick={handleCloseModal} type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>  */}
          </div>
        </div>
      </div>
 
    </div>
   
  );
};
 
export default DashboardBoys;
 
