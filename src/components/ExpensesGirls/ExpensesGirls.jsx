import React, { useState, useEffect } from 'react'
import ExpenseIcon from '../../images/Icons (5).png'
import SearchIcon from '../../images/Icons (9).png'
import Table from '../../Elements/Table'
//import ImageIcon from '../../images/Icons (10).png'
import { database, push, ref } from "../../firebase";
import "../RoomsBoys/RoomsBoys.css"
import { onValue } from 'firebase/database';
import { remove, update, set } from 'firebase/database';
import { toast } from "react-toastify";

const ExpensesGirls = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [initialRows, setInitialRows] = useState([]);

  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    expenseName: '',
    expenseAmount: '',
    expenseDate: '',
    createdBy: 'admin'
  });


  const [formErrors, setFormErrors] = useState({
    number: '',
    rent: '',
    rooms: '',
    status: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate the necessary fields
    let errors = {};
    let formIsValid = true;

    if (!formData.expenseName.match(/^[a-zA-Z\s]+$/)) {
      errors.expenseName = 'Expense name should contain only alphabets and spaces';
      formIsValid = false;
    }


    if (!formData.expenseAmount.match(/^\d+(\.\d{1,2})?$/)) {
      errors.expenseAmount = 'Expense amount should be a valid number';
      formIsValid = false;
    }

    if (!formData.expenseName) {
      errors.expenseName = 'Expense name is required';
      formIsValid = false;
    }

    if (!formData.expenseAmount) {
      errors.expenseAmount = 'Expense amount is required';
      formIsValid = false;
    }

    if (!formData.expenseDate) {
      errors.expenseDate = 'Expense date is required';
      formIsValid = false;
    }

    // Only proceed if form is valid
    if (formIsValid) {
      const expensesRef = ref(database, 'Hostel/girls/expenses');
      push(expensesRef, {
        ...formData,
        expenseAmount: parseFloat(formData.expenseAmount),
        expenseDate: new Date(formData.expenseDate).toISOString() // Proper ISO formatting
      }).then(() => {
        toast.success("Expense updated successfully.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // setIsEditing(false); // Reset editing state
      }).catch(error => {
        toast.error("Error updating expense: " + error.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        });
      setShowModal(false);
      setFormErrors({
        number: '',
        rent: '',
        rooms: '',
        status: ''
      });



    } else {
      // Set errors in state if form is not valid
      setFormErrors(errors);
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = ('0' + date.getDate()).slice(-2); // Add leading zero if needed
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add leading zero if needed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  useEffect(() => {
    const expensesRef = ref(database, 'Hostel/girls/expenses');
    onValue(expensesRef, (snapshot) => {
      const data = snapshot.val();
      const loadedExpenses = [];
      for (const key in data) {
        loadedExpenses.push({
          id: key,
          ...data[key],
          expenseDate: formatDate(data[key].expenseDate) // Format date as you retrieve it
        });
      }
      setExpenses(loadedExpenses);
    });
  }, []);

  const columns = [
    'S. No',
    'Expense Name',
    'Expense Amount',
    'Created By',
    'Date',
    'actions'
  ];
  

  useEffect(() => {

    const rows = expenses.map((expense, index) => ({
      s_no: index + 1,
      expense_name: expense.expenseName,
      expense_amount: expense.expenseAmount,
      created_by: expense.createdBy,
      last_updated_by: expense.expenseDate,
      edit_room: <button
        style={{ backgroundColor: '#ff8a00', padding: '4px', borderRadius: '5px', color: 'white', border: 'none', }}
        onClick={() => handleEdit(expense)}
      // data-bs-toggle="modal"
      // data-bs-target="#exampleModalExpensesGirls"
      >
        Edit
      </button>
    }));
    setInitialRows(rows);

  }, [expenses]);

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    // console.log(expense.expenseDate,"data was formated")
    const [day, month, year] = expense.expenseDate.split('-');
    const formattedDate = `${year}-${month}-${day}`;
        setFormData({
      expenseName: expense.expenseName,
      expenseAmount: expense.expenseAmount,
      expenseDate: formattedDate,
      createdBy: expense.createdBy
    });
    setShowModal(true);
    setFormErrors({
      number: '',
      rent: '',
      rooms: '',
      status: ''
    })
  };



  const handleUpdate = () => {
    if (!editingExpense) return;

    let errors = {};
    let formIsValid = true;

    if (!formData.expenseName.match(/^[a-zA-Z\s]+$/)) {
      errors.expenseName = 'Expense name should contain only alphabets and spaces';
      formIsValid = false;
    }


    const expenseAmountString = String(formData.expenseAmount); // Convert to string
    if (!expenseAmountString.match(/^\d+(\.\d{1,2})?$/)) {
      errors.expenseAmount = 'Expense amount should be a valid number';
      formIsValid = false;
    }


    if (!formData.expenseDate) {
      errors.expenseDate = 'Expense date is required';
      formIsValid = false;
    }

    const parsedAmount = parseFloat(formData.expenseAmount);
    if (isNaN(parsedAmount)) {
      errors.expenseAmount = 'Expense amount should be a valid number';
      formIsValid = false;
    }

    // Log the value of formData.expenseDate before conversion
    console.log('Expense Date:', formData.expenseDate);

    if (formIsValid) {
      let updatedFormData = {
        ...formData,
        expenseAmount: parseFloat(formData.expenseAmount)
      };

      const expenseRef = ref(database, `Hostel/girls/expenses/${editingExpense.id}`);
      set(expenseRef, updatedFormData)
      .then(() => {
        toast.success("Expense updated successfully.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setEditingExpense(null); 
      }).catch(error => {
        toast.error("Error updating Expense: " + error.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });

      setShowModal(false);
      setFormData({
        expenseName: '',
        expenseAmount: '',
        expenseDate: '',
        createdBy: 'admin'
      });
    } else {
      // Set errors in state if form is not valid
      setFormErrors(errors);
    }
  };

  const handleDelete = () => {
    if (!editingExpense) return;
    const expenseRef = ref(database, `Hostel/girls/expenses/${editingExpense.id}`);
    remove(expenseRef).then(() => {
      setEditingExpense(null);
      // alert('Expense deleted!');
    }).catch(error => {
      console.error("Error deleting document: ", error);
      // alert('Error deleting expense!');
    });
    setShowModal(false);
    setFormData({
      expenseName: '',
      expenseAmount: '',
      expenseDate: '',
      createdBy: 'admin'
    });

  };


  const handleChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredRows = initialRows.filter(row => {
    return Object.values(row).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleAddNew = () => {
    setShowModal(true);
    setFormData({
      expenseName: '',
      expenseAmount: '',
      expenseDate: '',
      createdBy: 'admin'
    });
    setFormErrors({
      expenseName: '',
      expenseAmount: '',
      expenseDate: ''
    });
    setEditingExpense(null);
  };


  const onClickClose = () => {
    setShowModal(false);
    setFormData({
      expenseName: '',
      expenseAmount: '',
      expenseDate: '',
      createdBy: 'admin'
    });
  }



  return (
    <div className='h-100'>
      <>
        <div className="row d-flex flex-wrap align-items-center justify-content-between">
          <div className="col-12 col-md-4 d-flex align-items-center mr-5 mb-2">
            <div className='roomlogo-container'>
              <img src={ExpenseIcon} alt="RoomsIcon" className='roomlogo' />
            </div>
            <h1 className='fs-5'>Expenses Management</h1>
          </div>
          <div className="col-6 col-md-4 search-wrapper">
            <input type="text" placeholder='Search' className='search-input' onChange={handleChange} value={searchTerm} />
            <img src={SearchIcon} alt="search-icon" className='search-icon' />
          </div>
          <div className="col-6 col-md-4 d-flex justify-content-end">
            <button type="button" class="add-button" onClick={handleAddNew}>
              Add Expenses
            </button>
          </div>
        </div>
        <div>
          <Table columns={columns} rows={filteredRows} />
        </div>
        <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} id="exampleModalExpensesGirls" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                <button type="button" onClick={onClickClose} class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div className="container-fluid">
                  <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                      <label htmlFor="inputExpenseName" className="form-label">Expense Name</label>
                      <input type="text" className="form-control" name="expenseName" value={formData.expenseName} onChange={handleInputChange} />
                      {formErrors.expenseName && <div className="text-danger">{formErrors.expenseName}</div>}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="inputRent" className="form-label">Expense amount</label>
                      <input type="number" className="form-control" name="expenseAmount" value={formData.expenseAmount} onChange={handleInputChange} />
                      {formErrors.expenseAmount && <div className="text-danger">{formErrors.expenseAmount}</div>}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="inputRole" className="form-label">Created By</label>
                      <select className="form-select" id="inputRole" name="createdBy" value={formData.createdBy} onChange={handleInputChange}>
                        <option value="admin">Admin</option>
                        <option value="sub-admin">Sub-admin</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="inputDate" className="form-label">Expense Date</label>
                      <input type="date" className="form-control" name="expenseDate" value={formData.expenseDate} onChange={handleInputChange} />
                      {formErrors.expenseDate && <div className="text-danger">{formErrors.expenseDate}</div>}
                    </div>

                    <div className="col-12 text-center">
                      {!editingExpense && (
                        <button type="submit" className="btn btn-warning">Create</button>
                      )}
                      {editingExpense && (
                        <>
                          <button type="button" className="btn btn-success" style={{ marginRight: '10px' }} onClick={handleUpdate}>Update Expense</button>
                          <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete Expense</button>
                        </>
                      )}
                    </div>
                  </form>
                </div>
              </div>
              {/* <div className="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div> */}
            </div>
          </div>
        </div>
      </>
    </div>
  )
}

export default ExpensesGirls