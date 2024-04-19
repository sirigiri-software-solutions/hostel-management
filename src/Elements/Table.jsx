import React from 'react'
import Button from './Button'
import './Table.css'
 
const Table = ({columns, rows,onTenantRowClick}) => {
  return (
    <div className='table-container'>
        <table className="table text-center">
          <thead>
            <tr>
              {
                columns.map((item, index) => <th style={{padding: "10px"}}>{item}</th>)
              }
            </tr>
          </thead>  
          <tbody>
            {
              rows.map((item, index) => <tr>
                {item.s_no && <td data-label="S. No" style={{padding:"7px"}}>{item.s_no}</td>}
                {item.image && <td data-label="image"><img className='personImage' src={item.image} alt='img'/></td>}
                {item.name && <td data-label="name">{item.name}</td>}
                {item.id && <td data-label="id">{item.id}</td>}
                {item.mobile_no && <td data-label="mobile_no">{item.mobile_no}</td>}
                {item.room_bed_no && <td data-label="room_bed_no">{item.room_bed_no}</td>}
                {item.bed_number && <td data-label="bed_number">{item.bed_number}</td>} 
                {item.room_no && <td data-label="Room.No">{item.room_no}</td>}
                {item.person_name && <td data-label="person_name">{item.person_name}</td>}
                {item.person_mobile && <td data-label="person_mobile">{item.person_mobile}</td>}
                {item.bed_no && <td data-label="bed_no">{item.bed_no}</td>}
                {item.floor && <td data-label="Floor">{item.floor}</td>}
                {item.noofBeds && <td data-label="No.of Beds">{item.noofBeds}</td>}
                {item.month_year && <td data-label="month_year">{item.month_year}</td>}
                {item.rent && <td data-label="rent">{item.rent}</td>}
                {item.joining_date && <td data-label="joining_date">{item.joining_date}</td>}
                {item.due_date && <td data-label="due_date">{item.due_date}</td>}
                {item.last_fee && <td data-label="last_fee">{item.last_fee}</td>}
                {item.created_on && <td data-label="created_on">{item.created_on}</td>}
                {item.created_by && <td data-label="created_by">{item.created_by}</td>}
                {item.last_updated_by && <td data-label="Last Updated date">{item.last_updated_by}</td>}
                {item.payment_date && <td data-label="payment_date">{item.payment_date}</td>}
                {item.status && <td data-label="status">{item.status}</td>}
                {item.edit_room && <td data-label="Edit">{item.edit_room}</td>}
                {item.actions && <td data-label="status">{item.actions}</td>}
                {item.edit && <td data-label="edit"><Button icon={item.edit.icon} onClick={onTenantRowClick ?() => onTenantRowClick(item) : null} variant={item.edit.variant} text={item.edit.text}/></td>}
              </tr>)
            }
          </tbody>
        </table>
    </div>
  )
}
 
export default Table