import React from 'react'
import RentIcon from '../../images/Icons (6).png'
import SearchIcon from '../../images/Icons (9).png'
import Table from '../../Elements/Table'
import Button from '../../Elements/Button'

const RentPageGirls = () => {
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
        variant: {color:'#ff8a00', radius:'10px'},
        text: 'Unpaid'
      }
    },
    {
      s_no : 2,
      room_no : 125,
      person_name : "ABCD",
      person_mobile : "+91 9087654321",
      bed_no : 5,
      rent : "Rs. 5000",
      due_date : "21 sep 2021",
      last_fee : "21 Aug 2021",
      edit: {
        icon: false,
        variant: {color:'#ff8a00', radius:'10px'},
        text: 'paid'
      }
    },
    {
      s_no : 3,
      room_no : 125,
      person_name : "ABCD",
      person_mobile : "+91 9087654321",
      bed_no : 1,
      rent : "Rs. 5000",
      due_date : "21 sep 2021",
      last_fee : "21 Aug 2021",
      edit: {
        icon: false,
        variant: {color:'#ff8a00', radius:'10px'},
        text: 'paid'
      }
    },
    {
      s_no : 4,
      room_no : 125,
      person_name : "ABCD",
      person_mobile : "+91 9087654321",
      bed_no : 4,
      rent : "Rs. 5000",
      due_date : "21 sep 2021",
      last_fee : "21 Aug 2021",
      edit: {
        icon: false,
        variant: {color:'#ff8a00', radius:'10px'},
        text: 'paid'
      }
    },
    {
      s_no : 5,
      room_no : 125,
      person_name : "ABCD",
      person_mobile : "+91 9087654321",
      bed_no : 2,
      rent : "Rs. 5000",
      due_date : "21 sep 2021",
      last_fee : "21 Aug 2021",
      edit: {
        icon: false,
        variant: {color:'#ff8a00', radius:'10px'},
        text: 'Unpaid'
      }
    },
  ]

  const handleClick = () => {
    // console.log("clicked")
  }

  return (
    <div className='h-100'>
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
                <input type="button" value="Add Rooms" className='button'/>
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
    </div>
  )
}

export default RentPageGirls