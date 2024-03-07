import React, {useState} from 'react'
import TenantsIcon from '../../images/Icons (4).png'
import SearchIcon from '../../images/Icons (9).png'
import Table from '../../Elements/Table'
import ImageIcon from '../../images/Icons (10).png'
import CreateExpensesBoys from './CreateExpensesBoys'

const ExpensesBoys = () => {
    const columns = [
      'S. No',
      'Room',
      'Name',
      'Month/Year',
      'Rent',
      'Created on',
      'Created By',
      'Edit'
    ]
  
    const rows = [
      {
        s_no : 1,
        room_no :"125/2",
        name : "ABCDE",
        month_year: "Aug/2021",
        rent: "Rs. 5000",
        created_on: "21 Aug 2021",
        created_by: "Admin  ",
        edit: {
          icon: false,
          variant: {color:'#ff8a00', radius:'10px'},
          text: 'Edit'
        }
      },
    ]

const[showCreateExpensesBoys, setShowCreateExpensesBoys] = useState(false)

const toggleCreateExpensesBoys = () => {
    setShowCreateExpensesBoys(!showCreateExpensesBoys)
}

  return (
    <div className='h-100'>
    {!showCreateExpensesBoys ?(
    <>
        <div className='d-flex justify-content-between align-items-center'>
            <div className='d-flex align-items-center'>
                <div className='roomlogo-container'>
                    <img src={TenantsIcon} alt="RoomsIcon" className='roomlogo'/>
                </div>
                <h1 className='fs-5'>Expenses Management</h1>
            </div>
            <div>
                <input type="search" placeholder='Search' className='userinput'/>
                <img src={SearchIcon} alt="SearchIcon" className='search-icon'/>
            </div>
            <div>
                <button type="button" className='button' onClick={toggleCreateExpensesBoys}>Add Rooms</button>
            </div>
        </div>
        <div className="table-container rounded-table">
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
        <CreateExpensesBoys />
    )}
    </div>
  )
}

export default ExpensesBoys