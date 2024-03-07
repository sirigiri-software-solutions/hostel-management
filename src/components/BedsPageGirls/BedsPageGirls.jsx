import React, {useState} from 'react'
import bedIcon from '../../images/Icons (3).png'
import Table from '../../Elements/Table'
import SearchIcon from '../../images/Icons (9).png'
import CreateBedsGirls from './CreateBedsGirls'

const BedsPageGirls = () => {
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
        variant: {color:'#166919', radius:'10px'},
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
        variant: {color:'#166919', radius:'10px'},
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
        variant: {color:'#166919', radius:'10px'},
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
        variant: {color:'#166919', radius:'10px'},
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
        variant: {color:'grey', radius:'10px'},
        text: 'Unoccupied'
      }
    },
  ]

  const [showCreateBedsGirls, setShowCreateBedsGirls] = useState(false);

  const toggleCreateBedsGirls = () => {
    setShowCreateBedsGirls(!showCreateBedsGirls)
  }

  return (
    <div className='h-100'>
      {!showCreateBedsGirls ? (
        <>
        <div className='d-flex justify-content-between align-items-center'>
            <div className='d-flex align-items-center'>
                <div className='roomlogo-container'>
                    <img src={bedIcon} alt="RoomsIcon" className='roomlogo'/>
                </div>
                <h1 className='fs-5'>Beds Management</h1>
            </div>
            <div>
                <input type="search" placeholder='Search' className='userinput'/>
                <img src={SearchIcon} alt="SearchIcon" className='search-icon'/>
            </div>
            <div>
                <button type="button" className='button' onClick={toggleCreateBedsGirls}>Add Beds</button>
            </div>
        </div>
        <div className="table-container rounded-table">   
            <Table columns={columns} rows={rows}/>
        </div>
        <div className='d-flex justify-content-end mt-4'>
          <div className='d-flex justify-content-between w-100'>
            <div className='d-flex align-items-center'>
              <div className='d-flex align-items-center'>
                <span style={{width:"35px", height:"35px", backgroundColor:"#166919", marginRight:"10px"}}></span>
                <h1 style={{fontSize:"10px", marginRight:"10px", marginTop:"10px"}}>Occupied</h1>
              </div>
              <div className='d-flex align-items-center'>
                <span style={{width:"35px", height:"35px", backgroundColor:"grey", marginRight:"10px"}}></span>
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
        </>) : (
          <CreateBedsGirls />
        )}
    </div>
  )
}

export default BedsPageGirls