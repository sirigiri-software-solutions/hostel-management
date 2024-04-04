import React from 'react'
import Rooms from '../../images/Icons (2).png'
import Beds from '../../images/Icons (3).png'
import Tenants from '../../images/Icons (4).png'
import Expenses from '../../images/Icons (5).png'
import './DashboardGirls.css'
import SmallCard from '../../Elements/SmallCard'

const DashboardGirls = () => {
    const menu = [
        {
            image:Rooms,
            heading: "Total Rooms",
            number: 25,
            edit : {
              icon: true,
              variant : {color:"#ff8a00", radius: "20px", padding:"9px 24px"},
              text: "Add Rooms"
            }
        },
        {
            image:Beds,
            heading: "Total Beds",
            number: 86,
            edit : {
              icon: true,
              variant : {color:"#ff8a00", radius: "20px", padding:"9px 24px"},
              text: "Add Beds"
            }
        },
        { 
            image:Tenants,
            heading: "Total Tenants",
            number: 25,
            edit : {
              icon: true,
              variant : {color:"#ff8a00", radius: "20px", padding:"9px 24px"},
              text: "Add Tenants"
            }
        },
        { 
            image:Expenses,
            heading: "Total Expenses",
            number: 28635,
            edit : {
              icon: true,
              variant : {color:"#ff8a00", radius: "20px", padding:"9px 24px"},
              text: "Add Expenses"
            }
        },
    ]

  return (
    <div className='dashboardGirls'>
        <h1 className='heading-women'>Women's</h1>
        <div className='menu'>
          {
            menu.map((item, index) =>(
              <SmallCard index={index} item={item} />
            ))
          }
        </div>
    </div>
  )
}

export default DashboardGirls