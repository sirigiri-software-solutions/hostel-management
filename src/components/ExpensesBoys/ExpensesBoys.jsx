import React, { useEffect, useState } from 'react'
import ExpenseIcon from '../../images/Icons (5).png'
import SearchIcon from '../../images/Icons (9).png'
import Table from '../../Elements/Table'
import { database, push, ref } from "../../firebase";
import { onValue } from 'firebase/database';
import { remove, update, set } from 'firebase/database';
import { toast } from "react-toastify";
import './ExpensesBoys.css';
import { useData } from '../../ApiData/ContextProvider';

const ExpensesBoys = () => {

  const { activeBoysHostel } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [initialRows, setInitialRows] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const getCurrentMonth = () => {
    const monthNames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    const currentMonth = new Date().getMonth(); // getMonth returns month index (0 = January, 11 = December)
    return monthNames[currentMonth];
  };
  
  const getCurrentYear = () => {
    return new Date().getFullYear().toString(); // getFullYear returns the full year (e.g., 2024)
  };

  const [year, setYear] = useState(getCurrentYear());
  const [month, setMonth] = useState(getCurrentMonth());
  const [total, setTotal] = useState(0);

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

  useEffect(() => {
    const handleOutsideClick = (event) => {
      console.log("Triggering")
        if (showModal && (event.target.id === "exampleModalExpensesBoys"|| event.key === "Escape")) {
            setShowModal(false);
        }
       
    };
    window.addEventListener('click', handleOutsideClick);
    window.addEventListener('keydown',handleOutsideClick)
    
}, [showModal]);



  const getMonthYearKey = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'short' }).toLowerCase(); // get short month name
    const year = date.getFullYear();
    return `${year}-${month}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
      const monthYear = getMonthYearKey(formData.expenseDate);
      const expensesRef = ref(database, `Hostel/boys/${activeBoysHostel}/expenses/${monthYear}`);
      push(expensesRef, {
        ...formData,
        expenseAmount: parseFloat(formData.expenseAmount),
        expenseDate: new Date(formData.expenseDate).toISOString() // Proper ISO formatting
      }).then(() => {
        toast.success("Expense added successfully.", {
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
        toast.error("Error adding expense: " + error.message, {
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

  //for date format
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = ('0' + date.getDate()).slice(-2); // Add leading zero if needed
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add leading zero if needed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  useEffect(() => {
    const formattedMonth = month.slice(0, 3);
    const expensesRef = ref(database, `Hostel/boys/${activeBoysHostel}/expenses/${year}-${formattedMonth}`);
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
      const totalExpenses = loadedExpenses.reduce((acc, current) => acc + current.expenseAmount, 0);
      setTotal(totalExpenses);
    });
  }, [month, year, activeBoysHostel]);

  const columns = [
    'S. No',
    'Expense Name',
    'Expense Amount',
    'Created By',
    'Date',
    'Actions'
  ];

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

  useEffect(() => {
    const rows = expenses.map((expense, index) => ({
      s_no: index + 1,
      expense_name: capitalizeFirstLetter(expense.expenseName),
      expense_amount: expense.expenseAmount,
      created_by: capitalizeFirstLetter(expense.createdBy),
      last_updated_by: expense.expenseDate,
      edit_room: <button
        style={{ backgroundColor: '#ff8a00', padding: '4px', borderRadius: '5px', color: 'white', border: 'none', }}
        onClick={() => handleEdit(expense)}
      // data-bs-toggle="modal"
      // data-bs-target="#exampleModalExpensesBoys"
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
    // console.log(formattedDate, "data was foramted")
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



    if (formIsValid) {
      let updatedFormData = {
        ...formData,
        expenseAmount: parseFloat(formData.expenseAmount)
      };

      const monthYear = getMonthYearKey(formData.expenseDate);
      const expenseRef = ref(database, `Hostel/boys/${activeBoysHostel}/expenses/${monthYear}/${editingExpense.id}`);
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

      setFormErrors(errors);
    }
  };


  const handleDelete = () => {
    if (!editingExpense) return;
    const monthYear = getMonthYearKey(formData.expenseDate);
    const expenseRef = ref(database, `Hostel/boys/${activeBoysHostel}/expenses/${monthYear}/${editingExpense.id}`);
    remove(expenseRef).then(() => {
      toast.success("Expense deleted successfully", {
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
      toast.error("Error deleting Expense" + error.message, {
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


  const handleCLoseModal = () => {
    setShowModal(false);

    setFormData({
      expenseName: '',
      expenseAmount: '',
      expenseDate: '',
      createdBy: 'admin'
    });
  }

// =======  calculate year expenses
  const [totalAnnualExpenses, setTotalAnnualExpenses] = useState(0);
  useEffect(() => {
    const monthNames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    let total = 0;

    const fetchExpenses = async () => {
      const promises = monthNames.map(month => {
        const monthRef = ref(database, `Hostel/boys/${activeBoysHostel}/expenses/${year}-${month}`);
        return new Promise((resolve) => {
          onValue(monthRef, (snapshot) => {
            const expenses = snapshot.val();
            if (expenses) {
              const monthlyTotal = Object.values(expenses).reduce((acc, { expenseAmount }) => acc + parseFloat(expenseAmount), 0);
              resolve(monthlyTotal);
            } else {
              resolve(0);
            }
          }, {
            onlyOnce: true
          });
        });
      });

      const monthlyTotals = await Promise.all(promises);
      total = monthlyTotals.reduce((acc, curr) => acc + curr, 0);
      setTotalAnnualExpenses(total);
    };

    fetchExpenses();
  }, [year, expenses, activeBoysHostel]);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className='h-100'>
      <>
        <div className="row d-flex flex-wrap align-items-center justify-content-between">
          <div className="col-12 col-md-4 d-flex align-items-center mr-5">
            <div className='roomlogo-container'>
              <img src={ExpenseIcon} alt="RoomsIcon" className='roomlogo' />
            </div>
            <h1 className='management-heading'>Expenses Management</h1>
          </div>
          <div className="col-6 col-md-4 search-wrapper">
            <input type="text" placeholder='Search' className='search-input' onChange={handleChange} value={searchTerm} />
            <img src={SearchIcon} alt="search-icon" className='search-icon' />
          </div>
          <div className="col-6 col-md-4 d-flex justify-content-end">
            <button id="expenseBoysPageAddBtn" type="button" class="add-button" onClick={handleAddNew}>
              Add Expenses
            </button>
          </div>
        </div>
        {/* ------------------------ */}
        <div className='filterExpense' style={{width:'100%',display:'flex',justifyContent:'space-between'}}>
        <div style={{display:'flex',justifyContent:'start'}}>
          <text><strong>{capitalizeFirstLetter(month)} Month Expenses : {total} </strong>
          <strong>Total Expenses of {year} :{totalAnnualExpenses} </strong> </text>
        </div>

          <div  style={{display:'flex', marginTop:'10px'}} >
          <div>
            <select className='filterExpenseField' value={year} onChange={e => setYear(e.target.value)}>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
          </div>
          <div>
            <select style={{width:'70px'}}className='filterExpenseField' value={month} onChange={e => { setMonth(e.target.value) }}>
              <option value="jan">January</option>
              <option value="feb">February</option>
              <option value="mar">March</option>
              <option value="apr">April</option>
              <option value="may">May</option>
              <option value="jun">June</option>
              <option value="jul">July</option>
              <option value="aug">August</option>
              <option value="sep">September</option>
              <option value="oct">October</option>
              <option value="nov">November</option>
              <option value="dec">December</option>
            </select>
          </div>
      </div>       
          {/* Additional UI and functionality here */}
   </div>
        {/* --------------------------- */}
        <div>
          <Table columns={columns} rows={filteredRows} />
        </div>
        {/* <div>
          <text><strong>{month} month expenses : {total} </strong>
          <strong>{year},total expenses :{totalAnnualExpenses} </strong> </text>
        </div> */}
        <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} id="exampleModalExpensesBoys" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Add Expenses</h1>
                <button onClick={handleCLoseModal} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                        <button type="submit" className="btn btn-warning">Create Expense</button>
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

            </div>
          </div>
        </div>

      </>
    </div>
  )
}

export default ExpensesBoys