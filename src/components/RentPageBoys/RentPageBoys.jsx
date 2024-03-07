import React from 'react'
import Table from '../../Elements/Table'
import Button from '../../Elements/Button'
import RentIcon from '../../images/Icons (6).png'
import SearchIcon from '../../images/Icons (9).png'
import { useState } from 'react'
import CreateRentsBoys from './CreateRentsBoys'

const RentPageBoys = () => {
  const columns = [
    'S. No',
    'Room.No',
    'Person Name',
    'Person Mobile',
    'Bed No',
    'Rent',
    'Due Date',
    'Last Fee',
    'Status'
  ]

  const rows = [
    {
      s_no : 1,
      room_no : 125,
      person_name : "ABCD",
      person_mobile : "+91 9087654321",
      bed_no : 2,
      rent : "Rs. 5000",
      due_date : "21 sep 2021",
      last_fee : "21 Aug 2021",
      edit: {
        icon: false,
        variant: {color:'#f71313', radius:'10px'},
        text: 'Unpaid'
      }
    },
    {
      s_no : 1,
      room_no : 125,
      person_name : "ABCD",
      person_mobile : "+91 9087654321",
      bed_no : 2,
      rent : "Rs. 5000",
      due_date : "21 sep 2021",
      last_fee : "21 Aug 2021",
      edit: {
        icon: false,
        variant: {color:'#166919', radius:'10px'},
        text: 'paid'
      }
    },
    {
      s_no : 1,
      room_no : 125,
      person_name : "ABCD",
      person_mobile : "+91 9087654321",
      bed_no : 2,
      rent : "Rs. 5000",
      due_date : "21 sep 2021",
      last_fee : "21 Aug 2021",
      edit: {
        icon: false,
        variant: {color:'#166919', radius:'10px'},
        text: 'paid'
      }
    },
    {
      s_no : 1,
      room_no : 125,
      person_name : "ABCD",
      person_mobile : "+91 9087654321",
      bed_no : 2,
      rent : "Rs. 5000",
      due_date : "21 sep 2021",
      last_fee : "21 Aug 2021",
      edit: {
        icon: false,
        variant: {color:'#166919', radius:'10px'},
        text: 'paid'
      }
    },
    {
      s_no : 1,
      room_no : 125,
      person_name : "ABCD",
      person_mobile : "+91 9087654321",
      bed_no : 2,
      rent : "Rs. 5000",
      due_date : "21 sep 2021",
      last_fee : "21 Aug 2021",
      edit: {
        icon: false,
        variant: {color:'#f71313', radius:'10px'},
        text: 'Unpaid'
      }
    },
  ]

  const [showCreateRentsBoys, setShowCreateRentsBoys] = useState(false);

  const toggleCreateRentsBoys = () => {
    setShowCreateRentsBoys(!showCreateRentsBoys)
  }

  const handleClick = () => {
    console.log("clicked")
  }

  return (
    <div className='h-100'>
      {!showCreateRentsBoys ? (
        <>
        <div className='d-flex justify-content-between align-items-center'>
            <div className='d-flex align-items-center'>
                <div className='roomlogo-container'>
                    <img src={RentIcon} alt="RoomsIcon" className='roomlogo'/>
                </div>
                <h1 className='fs-5'>Rents Management</h1>
            </div>
            <div>
                <input type="search" placeholder='Search' className='userinput'/>
                <img src={SearchIcon} alt="SearchIcon" className='search-icon'/>
            </div>
            <div>
                <button type="button" className='button' onClick={toggleCreateRentsBoys}>Add Rents</button>
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
        </>) : (
          <CreateRentsBoys />
        )}
    </div>
  )
}

export default RentPageBoys