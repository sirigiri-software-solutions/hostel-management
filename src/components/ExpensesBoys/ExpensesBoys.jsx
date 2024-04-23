import React, { useEffect, useState } from 'react'
import ExpenseIcon from '../../images/Icons (5).png'
import SearchIcon from '../../images/Icons (9).png'
import Table from '../../Elements/Table'
import { database, push, ref } from "../../firebase";
import { onValue } from 'firebase/database';
//import ImageIcon from '../../images/Icons (10).png'
import { remove, update, set } from 'firebase/database';

const ExpensesBoys = () => {

  // const [createdBy, setCreatedBy] = useState('admin');
  const [searchTerm, setSearchTerm] = useState('');
  const [initialRows, setInitialRows] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);

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
      const expensesRef = ref(database, 'Hostel/boys/expenses');
      push(expensesRef, {
        ...formData,
        expenseAmount: parseFloat(formData.expenseAmount),
        expenseDate: new Date(formData.expenseDate).toISOString() // Proper ISO formatting
      })
        .then(() => {
          // alert('Expense added!');
          // Reset form or other UI updates here
          setFormData({
            expenseName: '',
            expenseAmount: '',
            expenseDate: '',
            createdBy: 'admin'
          });
        })
        .catch(error => {
          console.error("Error adding document: ", error);
          // alert('Error adding expense!');
        });
    } else {
      // Set errors in state if form is not valid
      setFormErrors(errors);
    }
  };

  //for date format
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = ('0' + date.getDate()).slice(-2); // Add leading zero if needed
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add leading zero if needed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  useEffect(() => {
    const expensesRef = ref(database, 'Hostel/boys/expenses');
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
        data-bs-toggle="modal"
        data-bs-target="#exampleModalExpensesBoys"
      >
        Edit
      </button>
    }));
    setInitialRows(rows);

  }, [expenses]);

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setFormData({
      expenseName: expense.expenseName,
      expenseAmount: expense.expenseAmount,
      expenseDate: expense.expenseDate,
      createdBy: expense.createdBy
    });
  };


  const handleUpdate = () => {
    if (!editingExpense) return;
    const expenseRef = ref(database, `Hostel/boys/expenses/${editingExpense.id}`);
    set(expenseRef, {
      ...formData,
      expenseAmount: parseFloat(formData.expenseAmount),
      expenseDate: new Date(formData.expenseDate).toISOString()
    }).then(() => {
      setEditingExpense(null);
      alert('Expense updated!');
    }).catch(error => {
      console.error("Error updating document: ", error);
      alert('Error updating expense!');
    });
  };

  const handleDelete = () => {
    if (!editingExpense) return;
    const expenseRef = ref(database, `Hostel/boys/expenses/${editingExpense.id}`);
    remove(expenseRef).then(() => {
      setEditingExpense(null);
      alert('Expense deleted!');
    }).catch(error => {
      console.error("Error deleting document: ", error);
      alert('Error deleting expense!');
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
  console.log("==>expense==>", expenses)
  return (
    <div className='h-100'>

      <>
        <div className="row d-flex flex-wrap align-items-center justify-content-between">
          <div className="col-12 col-md-4 d-flex align-items-center mr-5">
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
            <button type="button" class="add-button" data-bs-toggle="modal" data-bs-target="#exampleModalExpensesBoys">
              Add Expenses
            </button>
          </div>
        </div>
        <div>
          <Table columns={columns} rows={filteredRows} />
        </div>
        <div class="modal fade" id="exampleModalExpensesBoys" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Add Expenses</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div className="container-fluid">
                  <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                      <label htmlFor="inputExpenseName" className="form-label">Expense Name</label>
                      <input type="text" className="form-control" name="expenseName" value={formData.expenseName} onChange={handleInputChange} />
                      {/* {formErrors.number && <div className="text-danger">{formErrors.number}</div>} */}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="inputRent" className="form-label">Expense amount</label>
                      <input type="number" className="form-control" name="expenseAmount" value={formData.expenseAmount} onChange={handleInputChange} />
                      {/* {formErrors.rent && <div className="text-danger">{formErrors.rent}</div>} */}
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
                      {/* {formErrors.status && <div className="text-danger">{formErrors.status}</div>} */}
                    </div>
                    <div className="col-12 text-center">
                      {!editingExpense && (
                        <button type="submit" className="btn btn-warning">Create</button>
                      )}
                      {editingExpense && (
                        <>
                          <button type="button" className="btn btn-success" onClick={handleUpdate}>Update Expense</button>
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

export default ExpensesBoys