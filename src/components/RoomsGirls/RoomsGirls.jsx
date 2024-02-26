import React from 'react'
import RoomsIcon from '../../images/Icons (2).png'
import SearchIcon from '../../images/Icons (9).png'
import Table from '../../Elements/Table'

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
                <input type="button" value="Add Rooms" className='button'/>
            </div>
        </div>
        <div className="table-container rounded-table">   
            <Table columns={columns} rows={rows}/>
        </div>
        <div className='d-flex justify-content-end mt-2'>
            <span className='btn btn-outline-dark m-1'>1</span>
            <span className='btn btn-outline-dark m-1'>2</span>
            <span className='btn btn-outline-dark m-1'>...</span>
            <span className='btn btn-outline-dark m-1'>10</span>
        </div>
    </div>
  )
}

export default RoomsGirls