import React from 'react'
import Rooms from '../../images/Icons (2).png'
import Beds from '../../images/Icons (3).png'
import Tenants from '../../images/Icons (4).png'
import Expenses from '../../images/Icons (5).png'
import './DashboardBoys.css'
import SmallCard from '../../Elements/SmallCard'
import Button from '../../Elements/Button'
//import PlusIcon from '../../images/Icons (8).png'

const DashboardBoys = () => {
    const menu = [
        {
            image:Rooms,
            heading: "Total Rooms",
            number: 25
        },
        {
            image:Beds,
            heading: "Total Beds",
            number: 86
        },
        {
            image:Tenants,
            heading: "Total Tenants",
            number: 25
        },
        {
            image:Expenses,
            heading: "Total Expenses",
            number: 28635
        },
    ]
  
  const handleClick = () => {
    console.log("button clicked")
  }

  return (
    <div className='dashboardboys'>
        <h1 className='heading'>Men's</h1>
        <div className='menu'>
        {
          menu.map((item, index) =>(
            <SmallCard index={index} item={item} />
          ))
        }
        </div>
        <div className='button-container'>
            <Button
                onClick={handleClick}
                icon={true}
                variant={{ color: '#ff8a00', radius: '20px' }}
                text={'Add Rooms'}
            />
            <Button
                onClick={handleClick}
                icon={true}
                variant={{ color: '#ff8a00', radius: '20px' }}
                text={'Add Beds'}
            />
            <Button
                onClick={handleClick}
                icon={true}
                variant={{ color: '#ff8a00', radius: '20px' }}
                text={'Add tenants'}
            />
            <Button
                onClick={handleClick}
                icon={true}
                variant={{ color: '#ff8a00', radius: '20px' }}
                text={'Add Expenses'}
            />
        </div>
    </div>
  )
}

export default DashboardBoys