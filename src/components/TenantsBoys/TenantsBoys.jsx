
import React from 'react'
import TenantsIcon from '../../images/Icons (4).png'
import SearchIcon from '../../images/Icons (9).png'
import Table from '../../Elements/Table'
import ImageIcon from '../../images/Icons (10).png'
import { useState,useEffect } from 'react'
import CreateTenantsBoys from './CreateTenantsBoys'
import './TenantsBoys.css';
 
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
        namee : "Jhonson",
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
        namee : "Jhonson",
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
        namee : "Jhonson",
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
        namee : "Jhonson",
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
        namee : "Jhonson",
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
 
    const[isMobile, setIsMobile] = useState(window.innerWidth<=768);
    useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth <= 760);
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
const[showCreateTenantsBoys,setShowCreateTenantsBoys]=useState(false);
 
const toggleCreateTenantsBoys = () => {
    setShowCreateTenantsBoys(!showCreateTenantsBoys)
}
 
  return (
    <div className='h-100'>
    <div className='d-flex justify-content-between align-items-center'>
            <div className='d-flex align-items-center'>
                <div className='roomlogo-container'>
                    <img src={TenantsIcon} alt="RoomsIcon" className='roomlogo'/>
                </div>
                <h1 className='fs-5'>Tenants Management</h1>
            </div>
            <div style={{position:"relative", display:"flex", justifyContent:"center", alignItems:"center"}}>
                <input type="search" placeholder='Search' className='userinput'/>
                <img src={SearchIcon} alt="SearchIcon" style={{position:"absolute", right:"10px", width:"20px"}}/>
            </div>
            <div>
                <button type="button" className='button' onClick={toggleCreateTenantsBoys}>Add Rooms</button>
            </div>
        </div>
        {!showCreateTenantsBoys &&(
          <div className="data-view">
          {isMobile ? (
              <div className="cards-view">
                {
                        
                            rows.map((row, index) => (
                              <div className="card" key={index}>
                                   <p><strong>S.No</strong> {row.s_no}</p>
                                  {/* <p><strong>column</strong> {row.floor}</p> */}
                                  <p><strong>Image:</strong><img src={row.image} alt=''/></p>
                                  <p><strong>Name:</strong> {row.name}</p>
                                  <p><strong>ID:</strong> {row.id}</p>
                                  <p><b>Mobile.No:</b>{row.mobile_no}</p>
                                  <p><b>Room/Bed No:</b>{row.room_bed_no}</p>
                                  <p><b>Payment Date:</b>{row.payment_date}</p>
                                  <button className="editbtn">Edit{row.edit.text} </button>
                                  </div>
                                  ))
                     }
                 

              </div>
      
          ):(
        <div className="rounded-table">  
            <Table columns={columns} rows={rows}/>
        </div>
          )}
        </div>
        )}
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
    {
    
      showCreateTenantsBoys && <CreateTenantsBoys />
}
    </div>
  )
}
 
export default TenantsBoys