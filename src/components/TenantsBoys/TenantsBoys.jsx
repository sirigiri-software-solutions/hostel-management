import React from 'react'
import TenantsIcon from '../../images/Icons (4).png'
import SearchIcon from '../../images/Icons (9).png'
import Table from '../../Elements/Table'
import ImageIcon from '../../images/Icons (10).png'
import { useState } from 'react'
import CreateTenantsBoys from './CreateTenantsBoys'

const TenantsBoys = () => {
    const columns = [
      'S. No',
      'Image',
      'Name',
      'ID',
      'Mobile No',
      'Room/Bed No',
      'Payment Date',
      'Status'
    ]
  
    const rows = [
      {
        s_no : 1,
        image :ImageIcon,
        name : "Jhonson",
        id: "Adhaar",
        mobile_no: "+91 9010987123",
        room_bed_no: "125/2",
        payment_date : "1 Jan 2024",
        edit: {
          icon: false,
          variant: {color:'#ff8a00', radius:'10px'},
          text: 'More'
        }
      },
      {
        s_no : 2,
        image :ImageIcon,
        name : "Jhonson",
        id: "Adhaar",
        mobile_no: "+91 9010987123",
        room_bed_no: "125/2",
        payment_date : "1 Jan 2024",
        edit: {
          icon: false,
          variant: {color:'#ff8a00', radius:'10px'},
          text: 'More'
        }
      },
      {
        s_no : 3,
        image :ImageIcon,
        name : "Jhonson",
        id: "Adhaar",
        mobile_no: "+91 9010987123",
        room_bed_no: "125/2",
        payment_date : "1 Jan 2024",
        edit: {
          icon: false,
          variant: {color:'#ff8a00', radius:'10px'},
          text: 'More'
        }
      },
      {
        s_no : 4,
        image :ImageIcon,
        name : "Jhonson",
        id: "Adhaar",
        mobile_no: "+91 9010987123",
        room_bed_no: "125/2",
        payment_date : "1 Jan 2024",
        edit: {
          icon: false,
          variant: {color:'#ff8a00', radius:'10px'},
          text: 'More'
        }
      },
      {
        s_no : 5,
        image :ImageIcon,
        name : "Jhonson",
        id: "Adhaar",
        mobile_no: "+91 9010987123",
        room_bed_no: "125/2",
        payment_date : "1 Jan 2024",
        edit: {
          icon: false,
          variant: {color:'#ff8a00', radius:'10px'},
          text: 'More'
        }
      },
    ]

const[showCreateTenantsBoys, setShowCreateTenantsBoys] = useState(false)

const toggleCreateTenantsBoys = () => {
    setShowCreateTenantsBoys(!showCreateTenantsBoys)
}

  return (
    <div className='h-100'>
    {!showCreateTenantsBoys ?(
    <>
      <div className="row d-flex align-items-center justify-content-between">
        <div className="col-12 col-md-4 d-flex align-items-center mr-5">
          <div className='roomlogo-container'>
            <img src={TenantsIcon} alt="RoomsIcon" className='roomlogo'/>
          </div>
          <h1 className='fs-5'>Tenants Management</h1>
        </div>
        <div className="col-6 col-md-4 search-wrapper">
          <input type="text" placeholder='Search' className='search-input'/>
          <img src={SearchIcon} alt="search-icon" className='search-icon'/>
        </div>
        <div className="col-6 col-md-4 d-flex justify-content-end">
          <button type="button" className='button cursor-pointer' onClick={toggleCreateTenantsBoys}>Add Rooms</button>
        </div>
      </div>
      <div>   
          <Table columns={columns} rows={rows}/>
      </div>
      <div className='d-flex justify-content-end mt-4'>
        <div className='d-flex justify-content-between w-100'>
          <div className='d-flex align-items-center'>
            <div className='d-flex align-items-center'>
              <span style={{width:"35px", height:"35px", backgroundColor:"#166919", marginRight:"10px", borderRadius:"10px"}}></span>
              <h1 style={{fontSize:"10px", marginRight:"10px", marginTop:"10px"}}>Occupied</h1>
            </div>
            <div className='d-flex align-items-center'>
              <span style={{width:"35px", height:"35px", backgroundColor:"grey", marginRight:"10px", borderRadius:"10px"}}></span>
              <h1 style={{fontSize:"10px", marginTop:"10px"}}>Unoccupied</h1>
            </div>
          </div>
          <div className='d-flex justify-content-end'>
            <span className='btn btn-outline-dark m-1'>1</span>
            <span className='btn btn-outline-dark m-1'>2</span>
            <span className='btn btn-outline-dark m-1'>...</span>
            <span className='btn btn-outline-dark m-1'>10</span>
          </div>
        </div>
      </div>
    </>
    ) : (
        <CreateTenantsBoys />
    )}
    </div>
  )
}

export default TenantsBoys