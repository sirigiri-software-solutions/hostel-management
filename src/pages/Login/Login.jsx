
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ImageOne from "../../images/Vector 1 (1).png";
import ImageTwo from "../../images/Vector 3 (2).png";
import Logo from "../../images/Kiran Reddy Boys Hostel 1.png";
import './Login.css'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const loginContext = createContext();

const Login = () => {
  const navigate = useNavigate();
  const initialState = { Id: "", email: "", password: "" };
  const [loginData, setLoginData] = useState(initialState);
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(false);
  const [loginErrors, setLoginErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  // setLoginData({...loginData,[loginData.email]:localStorage.getItem('rememberedUsername')|| " "})
  // setLoginData({...loginData,[]})
  const [showforgotpassword,setShowforgotPassword]=useState(true);
  const [showupdatepassword,setShowupdatePassword]=useState(true);

  // main useState for entire page
  const [usersDataWithID,setUsersDataWithID] = useState()
  const [singleUserInfo,setSingleUserInfo] = useState();
  


  const [newPassword, setNewPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [userData, setUserData] = useState(null);
  



  const toggleForgotPassword=()=>{
    setShowforgotPassword(!showforgotpassword);
  }
  

  useEffect(()=>{
    const rememberedUsername=localStorage.getItem('rememberedUsername');
    const rememberedPassword=localStorage.getItem('rememberedPassword');
    if (rememberedUsername && rememberedPassword) {
      setLoginData({...loginData,[loginData.email]:rememberedUsername});
      setLoginData({...loginData,[loginData.password]:rememberedPassword});
      setRememberMe(true);
    }

  },[])
  const handleRememberme=(e)=>{
    // console.log(e);
    // setRememberMe(e.target.checked)
    setRememberMe(!rememberMe);

  }

  useEffect(() => {
    axios
      .get("https://signuppage-2f4c8-default-rtdb.firebaseio.com/register.json")
      .then((response) => {
        let data = Object.values(response.data);
        setData(data);

        let dataResponse= response.data;
        setUsersDataWithID(dataResponse);


        



        // console.log(data, "data response from firebase");
      });
  }, []);

  const handleData = (event) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  const checkData = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const itemExist = data.findIndex(
        (item) => item.email === loginData.email
      );
      // console.log(data)
       const singleLoginuser = data.find((item)=>item.email === loginData.email);
      //  console.log(singleLoginuser);
      // console.log(usersDataWithID)
      // console.log(loginData.email)
      // console.log(usersDataWithID)
      const getSingleUserInfo = Object.entries(usersDataWithID)
      .filter(([id,user]) =>user.email === loginData.email)
      .map(([id,user]) =>({id,user}));
      // console.log("start")
      // console.log(getSingleUserInfo)
      setSingleUserInfo(getSingleUserInfo);
      // console.log("end");
      if (itemExist > -1) {
        if (
          data[itemExist].email === loginData.email &&
          data[itemExist].password === loginData.password
        ) {
          setFlag(true);
          toast.success("You are logged in successfully.", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
          setLoginData(initialState);
          navigate("/mainPage");
           localStorage.setItem("username",singleLoginuser.firstname)
          // console.log(flag, "flag");
        } else {
          toast.error("Password Wrong, please enter correct password.", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
        }
      } else {
        toast.warning("You are new user so, register please.", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }
    }

    // If Remember Me is checked, store login information in localStorage
    if (rememberMe) {
      localStorage.setItem('rememberedUsername', loginData.email);
      localStorage.setItem('rememberedPassword', loginData.password);
    } else {
      // If Remember Me is unchecked, remove stored login information from localStorage
      localStorage.removeItem('rememberedUsername');
      localStorage.removeItem('rememberedPassword');
    }
  };

  const hideErrors = (event) => {
    setLoginErrors({
      ...loginErrors,
      [event.target.name]: "",
    });
  };

  const checkErrors = (event) => {
    if (event.target.value === "") {
      setLoginErrors({
        ...loginErrors,
        [event.target.name]: "Enter " + event.target.name,
      });
    }
  };

  const validateForm = () => {
    let isValid = true;
    let errors = {};
    if (loginData.email === "") {
      errors.email = "Enter email to login";
      isValid = false;
    }
    if (loginData.password === "") {
      errors.password = "Enter password to login";
      isValid = false;
    }
    setLoginErrors(errors);
    return isValid;
  };

  const [dataa, setDataa] = useState({
    email: '',
    phoneno: '',
    favouritequestion:'',
    answer:'',
  });
  const [errors, setErrors] = useState({
    email: '',
    phoneno: '',
    favouritequestion:'',
    answer:'',
  });
  // const navigate = useNavigate(); // Initialize useNavigate hook

  const handleChange = (event) => {
    setDataa({ ...dataa, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: '' });
  };

  const handleUpdatePassword = (e) => {
    if (e.target.name === 'newPassword') {
      setNewPassword(e.target.value);
    } else if (e.target.name === 'confirmPassword') {
      setConfirmPassword(e.target.value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let formValid = true;
    const newErrors = { ...errors };

    if (dataa.email.trim() === '') {
      newErrors.email = 'Please enter your email';
      formValid = false;
    }

    if (dataa.phoneno.trim() === '') {
      newErrors.phoneno = 'Please enter your phone number';
      formValid = false;
    }
    if (dataa.favouritequestion.trim() === '') {
            newErrors.favouritequestion = 'Please enter your favouritequestion';
             formValid = false;
           }
         if (dataa.answer.trim() === '') {
             newErrors.answer = 'Please enter your answer';
             formValid = false;
           }

    if (!formValid) {
      setErrors(newErrors);
      return;
    }

    try {
      const matchingUser = Object.values(usersDataWithID).find(user =>
        user.email === dataa.email && user.phone === dataa.phoneno
        && user.favouritequestion === dataa.favouritequestion
        && user.answer === dataa.answer
      );
      console.log(matchingUser);
      console.log(usersDataWithID)
      const getUserByEmail = (userData, email) => {
        for (const [id, user] of Object.entries(userData)) {
          if (user.email === email) {
            return { id, user };
          }
        }
        return null; // Return null if no user is found with the given email
      };
  const singleUserData = getUserByEmail(usersDataWithID, dataa.email);
      // console.log("start")
      //  console.log(singleUserData);
      // console.log("end");
      // console.log(singleUserData.id)
      localStorage.setItem("userId",singleUserData.id)
      // // console.log(getUserId)
      // // console.log(getUserId)
      // // console.log(getUserId[0].id)
      // const userId = getUserId[0].id;
      // console.log(userId)
      if(matchingUser){
      setShowupdatePassword(!showupdatepassword)
      }
      
      // console.log(matchingUser[0])
      
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('An error occurred while fetching data. Please try again.');
    }
  };




  const handleNewPassword = (event) => {
    event.preventDefault();
    if (newPassword !== confirmpassword) {
      setError('Passwords do not match');
      return;
    }

    let userId = localStorage.getItem("userId")
    console.log(userId)


    try{
       axios.patch(`https://signuppage-2f4c8-default-rtdb.firebaseio.com/register/${userId}.json`, {
        ...userData,
        password: newPassword, // Update the password field in user data
        confirmpassword:newPassword,
      });
      alert('Password updated successfully');


    }catch(error){
      console.error('Error updating password:', error);
    }
  }




  
  return (
    <React.Fragment>
      
      <main  className="  col-lg-11 col-md-8 col-sm-8 col-12" id="main">
        <div className="" >
          <img src={ImageOne} alt="" className="img-fluid animatedimg"/>
         <div className="smallscrn">
          <div className="d-flex flex-column align-items-center imgcontainer">
            <img src={Logo} alt="" className="img" />
            <p className="p"><b>A Home away from home, where strangers become friends and every
                day is an adventure.</b></p>
          </div>
          {showforgotpassword ? (
  <form  className="d-flex flex-column frm ">
    <div className="text-center font-weight-bold login">LOGIN</div>
    <div>
    <input
          type="email"
          className={`form-control ${loginErrors?.email && "is-invalid"}`}
          placeholder="Username or Email"
          onChange={handleData}
          onFocus={hideErrors}
          onBlur={checkErrors}
          value={loginData.email}
          name="email"
          id="mail"
        />
        {loginErrors.email && (
          <div className="invalid-feedback">{loginErrors.email}</div>
        )}
        </div>
        <div className="d-flex flex-column">
        <input
          type="password"
          className={`form-control ${loginErrors?.password && "is-invalid"}`}
          placeholder="Password"
          onChange={handleData}
          onFocus={hideErrors}
          onBlur={checkErrors}
          value={loginData.password}
          name="password"
          id="pass"
        />
        {loginErrors.password && (
          <div className="invalid-feedback">{loginErrors.password}</div>
        )}
        </div>
        <div className="check">
          <div>
          <input
            type="checkbox"
            id="remember"
            className="form-check-input"
            checked={rememberMe}
            onChange={handleRememberme}
          />
          <label id="rememberText" className="form-check-label">
            Remember me
          </label>
          </div>
          <p className="text" onClick={toggleForgotPassword}>Forgot Password?</p>
          {/* <Updatepass oldPassword={oldPassword} /> */}
        </div>
        <div className="text-center btndiv">
        <button
        type="submit"
        className="botn btn-lg btn-block "
        onClick={checkData}
        // className='btn'
      >
         Login
      </button>
      </div>
  </form>
  ):( 
    showupdatepassword ? 

    (<div className='main'>
      <form  className="frm">
       <div className="text-center font-weight-bold login">Forgot Password</div>
         <table>
           <tr>
          <td>
         <label>
           Email :  
        </label>           
          </td>
                   
        <td>
            <input
            type="email"
             name='email'
             value={data.email}
              onChange={handleChange}
              placeholder='Enter your email'
              className='ipfield'
             required
           />
            {errors.email && <div className='error text-danger'>{errors.email}</div>}
            </td>
            </tr>
           <tr>
             <td>
           <label>Mobile.no :</label></td>
           <td>
           <input
             type="tel"
              name='phoneno'
            value={data.phoneno}
              onChange={handleChange}
              placeholder='Enter your mobile no'
              className='ipfield'
             required
          />
           {errors.phoneno && <div className='error'>{errors.phoneno}</div>}
           </td>
           </tr>
           <tr>
             <td>
             <label>Favourite question :</label></td>
             <td>
             <select className='selct' name='favouritequestion' value={data.favouritequestion} onChange={handleChange}
             >
              
               <option value=""></option>
               <option value="what is your school name?">What is your school name?</option>
               <option value="What is your favourite game?">What is your favourite game?</option>
               <option value="What is your mother name?">What is your mother name?</option>
               <option value="What is your favorite place?">What is your favourite place?</option>
               <option value="What is your nick name?">What is your nick name?</option>
             </select>
              {errors.favouritequestion && <div className='error text-danger'>{errors.favouritequestion}</div>} 
              </td>
           </tr>
           <tr>
             <td>
             <label>answer :</label></td>
             <td>
           <textarea
             type='textarea'
             name='answer'
             value={data.answer}
             onChange={handleChange}
             placeholder='Enter answer'
             className="area"
           />
           {errors.answer && <div className='error text-danger'>{errors.answer}</div>} 
 
           </td>
           </tr>

           <button type="submit" className='botn' onClick={handleSubmit}>Submit</button>
         </table>
       </form>
     </div>) : (
       <form className="frm"  >
       <div className="text-center font-weight-bold login">New Password</div> 
       <table>
         <tr>
           <td>
             <label>New password : </label>
           </td>
           <td>
             <input
               type="password"
               name="newPassword"
               value={newPassword}
               onChange={handleUpdatePassword}
               placeholder="New password"
               className="passfield"
             />
           </td>
         </tr>
         <tr>
           <td>
             <label>Confirm password : </label>
           </td>
           <td>
             <input
               type="password"
               name="confirmPassword"
               value={confirmpassword}
               onChange={handleUpdatePassword}
               placeholder="Confirm password"
               className="passfield"
             />
           </td>
         </tr>
         <tr>
           <td colSpan="2">
             {error && <div className="error text-danger">{error}</div>}
           </td>
         </tr>
         <tr>
           <td colSpan="2">
             <button type="submit" className="botn" onClick={handleNewPassword} >
               Add
             </button>
           </td>
         </tr>
       </table>
     </form>

     )



    
  )}
          

        </div>
          <img src={ImageTwo} alt="" className="img-fluid animatedimg" id="imgtwo"/>
        </div>
      </main>
  
  
    
    </React.Fragment>
  )
};

export default Login;





