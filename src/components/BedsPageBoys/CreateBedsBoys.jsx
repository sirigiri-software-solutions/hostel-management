import React, { useState } from 'react';
import BedsPageBoys from './BedsPageBoys';

const CreateBedsBoys = () => {
  const [showCreateBedsBoys, setShowCreateBedsBoys] = useState(false);
  const [formData, setFormData] = useState({
    number: '',
    rent: '',
    rooms: '',
    status: ''
  });
  const [formErrors, setFormErrors] = useState({
    number: '',
    rent: '',
    rooms: '',
    status: ''
  });

  const toggleCreateBedsBoys = () => {
    setShowCreateBedsBoys(!showCreateBedsBoys);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    let formIsValid = true;

    // Basic validation for required fields
    if (!formData.number) {
      errors.number = 'Number is required';
      formIsValid = false;
    }

    if (!formData.rent) {
      errors.rent = 'Rent is required';
      formIsValid = false;
    }

    if (!formData.rooms) {
      errors.rooms = 'Rooms is required';
      formIsValid = false;
    }

    if (!formData.status) {
      errors.status = 'Status is required';
      formIsValid = false;
    }

    // If form is valid, proceed with submission
    if (formIsValid) {
      console.log('Form submitted successfully:', formData);
      // You can perform further actions here, such as sending data to server
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className='h-100'>
      {!showCreateBedsBoys ? (
        <div className="container-fluid">
          <h1 className='fs-5' onClick={toggleCreateBedsBoys}>&lt;-- Back</h1>
          <h1 className='text-center mb-2 fs-5'>
            Create Beds
          </h1>
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-6">
              <label htmlFor="inputNumber" className="form-label">Number</label>
              <input type="number" className="form-control" id="inputNumber" name="number" value={formData.number} onChange={handleInputChange} />
              {formErrors.number && <div className="text-danger">{formErrors.number}</div>}
            </div>
            <div className="col-md-6">
              <label htmlFor="inputRent" className="form-label">Rent</label>
              <input type="number" className="form-control" id="inputRent" name="rent" value={formData.rent} onChange={handleInputChange} />
              {formErrors.rent && <div className="text-danger">{formErrors.rent}</div>}
            </div>
            <div className="col-md-6">
              <label htmlFor="inputRooms" className="form-label">Select Rooms</label>
              <input type="number" className="form-control" id="inputRooms" name="rooms" value={formData.rooms} onChange={handleInputChange} />
              {formErrors.rooms && <div className="text-danger">{formErrors.rooms}</div>}
            </div>
            <div className="col-md-6">
              <label htmlFor="inputStatus" className="form-label">Select Status</label>
              <input type="text" className="form-control" id="inputStatus" name="status" value={formData.status} onChange={handleInputChange} />
              {formErrors.status && <div className="text-danger">{formErrors.status}</div>}
            </div>
            <div className="col-12 text-center">
              <button type="submit" className="btn btn-warning">Create</button>
            </div>
          </form>
        </div>) : (
          <BedsPageBoys />
        )}
    </div>
  );
};

export default CreateBedsBoys;
