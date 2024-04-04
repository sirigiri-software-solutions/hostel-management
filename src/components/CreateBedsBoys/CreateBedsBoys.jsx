import React, { useState } from 'react'
import bedIcon from '../../images/Icons (3).png'
import Table from '../../Elements/Table'
import BedsBoys from './BedsBoys'
import Button from '../../Elements/Button'
//import CreateBedsBoys from './CreateBedsBoys'

const CreateBedsBoys = () => {
  const columns = [
    'S. No',
    'Bed Number',
    'Room. No',
    'Floor',
    'Rent',
    'Last Updated date',
    'Status'
  ]

  const rows = [
    {
      s_no : 1,
      bed_number : 2,
      room_no : 125,
      floor: "1st",
      rent: "Rs. 5000",
      last_updated_by: "21 Aug 2021",
      edit: {
        icon: false,
        variant: {color:'#ff8a00', radius:'10px'},
        text: 'Occupied'
      }
    },
    {
      s_no : 2,
      bed_number : 2,
      room_no : 125,
      floor: "1st",
      rent: "Rs. 5000",
      last_updated_by: "21 Aug 2021",
      edit: {
        icon: false,
        variant: {color:'#ff8a00', radius:'10px'},
        text: 'Occupied'
      }
    },
    {
      s_no : 1,
      bed_number : 2,
      room_no : 125,
      floor: "1st",
      rent: "Rs. 5000",
      last_updated_by: "21 Aug 2021",
      edit: {
        icon: false,
        variant: {color:'#ff8a00', radius:'10px'},
        text: 'Occupied'
      }
    },
    {
      s_no : 1,
      bed_number : 2,
      room_no : 125,
      floor: "1st",
      rent: "Rs. 5000",
      last_updated_by: "21 Aug 2021",
      edit: {
        icon: false,
        variant: {color:'#ff8a00', radius:'10px'},
        text: 'Occupied'
      }
    },
    {
      s_no : 1,
      bed_number : 2,
      room_no : 125,
      floor: "1st",
      rent: "Rs. 5000",
      last_updated_by: "21 Aug 2021",
      edit: {
        icon: false,
        variant: {color:'#ff8a00', radius:'10px'},
        text: 'Occupied'
      }
    },
  ]
  const [showCreateRoomBoys,setShowcreateRoomBoys]=useState(false)
  const togglecreateRoomboys=()=>{
   setShowcreateRoomBoys(!showCreateRoomBoys)
  }

  return (
    <div className='h-100'>
      {!showCreateRoomBoys ?(
      <>
        <div className='d-flex justify-content-between align-items-center'>
            <div className='d-flex align-items-center'>
                <div className='roomlogo-container'>
                    <img src={bedIcon} alt="RoomsIcon" className='roomlogo'/>
                </div>
                <h1 className='fs-5'>Rooms Management</h1>
            </div>
            <div>
                <input type="search" placeholder='Search' className='userinput'/>
            </div>
            <div>
                <button type="button" className='button' onClick={togglecreateRoomboys}>Add Rooms</button>
            </div>
        </div>
        <div className="table-container rounded-table">   
            <Table columns={columns} rows={rows}/>
        </div>
        <div className='d-flex justify-content-end mt-2'>
              <Button
                
                icon={false}
                variant={{ color: '#ff8a00', radius: '10px', padding: "1px" }}
                text={'0'}
              />
        <div className='d-flex justify-content-end mt-2'>
            <span className='btn btn-outline-dark m-1'>1</span>
            <span className='btn btn-outline-dark m-1'>2</span>
            <span className='btn btn-outline-dark m-1'>...</span>
            <span className='btn btn-outline-dark m-1'>10</span>
        </div>
        </div>
        
        </>
      ):(<BedsBoys/>)}
    </div>
  )
}

export default CreateBedsBoys;