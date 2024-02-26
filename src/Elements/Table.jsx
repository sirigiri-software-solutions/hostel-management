import React from 'react'
import Button from './Button'

const Table = ({columns, rows}) => {
  return (
    <div>
        <table className="table-responsive w-100 text-center">
              <thead style={{backgroundColor:"#FF8D07"}}>
                <tr>
                  {
                    columns.map((item, index) => <th style={{padding: "5px"}}>{item}</th>)
                  }
                </tr>
              </thead>
              <tbody>
                {
                  rows.map((item, index) => <tr>
                    {item.s_no && <td style={{padding:"7px"}}>{item.s_no}</td>}
                    {item.bed_number && <td>{item.bed_number}</td>}
                    {item.room_no && <td>{item.room_no}</td>}
                    {item.person_name && <td>{item.person_name}</td>}
                    {item.person_mobile && <td>{item.person_mobile}</td>}
                    {item.bed_no && <td>{item.bed_no}</td>}
                    {item.floor && <td>{item.floor}</td>}
                    {item.remarks && <td>{item.remarks}</td>}
                    {item.rent && <td>{item.rent}</td>}
                    {item.due_date && <td>{item.due_date}</td>}
                    {item.last_fee && <td>{item.last_fee}</td>}
                    {item.created_by && <td>{item.created_by}</td>}
                    {item.last_updated_by && <td>{item.last_updated_by}</td>}
                    {item.edit && <td><Button icon={item.edit.icon} variant={item.edit.variant} text={item.edit.text}/></td>}
                  </tr>)
                }
              </tbody>
        </table>
    </div>
  )
}

export default Table