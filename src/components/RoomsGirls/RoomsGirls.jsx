import React, { useState } from 'react'
import RoomsIcon from '../../images/Icons (2).png'
import SearchIcon from '../../images/Icons (9).png'
import './RoomsGirls.css'
import Table from '../../Elements/Table'
import Button from '../../Elements/Button'
import CreateRoomsGirls from './CreateRoomsGirls'

const RoomsGirls = () => {
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

  const [showCreateRoomsGirls, setShowCreateRoomsGirls] = useState(false);

  const toggleCreateRoomsGirls = () => {
    setShowCreateRoomsGirls(!showCreateRoomsGirls);
  };

  const handleClick = () => {
    console.log("clicked")
  }

  return (
    <div className='h-100'>
      {!showCreateRoomsGirls ? (
        <>
        <div className='d-flex justify-content-between align-items-center'>
            <div className='d-flex align-items-center'>
                <div className='roomlogo-container'>
                    <img src={RoomsIcon} alt="RoomsIcon" className='roomlogo'/>
                </div>
                <h1 className='fs-5'>Rooms Management</h1>
            </div>
            <div>
                <input type="text" placeholder='Search' className='userinput'/>
                <img src={SearchIcon} alt="SearchIcon" className='search-icon'/>
            </div>
            <div>
                <button type="button" className='button' onClick={toggleCreateRoomsGirls}>Add Rooms</button>
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
      ):(<CreateRoomsGirls />)}
    </div>
  )
}

export default RoomsGirls