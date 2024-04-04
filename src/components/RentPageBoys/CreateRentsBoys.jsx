import React, {useState} from 'react'
import RentPageBoys from './RentPageBoys'


const CreateRentsBoys = () => {

  const [showCreateRentsBoys, setShowCreateRentsBoys] = useState(false)

  const toggleCreateRentsBoys = () => {
    setShowCreateRentsBoys(!showCreateRentsBoys)
  }

  return ( 
    <div className='h-100'>
      {!showCreateRentsBoys ? (
      <div className="container-fluid">
        <h1 className='fs-5' onClick={toggleCreateRentsBoys}>&lt;-- Back</h1>
        <h1 className='text-center mb-2 fs-5'>
            Create Rents
        </h1>
        <form class="row g-3">
          <div class="col-md-6">
            <label for="inputNumber" class="form-label">Number</label>
            <input type="number" class="form-control" id="inputNumber"/>
          </div>
          <div class="col-md-6">
            <label for="inputRent" class="form-label">Rent</label>
            <input type="number" class="form-control" id="inputRent"/>
          </div>
          <div class="col-md-6">
            <label for="inputRent" class="form-label">Select Rooms</label>
            <input type="number" class="form-control" id="inputRent"/>
          </div>
          <div class="col-md-6">
            <label for="inputRent" class="form-label">Select Status</label>
            <input type="number" class="form-control" id="inputRent"/>
          </div>
          <div class="col-12 text-center">
            <button type="submit" class="btn btn-warning">Create</button>
          </div>
        </form>
      </div>) : (
        <RentPageBoys />
      )}
    </div>
  )
}

export default CreateRentsBoys