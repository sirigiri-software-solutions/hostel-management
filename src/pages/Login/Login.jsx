
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ImageOne from "../../images/Vector 1 (1).png";
import ImageTwo from "../../images/Vector 3 (2).png";
import Logo from "../../images/Kiran Reddy Boys Hostel 1.png";
// import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Login.css'
// import Updatepass from "./Updatepass";


export const loginContext = createContext();

const Login = () => {
  const navigate = useNavigate();
  const initialState = { Id: "", email: "", password: "" };
  const [loginData, setLoginData] = useState(initialState);
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(false);
  const [loginErrors, setLoginErrors] = useState({});
  // const [oldPassword,setoldPassword]=useState("");
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  // setLoginData({...loginData,[loginData.email]:localStorage.getItem('rememberedUsername')|| " "})
  // setLoginData({...loginData,[]})

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
      
      const singleLoginuser = data.find((item)=>item.email === loginData.email);
      // console.log(singleLoginuser);
      if (itemExist > -1) {
        if (
          data[itemExist].email === loginData.email &&
          data[itemExist].password === loginData.password
        ) {
          setFlag(true);
          alert("You are logged in successfully");
          setLoginData(initialState);
          navigate("/mainPage");
          // console.log(flag, "flag");
          // console.log(data);
          localStorage.setItem("username",singleLoginuser.firstname)
        } else {
          alert("Password Wrong, please enter correct password");
        }
      } else {
        alert("You are new user so, register please");
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
          <form onSubmit={checkData} className="d-flex flex-column frm ">
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
                  <p className="text" >Forgot Password?</p>
                  {/* <Updatepass oldPassword={oldPassword} /> */}
                </div>
                <div className="text-center btndiv">
                <button
                type="submit"
                className="btn btn-lg btn-block "
                Id='btn'
              >
                 Login
              </button>
              </div>
          </form>
        </div>
          <img src={ImageTwo} alt="" className="img-fluid animatedimg" id="imgtwo"/>
        </div>
      </main>

    
    </React.Fragment>
  );
};

export default Login;





