import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assest/logo.png";

const Contacts = ({ Contact, User ,changeChat}) => {
  const navigate = useNavigate()
  const [liveUserName, setliveUserName] = useState(undefined);
  const [liveUserImage, setliveUserImage] = useState(undefined);
  const [selectedUser, setselectedUser] = useState(undefined);

  useEffect(() => {
    setliveUserName((event)=> event=User.userName);
    setliveUserImage((event) => event=User.image);
  }, [User]);

  const changeCurrentChat = (index,contact) => {
    setselectedUser(index)
    changeChat(contact)
  }
  return (
    <>
      {liveUserImage && liveUserName && (
        <Container>
          <div className="brand">
            <img src={logo} alt="logo" />
            <h3>Gap Shap</h3>
          </div>
          <div className="contacts">
            {Contact.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    index === selectedUser ? "selected" : ""
                  }`}
                  key={index}
                  onClick={()=>changeCurrentChat(index,contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt="avatar"
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.userName}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="liveuser">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${liveUserImage}`}
                alt="avatar"
                onClick={()=>navigate("/setavatar")}
              />
            </div>
            <div className="username">
              <h2>{liveUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
display: grid;
grid-template-rows: 10% 75% 15%;
overflow: hidden;
background-color:#EEEEEE;
.brand{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  img{
    height:2rem;
  }
  h3{
    color: #00092C;
    text-transform: uppercase;
  }
}
.contacts{
  display:flex;
  flex-direction:column;
  align-items:center;
  overflow:auto;
  gap:0.8rem;
  &::-webkit-scrollbar{
    width:0.2rem;
    &-thumb{
      background-color:#B20600;
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
  .contact{
    background-color:#B20600;
    min-height: 5rem;
    width:90%;
    cursor: pointer;
    border-radius: 0.2rem;
    padding: 0.4rem;
    gap: 1rem;
    align-items:center;
    display: flex;
    transition: 0.4s ease-in-out;
    .avatar{
      img{
        height: 3rem;
      }
    }
    .username{
      color:#EEEEEE;
    }
  }
  .selected{
    background-color: #00092C;
  }
}
.liveuser{
  background-color: #EEEEEE;
  align-items:center;
  display: flex;
  justify-content:center;
  gap: 2rem;
  .avatar{
    img{
      height: 4rem;
      cursor: pointer;
      max-inline-size: 100%;
    }
  }
  .username{
    h2{
      color:#00092C;
    }
  }
  @media screen and (min-width:720px) and (max-width:1080px){
    gap:0.5rem
    .username{
      h2{
        font-size: 1rem;
      }
    }

  }
}
`;

export default Contacts;
