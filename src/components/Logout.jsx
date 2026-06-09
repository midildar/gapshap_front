import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from "styled-components";
import {FiLogOut} from "react-icons/fi"

const Logout = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        localStorage.clear()
        navigate("/login")
    }
  return (
    <>
    <Button onClick={handleClick}>
        <FiLogOut/>
    </Button>
    </>
  )
}

const Button = styled.button`
display: flex;
align-items: center;
justify-content:center;
padding: 0.5rem;
border-radius:0.5rem;
background-color: #B20600;
border: none;
cursor: pointer;
svg{
    font-size: 1.3rem;
    color : #EEEEEE;
}`;
export default Logout