import React, { useState } from 'react';
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
      last_updated_by: "21 Aug 2021",
      edit: {
        icon: false,
        variant: {color:'#ff8a00', radius:'10px'},
        text: 'Edit'
      }
    },
    {
      s_no : 1,
      room_no : 125,
      floor : "1st",
      remarks: "Two Sharing",
      created_by: "Admin",
      last_updated_by: "21 Aug 2021",
      edit: {
        icon: false,
        variant: {color:'#ff8a00', radius:'10px'},
        text: 'Edit'
      }
    },
    {
      s_no : 1,
      room_no : 125,
      floor : "1st",
      remarks: "Two Sharing",
      created_by: "Admin",
      last_updated_by: "21 Aug 2021",
      edit: {
        icon: false,
        variant: {color:'#ff8a00', radius:'10px'},
        text: 'Edit'
      }
    },
    {
      s_no : 1,
      room_no : 125,
      floor : "1st",
      remarks: "Two Sharing",
      created_by: "Admin",
      last_updated_by: "21 Aug 2021",
      edit: {
        icon: false,
        variant: {color:'#ff8a00', radius:'10px'},
        text: 'Edit'
      }
    },
    {
      s_no : 1,
      room_no : 125,
      floor : "1st",
      remarks: "Two Sharing",
      created_by: "Admin",
      last_updated_by: "21 Aug 2021",
      edit: {
        icon: false,
        variant: {color:'#ff8a00', radius:'10px'},
        text: 'Edit'
      }
    },
  ]

  const [showCreateRoomsBoys, setShowCreateRoomsBoys] = useState(false);
  const toggleCreateRoomsBoys = () => {
    setShowCreateRoomsBoys(!showCreateRoomsBoys);
  };

  const handleClick = () => {
    console.log("clicked")
  }

  return (
    <div className='h-100'>
      {!showCreateRoomsBoys ? (
        <>
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
        <div className={
        "ag-theme-quartz"
      }>   
            <Table columns={columns} rows={rows}/>
            {/* <AgGridReact rowData = {rowsData} columnDefs={columns} /> */}
        </div>
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
        </>
      ):(<CreateRoomsBoys />)}
    </div>
  )
}

export default RoomsBoys