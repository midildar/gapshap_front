import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Loader from "../assest/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import multiavatar from '@multiavatar/multiavatar/esm'
import "react-toastify/dist/ReactToastify.css";
import { setAvatarRoute } from "../utils/apiRoutes";
import { toastOption } from "../utils/toastOption";
import { Buffer } from "buffer";

const SetAvatar = () => {
  
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSelected, setIsSelected] = useState(undefined);

  const setProfilePicture = async () => {
    if (isSelected === undefined) toast.error("Please choose an avatar !",toastOption)
    const user =  await JSON.parse(localStorage.getItem("chat-user"))
    const {data} = await axios.post(`${setAvatarRoute}/${user.user}`,{
      avatarImage : avatars[isSelected]
    })

    if (data.isSet){
      user.isSet = true
      user.image = data.image
      localStorage.setItem("chat-user",JSON.stringify(user))
      navigate("/")
    }else{
      toast.error("Error setting Picture try again !",toastOption)
    }
    
  };


  const fetchData = async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const svgCode = multiavatar(`${Math.round(Math.random() * 10000)}`)
      const buffer = new Buffer(svgCode);
      data.push(buffer.toString("base64"));
    }
    setAvatars(data);
    setIsLoading(false);
  };
  useEffect(() => {
    if (!localStorage.getItem("chat-user")) navigate("/login")
  },[]);
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    {
        isLoading ? <Container>
            <img src={Loader} alt="loader" className="loader" />
        </Container> : <Container>
        <div className="title-container">
          <h1>Pick an avatar as your profile picture !</h1>
        </div>
        <div className="avatars">
          {avatars.map((avatar, index) => {
            return (
              <div
                key={index}
                className={`avatar ${isSelected === index ? "selected" : ""}`}
              >
                <img
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt="avatar"
                  onClick={() => setIsSelected(index)}
                />
              </div>
            );
          })}
        </div>
        <button className="submit-btn" onClick={setProfilePicture}>Select</button>
      </Container>
    }
      <ToastContainer />
    </>
  );
};

const Container = styled.div`
display: flex;
justify-content: center;
align-items:center;
flex-direction:column;
gap: 3rem;
height: 100vh;
widht: 100vw;
background-color: #FF5F00;
 .loader{
    max-inline-size : 10%;
 }
 .title-container{
    h1{
        color: #EEEEEE;
        text-transform: uppercase;
    }
 }
 .avatars{
    display: flex;
    gap: 2rem;
    .avatar{
        border: 0.4rem solid transparent;
        padding: 0.4rem;
        border-radius: 1rem;
        justify-content: center;
        align-content: center;
        transition: 0.4s ease-in-out;
        img{
            height : 6rem;
        }
    }
    .selected{
        border: 0.4rem solid #EEEEEE;
    }
 }
 .submit-btn{
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
        background-color: #EEEEEE;
        color:#00092c
      }
 }
`;

export default SetAvatar;
