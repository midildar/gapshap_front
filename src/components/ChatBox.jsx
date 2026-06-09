import React, { useState, useEffect,useRef } from "react";
import styled from "styled-components";
import { getMessageRoute, messageRoute } from "../utils/apiRoutes";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import axios from "axios";
import {v4 as uuidv4} from "uuid"

const ChatBox = ({ LiveChat, LiveUser , Socket}) => {
  const [messages, setmessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const scrollRef = useRef()

  useEffect(() => {
    const getChat = async () => {
      const response = await axios.post(getMessageRoute, {
        from: LiveUser.user,
        to: LiveChat._id,
      });
      setmessages((event)=>event = response.data)
    };
    if (LiveChat) getChat()
  }, [LiveChat]);

  const handleSendMessage = async (message) => {
    await axios.post(messageRoute, {
      from: LiveUser.user,
      to: LiveChat._id,
      message: message,
    });
    Socket.current.emit("send-msg",{
      from: LiveUser.user,
      to: LiveChat._id,
      message: message,
    })
    const msgs = [...messages]
    msgs.push({fromSelf: true , message: message})
    setmessages(msgs)
  };

  useEffect(() => {
   if (Socket.current){
    Socket.current.on("msg-recieve",(msg)=>{
      setArrivalMessage({fromSelf: false , message : msg})
    })
   }
  }, [])

  useEffect(() => {
    arrivalMessage && setmessages((prev)=> [...prev,arrivalMessage])
   }, [arrivalMessage])
  
   useEffect(() => {
    scrollRef.current?.scrollIntoView({behaviour:"smooth"})
   }, [messages])
  
  return (
    <>
      {LiveChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${LiveChat.avatarImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h3>{LiveChat.userName}</h3>
              </div>
            </div>
            <Logout />
          </div>
          <div className="chat-messages">
            {
              messages.map((message)=>{
                return (
                  <div ref={scrollRef} key={uuidv4()}>
                    <div className={`message ${message.fromSelf ? "sended" : "recieved"}`}>
                      <div className="content">
                        <p>{message.message}</p>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <ChatInput SendMessage={handleSendMessage} />
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  padding-top: 1rem;
  display: grid;
  grid-template-rows: 10% 78% 12%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width:720px) and (max-width:1080px){
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages{
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar{
      width:0.2rem;
      &-thumb{
        background-color:#B20600;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message{
      display: flex;
      align-items: center;
      .content{
        max-width: 40%;
        overflow-wrap:break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
      }
    }
  }
  .sended{
    justify-content: flex-end;
    .content{
      background-color: #B20600;
      color: #EEEEEE;
    }
  }
  .recieved{
    justify-content: flex-start;
    .content{
      background-color: #EEEEEE;
      color: #00092C;
    }
  }
`;
export default ChatBox;
