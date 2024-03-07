import React, { useState } from 'react'
import RoomsIcon from '../../images/Icons (2).png'
import SearchIcon from '../../images/Icons (9).png'
import './RoomsBoys.css'
import Table from '../../Elements/Table'
import Button from '../../Elements/Button'
import CreateRoomsBoys from './CreateRoomsBoys'

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
            <div style={{position:"relative", display:"flex", justifyContent:"center", alignItems:"center"}}>
                <input type="text" placeholder='Search' className='userinput'/>
                <img src={SearchIcon} alt="search-icon" style={{position:"absolute", right:"10px", width:"20px"}}/>
            </div>
            <div>
                <button type="button" className='button' onClick={toggleCreateRoomsBoys}>Add Rooms</button>
            </div>
        </div>
        <div className="table-container rounded-table">   
            <Table columns={columns} rows={rows}/>
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