import React from "react";
import { Routes,Route } from "react-router-dom";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SetAvatar from "./pages/SetAvatar";

function App() {
  return (
    <>
    <Routes>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/setavatar" element={<SetAvatar/>}/>
      <Route path="/" element={<Chat/>}/>
    </Routes>
    </>
  );
}

export default App;
