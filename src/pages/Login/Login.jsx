import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ImageOne from "../../images/Vector 1 (1).png";
import ImageTwo from "../../images/Vector 3 (2).png";
import Logo from "../../images/Kiran Reddy Boys Hostel 1.png";
import './Login.css'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export const loginContext = createContext();
const Login = () => {
  const navigate = useNavigate();
  const initialState = { Id: "", email: "", password: "" };
  const [loginData, setLoginData] = useState(initialState);
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(false);
  const [loginErrors, setLoginErrors] = useState({});

  useEffect(() => {
    axios
      .get("https://signuppage-2f4c8-default-rtdb.firebaseio.com/register.json")
      .then((response) => {
        let data = Object.values(response.data);
        let list = [];
        data.map((key) => list.push(data));
        setData(data);
        console.log(data, "data response from firebase");
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
      //console.log(data[itemExist])
      if (itemExist > -1) {
        if (
          data[itemExist].email === loginData.email &&
          data[itemExist].password === loginData.password
        ) {
          setFlag(true);
        //   toast.success("You Successfully Updated CryptoCoin Price", {
            // position: "bottom-right",
            // autoClose: 2000,
            // hideProgressBar: false,
            // closeOnClick: true,
            // pauseOnHover: true,
            // draggable: true,
            // progress: undefined,
            // theme: "light",
        // });
        //   toast.success("You are logged in successfully", {
        //     position: "bottom-right",
        //     autoClose: 2000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "light",
        //   })
          alert("You are logged in successfully");
          //   dispatch(editForm(data[itemExist]))
          setLoginData(initialState);
          navigate("/mainPage");
          console.log(flag, "flag");
        } else {
          alert("Password Wrong, please enter correct password");
        }
      } else {
        alert("You are new user so, register please");
      }
    }
    //console.log(flag,'flag')
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
//   console.log(myId,'outside')
  return (
    <React.Fragment>
      <main>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            // justifyContent:'space-evenly',
            margin:'auto',
            gap:'40px',
            width: "1200px",
            height: "800px",
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            position: "relative",
            // marginBottom:'100px',
            background:
              "linear-gradient(to bottom left, #efefef 20%, #ffffff 35%)",
          }}
        >
          <img
            src={ImageOne}
            alt="imageOne"
            className="login_page_imageOne"
          />
          <div style={{display: 'flex', flexDirection:'column', alignItems:'center', gap:'20px'}}>
            <img src={Logo} style={{width:'250px', height:'250px'}} alt="logo" />
            <label style={{width:'600px', padding:'10px 15px', fontWeight:'bold', fontSize:'16px', color:'#000'}}>A Home away from home, where strangers become friends and every day is an adventure.</label>
          </div>
          <form onSubmit={checkData} style={{display:'flex', flexDirection:'column', gap: '20px', alignItems:'center', zIndex:'9'}}>
            <div style={{fontSize:'40px', fontWeight:'bold', color:'#FDA339'}}>LOGIN</div>
            <div style={{display:'flex', flexDirection:'column'}}>
                <input
                    type="text"
                    className={`login_page_username ${loginErrors?.email && 'border border-danger'}`}
                    placeholder="Username or Email"
                    onChange={handleData}
                    onFocus={hideErrors}
                    onBlur={checkErrors}
                    value={loginData.email}
                    name="email"
                />
                {loginErrors.email ? (
                    <small className="ms-3 text-danger">{loginErrors.email}</small>
                ) : null
                }
            </div>
            <div style={{display:'flex', flexDirection:'column'}}>
                <input
                    type="text"
                    className={`login_page_username ${loginErrors?.password && 'border border-danger'}`}
                    placeholder="Password"
                    onChange={handleData}
                    onFocus={hideErrors}
                    onBlur={checkErrors}
                    value={loginData.password}
                    name="password"
                />
                {loginErrors.password ? (
                    <small className="ms-3 text-danger">{loginErrors.password}</small>
                ) : null
                }
            </div>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%'}}>
                <div style={{display:'flex', alignItems:'center', gap:'14px'}}>
                    <input type="checkbox" id='remember' style={{width:'24px', height:'24px', border:'1px solid #555'}} />
                    <label for='remember' className="login_page_rememberMe">Remember me</label>
                </div>
                <label className="login_page_forgotPassword" style={{fontSize:'16px'}}>Forgot Password?</label>
            </div>
            <input type="submit" value='Login' style={{color:'#fff', padding:'15px 24px', backgroundColor:'#FDA339', border:'none', borderRadius:'50px', fontSize:'18px', fontWeight:'bold'}}  />
          </form>
          <img
            src={ImageTwo}
            alt="imageTwo"
            style={{
            //   transform: 'rotate(180deg)',
              position: "absolute",
              bottom: "0",
              right: "0",
              width: "550px",
              height: "330px",
              zIndex:'0'
            }}
          />
        {/* <ToastContainer /> */}
        </div>
      </main>
    </React.Fragment>
  );
};
//export {demoId}
export default Login;
