import React from 'react'
import robot from "../assest/XOsX.gif"
import styled from "styled-components"
const Welcome = ({User}) => {
  return (
    <>
    <Container>
    <img src={robot} alt="robot" />
    <h1>
        Welcome, <span>{User} !</span>
    </h1>
    <h3>Select a chat to start messaging !</h3>
    </Container>
    </>
  )
}
const Container = styled.div`
    align-items:center;
    display: flex;
    justify-content:center;
    flex-direction:column;
    color: #EEEEEE;
    span{
        color:#FF5F00;
    }
    img{
        height:15rem;
    }
  `;
export default Welcome