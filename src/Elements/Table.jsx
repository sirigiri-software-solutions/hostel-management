
import React, { useEffect,useState} from 'react'
import Button from './Button'
import './Table.css'
 
const Table = ({columns, rows}) => {
 
 
  const [viewTable,setViewTable] = useState(false);
  const [showpop,setShowpop]=useState(false)
  const[editData,seteditData]=useState("") //for edit the existing data
  const[id,setId]=useState(null)
  
  const [edit,setEdit]=useState({
     slno:"",
     roomno:"",
     floor:"",
     remark:"",
     createdby:"",
     lastupdateDate:"",

})
let {slno,roomno,floor,remark,createdby,lastupdateDate}=edit
let handleinput=(e)=>{
    let{name,value}=e.target
    setEdit({...edit,[name]:value})
}
let handleSubmit=(e)=>{
  e.preventDefault()
}
let handleEditbtn=(index)=>{
  // console.log(index);
  const data=rows.filter((x,id)=>{
    return id===index})[0]
    //  console.log(data);
  
   setEdit(
    {
      slno:data.s_no,
      roomno:data.room_no,
      floor:data.floor,
     remark:data.remarks,
     createdby:data.created_by,
     lastupdateDate:data.last_updated_by,
    }
   )
   setId(index)
  //  seteditData(index)
  setShowpop(!showpop)
  }
const handleSave=(id)=>{

}
  
  


 
  useEffect(()=>{
    const handleResize = () => {
         if(window.innerWidth < 576){
          setViewTable(true);
         }else{
          setViewTable(false);
         }
    }
    handleResize();
    window.addEventListener('resize',handleResize);
  })
 
 
  return (
    <div>
 
      {viewTable ?<table className="table-responsive w-100 text-center">
              <thead style={{backgroundColor:"#FF8D07"}}>
                <tr>
                  
                   {/* <th style={{padding: "5px"}}>
                    {columns[0]}
                    {columns[1]}
                    {columns[2]}
                    </th> */}
                  
                </tr>
              </thead>
              </table>
                : (<table className="table-responsive w-100 text-center">
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
                    {/* {item.room && <td>{item.room}</td>} */}
                    {item.room_no && <td>{item.room_no}</td>}
                    {item.name && <td>{item.name}</td>}
                    {item.month_year && <td>{item.month_year}</td>}
                    {item.rent && <td>{item.rent}</td>}
                    {item.created_on && <td>{item.created_on}</td>}
                    {item.created_by && <td>{item.created_by}</td>}
                    {item.image && <td><img src={item.image} alt='img'/></td>}
                    {item.namee && <td>{item.namee}</td>}
                    {item.id && <td>{item.id}</td>}
                    {item.mobile_no && <td>{item.mobile_no}</td>}
                    {item.room_bed_no && <td>{item.room_bed_no}</td>}
                    {item.payment_date && <td>{item.payment_date}</td>}
                    {item.bed_number && <td>{item.bed_number}</td>}
                    {/* {item.room_no && <td>{item.room_no}</td>} */}
                    {item.person_name && <td>{item.person_name}</td>}
                    {item.person_mobile && <td>{item.person_mobile}</td>}
                    {item.bed_no && <td>{item.bed_no}</td>}
                    {item.floor && <td>{item.floor}</td>}
                    {item.remarks && <td>{item.remarks}</td>}
                    {/* {item.rent && <td>{item.rent}</td>} */}
                    {item.due_date && <td>{item.due_date}</td>}
                    {item.last_fee && <td>{item.last_fee}</td>}
                    {/* {item.created_by && <td>{item.created_by}</td>} */}
                    {item.last_updated_by && <td>{item.last_updated_by}</td>}
                    {item.edit && <td><button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>handleEditbtn(index)}
                      style={{color: 'white',backgroundColor:"#ff8a00" ,borderRadius:'20px', padding: '5px 24px',width:"100px",height:"35px"}}
                    >
                     Edit</button></td>}
                     {/* {item.edit && <td><Button/></td>} */}
                  </tr>)
                }
              </tbody>
        </table>)
      }
       



{/* <!-- Modal --> */}
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
         <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:"column",gap:"20px"}}>
          
          <label>Sl.No</label>
          <input type='number' placeholder='Enter sl.no' value={edit.slno} onChange={handleinput} name='slno'/>
          <label>Room.No</label>
          <input type='number' placeholder='Enter room_no' value={edit.roomno} onChange={handleinput} name='roomno'/>
          <label>Floor</label>
          <input type='text' placeholder='Enter floor.no' value={edit.floor} onChange={handleinput} name='floor'/>
          <label>Remark</label>
          <input type='text' placeholder='Enter Remark' value={edit.remark} onChange={handleinput} name='remark'/>
          <label>Created by</label>
          <input type='text' placeholder='created by' value={edit.createdby} onChange={handleinput} name='createdby'/>
          <label>Last Updated Date</label>
          <input type='date' placeholder='Enter last updated date' value={edit.lastupdateDate} onChange={handleinput} name='lastupdateDate'/>
         
         </form>
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={()=>handleSave(id)}>Save changes</button>
      </div>
    </div>
  </div>
</div>
          
       
 </div>
  )
}
 
export default Table;