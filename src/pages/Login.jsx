import React, { useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assest/logo.png";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios"
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/apiRoutes";
import { toastOption } from "../utils/toastOption";


const Login = () => {
  const navigate = useNavigate()
  const [value, setValue] = useState({
    userName: "",
    password: ""
  });
  
  useEffect(() => {
      if (localStorage.getItem("chat-user")) navigate("/")
  },[])

  const handleSubmit = async(event) => {
    event.preventDefault();
    if(handleValidation()){
      const { userName, password} = value;
      const {data} = await axios.post(loginRoute,{ userName,password})
      if (data.status === false) toast.error(data.msg,toastOption)
      if (data.status === true){
        localStorage.setItem("chat-user",JSON.stringify(data.user))
        setTimeout(() => {
          navigate("/")
        }, 1000);
      } 
    }
  };


  const handleValidation = () => {
    const { userName, password } = value;
    if (userName.length <= 3) {
      toast.error("Username and Password is required !", toastOption);
      return false;
    } else if (password.length <=7 ) {
      toast.error("Username and Password is required !", toastOption);
      return false;
    } 
    return true
  };
  const handleChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };
  return (
    <>
      <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="brand">
            <img alt="logo" src={logo} />
            <h1>Gap Shap</h1>
          </div>
          <input
            type="text"
            placeholder="userName"
            name="userName"
            onChange={(e) => handleChange(e)}
            min="4"
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Login</button>
          <Link to="/register" className="span">
            don't have an account ? Register.
          </Link>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
};

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #ff5f00;
  .brand {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      height: 5rem;
    }
    h1 {
      color: black;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    border-radius: 2rem;
    padding: 3rem 5rem;
    background-color: #eeeeee;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #ff5f00;
      border-radius: 0.4rem;
      color: black;
      width: 100%;
      font-size: 1rem;
    }
    button {
      background-color: #00092c;
      color: #eeeeee;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.4s ease-in-out;
      &:hover {
        background-color: #ff5f00;
      }
    }
    .span {
      color: #00092c;
      text-transform: uppercase;
      text-decoration: none;
    }
  }
`;

export default Login;
