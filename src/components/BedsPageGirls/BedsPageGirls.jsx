import React, {useEffect, useState} from 'react'
import bedIcon from '../../images/Icons (3).png'
import Table from '../../Elements/Table'
import SearchIcon from '../../images/Icons (9).png'
import {database, ref, push} from '../../firebase'
import { onValue } from 'firebase/database'
import "../BedsPageBoys/BedsPageBoys.css"
import { useData } from '../../ApiData/ContextProvider';

const BedsPageGirls = () => {
  const { activeGirlsHostel } = useData();
  const [girlsRooms, setGirlsRooms]= useState([])
  const [bedsData, setBedsData] = useState([]);
  const [tenants, setTenants] = useState([]);

  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('');
  const [selectedRoomNo,setSelectedRoomNo] = useState('');
  const [roomNumbersToShow,setRoomNumbersToShow] = useState([]);
  const [floorNumbersToShow,setFloorNumbersToShow] = useState([]);

  useEffect(() => {
    const roomsRef = ref(database, `Hostel/girls/${activeGirlsHostel}/rooms`);
    onValue(roomsRef, (snapshot) => {
      const data = snapshot.val();
      const loadedRooms = [];
      for (const key in data) {
        loadedRooms.push({
          id: key,
          ...data[key]
        });
      }
      setGirlsRooms(loadedRooms);
    })
  }, [activeGirlsHostel]);
  // Fetch tenants data
  useEffect(() => {
    const tenantsRef = ref(database, `Hostel/girls/${activeGirlsHostel}/tenants`);
    onValue(tenantsRef, (snapshot) => {
      const data = snapshot.val();
      const loadedTenants = [];
      for (const key in data) {
        loadedTenants.push({
          id: key,
          ...data[key]
        });
      }
      setTenants(loadedTenants);
    });
  }, [activeGirlsHostel]);

  // Construct beds data based on rooms and tenants
  useEffect(() => {
    if (!girlsRooms || girlsRooms.length === 0) {
      // If rooms are not defined or the array is empty, clear bedsData and exit early
      setBedsData([]);
      return;
    }

    const allBeds = girlsRooms.flatMap(room => {
      return Array.from({ length: room.numberOfBeds }, (_, i) => {
        const bedNumber = i + 1;
        // Find if there's a tenant for the current bed
        const tenant = tenants.find(tenant => tenant.roomNo === room.roomNumber && tenant.bedNo === String(bedNumber));
        const tenantName = tenant ? tenant.name :"-";
        return {
          name:tenantName,
          floorNumber: room.floorNumber,
          roomNumber: room.roomNumber,
          bedNumber: bedNumber,
          rent: room.bedRent || "N/A", // Assuming rent is provided by the tenant data
          status: tenant ? "Occupied" : "Unoccupied"
        };
      });
    });
    setBedsData(allBeds);
    const allFloornumbers = girlsRooms.map(each => (
      each.floorNumber
    ))
 
    const uniqueFloornumbers = [...new Set(allFloornumbers)];
    setFloorNumbersToShow(uniqueFloornumbers);

    return () => {
      setSelectedStatus('');
      setSelectedFloor('');
      setSelectedRoomNo('');
      setRoomNumbersToShow([]);
  };


  }, [girlsRooms, tenants, activeGirlsHostel]); // Depend on rooms and tenants data


  const columns = [
    'S. No',
    'Name',
    'Bed Number',
    'Room. No',
    'Floor',
    'Rent',
    'Status'
  ]

  const rows = bedsData.map((beds, index) => ({
    s_no: index + 1,
    name:beds.name,
    bed_number:beds.bedNumber,
    room_no:beds.roomNumber,
   floor:beds.floorNumber,
   rent:beds.rent,
   status:beds.status
  }));

  const [searchValue,setSearchValue] = useState("");

  const onChangeSearch = (e) => {
    setSearchValue(e.target.value);
  }

  const onChangeStatus = (e) => {
    setSelectedStatus(e.target.value);
  };

  const onChangeFloor = (e) => {
    setSelectedFloor(e.target.value);
    setSelectedRoomNo(''); 
    const filteredRows = rows.filter((row)=> (
      row.floor === e.target.value
    ))
    const uniqueRoomNumbers = [...new Set(filteredRows.map(row => row.room_no))];
    console.log(uniqueRoomNumbers,"filteredRows")
    setRoomNumbersToShow(uniqueRoomNumbers);
  };
  const onChangeRoomNo = (e) => {
    setSelectedRoomNo(e.target.value);
  }

  const compareFloor = (floor1, floor2) => {
    // Check if both floors are purely numeric
    const isNumericFloor = /^\d+$/.test(floor1) && /^\d+$/.test(floor2);
  
    if (isNumericFloor) {
      // If both floors are numeric, compare them as numbers
      const numericPart1 = parseInt(floor1);
      const numericPart2 = parseInt(floor2);
      return numericPart1 - numericPart2;
    } else {
      // If floors are not purely numeric, compare them as alphanumeric identifiers
      const prefix1 = floor1.charAt(0);
      const prefix2 = floor2.charAt(0);
  
      // Compare alphanumeric identifiers
      if (prefix1 !== prefix2) {
        return prefix1.localeCompare(prefix2);
      }
  
      // Compare numeric parts if alphanumeric identifiers are the same
      const numericPart1 = parseInt(floor1.substring(1));
      const numericPart2 = parseInt(floor2.substring(1));
  
      return numericPart1 - numericPart2;
    }
  };


  const filteredRows = rows.filter((row) => {
    return (
      (selectedStatus === '' || row.status === selectedStatus) &&
      (selectedFloor === '' || compareFloor(row.floor,selectedFloor) === 0)  &&
      (selectedRoomNo === '' || parseInt(row.room_no) === parseInt(selectedRoomNo)) &&
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  });
 

  return (
    <div className='h-100'>
      
    <>
    <div className="row d-flex flex-wrap align-items-center justify-content-between">
      <div className="col-12 col-md-4 d-flex align-items-center mr-5 mb-2">
        <div className='roomlogo-container'>
          <img src={bedIcon} alt="RoomsIcon" className='roomlogo'/>
        </div>
        <h1 className='management-heading'>Beds Management</h1>
      </div>
      <div className="col-12 col-md-4 search-wrapper">
        <input onChange={onChangeSearch} value={searchValue} type="text" placeholder='Search' className='search-input'/>
        <img src={SearchIcon} alt="search-icon" className='search-icon'/>
      </div>
      <div className='col-12 col-md-4 d-flex mt-2 justify-content-md-end'>
        <div className='d-flex filterDropDownContainer'>
      <select className="col-4 bedPageFilterDropdown" value={selectedStatus} onChange={onChangeStatus}>
            <option value="">Status</option>
            <option value="Occupied">Occupied</option>
            <option value="Unoccupied">Unoccupied</option>
          </select>
          <select className="col-4 bedPageFilterDropdown" value={selectedFloor} onChange={onChangeFloor}>
            <option value="">Floor number</option>
            {
              floorNumbersToShow.map((floor) => (
                <option key={floor} value={floor}>
                  {floor}
                </option>
              ))
            }
          </select>
          <select className='col-4 bedPageFilterDropdown' value={selectedRoomNo} onChange={onChangeRoomNo}>
            <option value="">Room number</option>
            {roomNumbersToShow.map((room) => (
              <option key={room} value={room}>
                {room}
              </option>
            ))}
            
          </select>
          </div>
      </div>
     
    </div>

    <div>   
        <Table columns={columns} rows={filteredRows}/>
    </div>

    <div class="modal fade" id="exampleModalBedsGirls" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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

export default BedsPageGirls