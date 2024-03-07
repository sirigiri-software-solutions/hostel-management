import React, {useState} from 'react'
import ExpensesGirls from './ExpensesGirls'

const CreateExpensesGirls = () => {

  const[showCreateExpensesGirls, setShowCreateExpensesGirls] = useState(false)

  const toggleCreateExpensesGirls = () => {
      setShowCreateExpensesGirls(!showCreateExpensesGirls)
  }
  
    return (
      <div className='h-100'>
      {!showCreateExpensesGirls ?(
      <>
        <div className="container-fluid">
        <h1 className='fs-5' onClick={toggleCreateExpensesGirls}>&lt;-- Back</h1>
        <h1 className='text-center mb-2 fs-5'>Create Expenses</h1>
        <form class="row g-3">
          <div class="col-md-6">
            <label for="inputName" class="form-label">Name</label>
            <input type="text" class="form-control" id="inputName"/>
          </div>
          <div class="col-md-6">
            <label for="inputDate" class="form-label">Due Date</label>
            <input type="date" class="form-control" id="inputDate"/>
          </div>
          <div class="col-md-6">
            <label for="inputMonth" class="form-label">Month</label>
            <input type="date" class="form-control" id="inputMonth"/>
          </div>
          <div class="col-md-6">
            <label for="inputAmount" class="form-label">Amount</label>
            <input type="number" class="form-control" id="inputAmount"/>
          </div>
          <div class="col-md-6">
            <label for="inputYear" class="form-label">Year</label>
            <input type="date" class="form-control" id="inputYear"/>
          </div>
          <div class="col-md-6">
            <label for="inputMobile" class="form-label">Mobile</label>
            <input type="number" class="form-control" id="inputMobile"/>
          </div>
          <div class="col-md-6">
            <label for="inputdes" class="form-label">Small Description</label>
            <input type="text" class="form-control" id="inputdes"/>
          </div>
          <div class="col-md-6">
            <label for="inputCreatedOn" class="form-label">Created On</label>
            <input type="date" class="form-control" id="inputCreatedOn"/>
          </div>
          <div class="col-12 text-center">
            <button type="submit" class="btn btn-warning">Create</button>
          </div>
        </form>
      </div>
      </>
      ) : (
          <ExpensesGirls />
      )}
      </div>
    )
}

export default CreateExpensesGirls