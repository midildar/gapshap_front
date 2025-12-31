import React, { useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { GrSend } from "react-icons/gr";
import { MdEmojiSymbols } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { toastOption } from "../utils/toastOption";

const ChatInput = ({SendMessage}) => {
    const [showEmoji, setShowEmoji] = useState(false)
    const [message,setMessage] = useState("")

    const handleEmoji = () => {
        setShowEmoji(!showEmoji)
    }
    const handleEmojiClick = (emoji,event) => {
        let msg = message
        msg += emoji.emoji
        setMessage(msg)
    }
    const sendChat = (event) => {
      event.preventDefault()
      if(message.length > 0){
        SendMessage(message)
        setMessage("")
      }else{
        toast.error("Chat input is empty !", toastOption);
      }

    }
  return (
    <>
      <Container>
        <div className="button-container">
          <div className="emoji">
            <MdEmojiSymbols onClick={handleEmoji}/>
            {showEmoji && <Picker height={350} width={250} onEmojiClick={handleEmojiClick}/>}
          </div>
        </div>
        <form className="input-container" onSubmit={(e)=>sendChat(e)}>
          <input type="text" placeholder="Type your message here ..." value={message} onChange={(e)=>setMessage(e.target.value)}/>
          <button type="submit">
            <GrSend />
          </button>
        </form>
      </Container>
      <ToastContainer />
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  background-color: #00092C;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: #EEEEEE ;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        cursor: pointer;
        color: #FF5F00;
      }
      .EmojiPickerReact {
        position: absolute;
        top:-355px;
        box-shadow: 0 2px 5px #FF5F00;
        border-color: #FF5F00;
      }
    }
  }
  .input-container {
    width: 100%;
    height: 50%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #EEEEEE;
    input{
        width: 90%;
        background-color: transparent;
        color: black;
        border: none;
        padding-left: 1rem;
        font-size: 1.2rem;
        &::selection{
            background-color: orange;
        }
        &:focus{
            outline: none;
        }
    }
    button{
        padding: 0.3rem 2rem;
        margin-right:0.1rem;
        border-radius: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #B20600;
        border: none;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          padding: 0.3rem 1rem;
          svg {
            font-size: 1.2rem;
          }
        }
        svg {
            font-size: 1.5rem;
            cursor: pointer;
            color: #EEEEEE;
        }
    }
  }
`;
export default ChatInput;
