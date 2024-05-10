import React from 'react'
import Button from './Button'
import './Table.css'
 
const Table = ({columns, rows,onClickTentantRow}) => {
  return (
    <div className='table-container'>
        <table className="table text-center">
          <thead>
            <tr className="fixed">
              {
                columns.map((item, index) => <th style={{padding: "10px"}}>{item}</th>)
              }
            </tr>
          </thead>  
          <tbody className='bodystar'>
            {
              rows.map((item, index) => <tr>
                {item.s_no && <td data-label="S. No" style={{padding:"7px"}} onClick={onClickTentantRow ? () => onClickTentantRow(item) : null}>{item.s_no}</td>}
                {item.image && <td data-label="Image" onClick={onClickTentantRow ? () => onClickTentantRow(item) : null}><img className='personImage' src={item.image} alt='img'/></td>}
                {item.name && <td data-label="Name" onClick={onClickTentantRow ? () => onClickTentantRow(item) : null}>{item.name}</td>}
                {item.id && <td data-label="ID" onClick={onClickTentantRow ? () => onClickTentantRow(item) : null}>{item.id}</td>}
                {item.mobile_no && <td data-label="Mobile No" onClick={onClickTentantRow ? () => onClickTentantRow(item) : null}>{item.mobile_no}</td>}
                {item.room_bed_no && <td data-label="Room/Bed No" onClick={onClickTentantRow ? () => onClickTentantRow(item) : null}>{item.room_bed_no}</td>}
                {item.bed_number && <td data-label="Bed No">{item.bed_number}</td>} 
                {item.room_no && <td data-label="Room No">{item.room_no}</td>}
                {item.person_name && <td data-label="Person Name">{item.person_name}</td>}
                {item.person_mobile && <td data-label="Person Mobile">{item.person_mobile}</td>}
                {item.bed_no && <td data-label="Bed No">{item.bed_no}</td>}
                {item.floor && <td data-label="Floor">{item.floor}</td>}
                {item.noofBeds && <td data-label="No.of Beds">{item.noofBeds}</td>}
                {item.bedRent && <td data-label="Bed Rent">{item.bedRent}</td>}
                {item.month_year && <td data-label="month_year">{item.month_year}</td>}
                {item.rent && <td data-label="Rent">{item.rent}</td>}
                {item.paid && <td data-label="Paid">{item.paid}</td>}
                {item.due && <td data-label="Due">{item.due}</td>}
                {item.joining_date && <td data-label="Joining Date" onClick={onClickTentantRow ? () => onClickTentantRow(item) : null}>{item.joining_date}</td>}
                {item.bike_number && <td data-label="Bike Number" onClick={onClickTentantRow ? () => onClickTentantRow(item) : null}>{item.bike_number}</td>}
                {item.due_date && <td data-label="Due Date">{item.due_date}</td>}
                {item.last_fee && <td data-label="Last Fee">{item.last_fee}</td>}
                {item.created_on && <td data-label="created_on">{item.created_on}</td>}
                {item.expense_name && <td data-label="Expense Name">{item.expense_name}</td>}
                {item.expense_amount && <td data-label="Expense Amount">{item.expense_amount}</td>}
                {item.created_by && <td data-label="Created By">{item.created_by}</td>}
                {item.last_updated_by && <td data-label="Last Updated date">{item.last_updated_by}</td>}
                {item.payment_date && <td data-label="payment_date">{item.payment_date}</td>}
                {item.status && <td data-label="Status" onClick={onClickTentantRow ? () => onClickTentantRow(item) : null}>{item.status}</td>}
                {item.edit_room && <td data-label="Edit">{item.edit_room}</td>}
                {item.actions && <td data-label="Actions">{item.actions}</td>}
                {item.edit && <td data-label="Edit"><Button icon={item.edit.icon} variant={item.edit.variant} text={item.edit.text}/></td>}
                {item.delete && <td data-label="Delete"><Button icon={item.edit.icon} variant={item.edit.variant} text ={item.delete.text}/></td>}
              </tr>)
            }
          </tbody>
        </table>
    </div>
  )
}
 
export default Table