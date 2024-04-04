import React, {useState} from 'react'
import TenantsBoys from './TenantsBoys'

const CreateTenantsBoys = () => {

  const[showCreateTenantsBoys, setShowCreateTenantsBoys] = useState(false)

  const toggleCreateTenantsBoys = () => {
      setShowCreateTenantsBoys(!showCreateTenantsBoys)
  }
  
    return (
      <div className='h-100'>
      {!showCreateTenantsBoys ?(
      <>
        <div className="container-fluid">
        <h1 className='fs-5' onClick={toggleCreateTenantsBoys}>&lt;-- Back</h1>
        <h1 className='text-center mb-2 fs-5'>Create Beds</h1>
        <form class="row g-3">
          <div class="col-md-6">
            <label for="inputNumber" class="form-label">Image</label>
            <input type="" class="form-control" id="inputNumber"/>
          </div>
          <div class="col-md-6">
            <label for="inputNumber" class="form-label">ID Number</label>
            <input type="" class="form-control" id="inputNumber"/>
          </div>
          <div class="col-md-6">
            <label for="inputNumber" class="form-label">Name</label>
            <input type="" class="form-control" id="inputNumber"/>
          </div>
          <div class="col-md-6">
            <label for="inputNumber" class="form-label">Emergency Contact</label>
            <input type="number" class="form-control" id="inputNumber"/>
          </div>
          <div class="col-md-6">
            <label for="inputRent" class="form-label">Status</label>
            <input type="text" class="form-control" id="inputRent"/>
          </div>
          <div class="col-md-6">
            <label for="inputRent" class="form-label">Mobile</label>
            <input type="number" class="form-control" id="inputRent"/>
          </div>
          <div class="col-md-6">
            <label for="inputRent" class="form-label">Updated By</label>
            <input type="number" class="form-control" id="inputRent"/>
          </div>
          <div class="col-md-6">
            <label for="inputRent" class="form-label">ID</label>
            <input type="number" class="form-control" id="inputRent"/>
          </div>
          <div class="col-md-6">
            <label for="inputRent" class="form-label">Bed</label>
            <input type="number" class="form-control" id="inputRent"/>
          </div>
          <div class="col-12 text-center">
            <button type="submit" class="btn btn-warning">Create</button>
          </div>
        </form>
      </div>
      </>
      ) : (
          <TenantsBoys />
      )}
      </div>
    )
}

export default CreateTenantsBoys