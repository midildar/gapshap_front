import axios from 'axios';
import React,{useState,useEffect,useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components"
import ChatBox from '../components/ChatBox';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import { host, usersRoute } from '../utils/apiRoutes';
import {io} from "socket.io-client"
const Chat = () => {
  const navigate = useNavigate()
  const socket = useRef()
  const [contacts, setContacts] = useState([])
  const [liveUser, setliveUser] = useState("")
  const [liveChat, setLiveChat] = useState(undefined)
  const [isloaded,setIsLoaded] = useState(false)
  const loadUser =async () => {
    const user = JSON.parse(localStorage.getItem("chat-user"))
    //console.log(user)
    setliveUser((event) => event = user)
    console.log(liveUser,"live user")
  }
  useEffect(() => {
    if (!localStorage.getItem("chat-user")) {
      navigate("/login")}else{
          loadUser()
          setIsLoaded(true)
      }
  }, [])

  useEffect(() => {
    if(liveUser){
      socket.current = io(host)
      socket.current.emit("add-user",liveUser.user)
    }
  }, [liveUser])

  const getContacts = async ()=>{
    const data = await axios.get(usersRoute)
    setContacts((event)=>event = data.data.filter(item => item.userName !== liveUser.userName))
    console.log(contacts)
  }
  useEffect(() => {
      if (liveUser){
        console.log(liveUser.isSet)
        if (liveUser.isSet === true){
          console.log("loading contacts")
          getContacts()
        }else navigate("/setavatar")
      }
  }, [liveUser])

  
  const handleChatChange = (chat) => {
    setLiveChat((event)=>event = chat)
  }
  
  return (
    <>
    <Container>
      <div className="chatbox">
       <Contacts Contact={contacts} User={liveUser} changeChat = {handleChatChange}></Contacts>
       {isloaded && liveChat === undefined ? <Welcome User={liveUser.userName}></Welcome> 
       : <ChatBox LiveChat={liveChat} LiveUser={liveUser} Socket={socket}></ChatBox>}
      </div>
    </Container>
    </>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #ff5f00;
  .chatbox{
    height: 85vh;
    width: 85vw;
    background-color:#00092C;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width:720px) and (max-width:1080px){
      grid-template-columns: 35% 65%;
    }
  }
  
`;

export default Chat