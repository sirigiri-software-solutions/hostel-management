import React, { useEffect, useState } from 'react';
import RoomsIcon from '../../images/Icons (2).png';
import SearchIcon from '../../images/Icons (9).png';
import './RoomsBoys.css';
import Table from '../../Elements/Table';
import Button from '../../Elements/Button';
import CreateRoomsBoys from './CreateRoomsBoys';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

const RoomsBoys = () => {
  const columns = [
    'S. No',
    'Room.No',
    'Floor',
    'Remarks',
    'Created By',
    'Last Updated date',
    'Edit'
  ]

  // const [columnsData, setColumnsData] = useState([
  //   {field: "sno"},
  //   {field: "roomno"},
  //   {field: "floor"},
  //   {field: "remarks"},
  //   {field: "createdby"},
  //   {field: "lastupdateddate"},
  //   // {field: "edit"},
  // ]);
  // const [rowsData, setRowsData] = useState([
  //   {sno:1, roomno:125, floor: "1st", remarks:"Two Sharing", createdby:"Admin", lastupdateddate:"21 Aug 2021"},
  //   {sno:2, roomno:125, floor: "1st", remarks:"Two Sharing", createdby:"Admin", lastupdateddate:"21 Aug 2021"},
  //   {sno:3, roomno:125, floor: "1st", remarks:"Two Sharing", createdby:"Admin", lastupdateddate:"21 Aug 2021"},

  // ])

  const rows = [
    {
      s_no : 1,
      room_no : 125,
      floor : "1st",
      remarks: "Two Sharing",
      created_by: "Admin",
      last_updated_by: "13-03-2015",
      edit: {
        icon: false,
        variant: {color:'#ff8a00', radius:'10px'},
        text: 'Edit'
      }
    },
    {
      s_no : 2,
      room_no : 125,
      floor : "1st",
      remarks: "Two Sharing",
      created_by: "Admin",
      last_updated_by: "24-12-2012",
      edit: {
        icon: false,
        variant: {color:'#ff8a00', radius:'10px'},
        text: 'Edit'
      }
    },
    {
      s_no : 3,
      room_no : 125,
      floor : "1st",
      remarks: "Two Sharing",
      created_by: "Admin",
      last_updated_by: "12-05-2021",
      edit: {
        icon: false,
        variant: {color:'#ff8a00', radius:'10px'},
        text: 'Edit'
      }
    },
    {
      s_no : 4,
      room_no : 125,
      floor : "1st",
      remarks: "Two Sharing",
      created_by: "Admin",
      last_updated_by: "20-12-2022",
      edit: {
        icon: false,
        variant: {color:'#ff8a00', radius:'10px'},
        text: 'Edit'
      }
    },
    {
      s_no : 5,
      room_no : 125,
      floor : "1st",
      remarks: "Two Sharing",
      created_by: "Admin",
      last_updated_by: "21-02-2021",
      edit: {
        icon: false,
        variant: {color:'#ff8a00', radius:'10px'},
        text: 'Edit'
      }
    },
  ]

  const [isMobile,setIsMobile]=useState(window.innerWidth<=768);
  const handleResize=() => setIsMobile(window.innerWidth <=760);
  useEffect(()=>{
    const handleResize=() => setIsMobile(window.innerWidth <=760);
    window.addEventListener('resize',handleResize);
    return () =>window.removeEventListener('resize',handleResize)
  },[]);
  const [showCreateRoomsBoys, setShowCreateRoomsBoys] = useState(false);
  const toggleCreateRoomsBoys = () => {
    setShowCreateRoomsBoys(!showCreateRoomsBoys);
     
    
  };

  const handleClick = () => {
    // console.log("clicked")
  }

  return (
    <div className='h-100'>
      
        <div className='d-flex justify-content-between align-items-center'>
            <div className='d-flex align-items-center'>
                <div className='roomlogo-container'>
                    <img src={RoomsIcon} alt="RoomsIcon" className='roomlogo'/>
                </div>
                <h1 className='fs-5'>Rooms Management</h1>
            </div>
            <div>
                <input type="search" placeholder='Search' className='userinput'/>
                <img src={SearchIcon} alt="SearchIcon" className='search-icon'/>
            </div>
            <div>
                <button type="button" className='button' onClick={toggleCreateRoomsBoys}>Add Rooms</button>
            </div>
        </div>
        {!showCreateRoomsBoys &&(
          <div>
          {isMobile ? (
           <div className='cards-view'>
            {
               rows.map((row, index) => (
                <div className="card" key={index}>
                     <p><strong>S.No</strong> {row.s_no}</p>
                    {/* <p><strong>column</strong> {row.floor}</p> */}
                    <p><strong>Room.no:</strong>{row.room_no} </p>
                    <p><strong>Floor:</strong> {row.floor}</p>
                    <p><strong>Remark:</strong> {row.remarks}</p>
                    <p><b>Created_By</b>{row.created_by}</p>
                    <p><b>Last-Updated-By</b>{row.last_updated_by}</p>
                    <p><b>Payment Date</b>{row.payment_date}</p>
                    <button className="editbtn">Edit{row.edit.text}</button>
                    </div>
                    ))
          }
            
          </div>
        ):(
        <div className=
        "ag-theme-quartz">   
            <Table columns={columns} rows={rows}/>
            {/* <AgGridReact rowData = {rowsData} columnDefs={columns} /> */}
        </div>
        )}
      </div>
        )}
        <div className='d-flex justify-content-end mt-2'>
              <Button
                onClick={handleClick}
                icon={false}
                variant={{ color: '#ff8a00', radius: '10px', padding: "1px" }}
                text={'0'}
              />
            <span className='btn btn-outline-dark m-1'>1</span>
            <span className='btn btn-outline-dark m-1'>2</span>
            <span className='btn btn-outline-dark m-1'>...</span>
            <span className='btn btn-outline-dark m-1'>10</span>
        </div>
      {  
      showCreateRoomsBoys && <CreateRoomsBoys />
}
    </div>

    
  )
}

export default RoomsBoys