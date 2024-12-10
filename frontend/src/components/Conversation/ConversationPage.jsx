import React, { useEffect, useState } from "react";
import Message from "./Message";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import useMessages from "../../zustand/useMessages";
import { IoIosSend } from "react-icons/io";
import { useSocketContext } from "../../context/SocketContext";

const ConversationPage = () => {
  const { authUser } = useAuthContext();
  const { selectedUser, messages, setMessages } = useMessages();
  const [input, setInput] = useState({
    chat: "",
  });
  const { socket, onlineUsers } = useSocketContext();

  

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput((input) => ({ ...input, [name]: value }));
  };

  const handleSendMessage = async (e) => {
    console.log(e.target.value)
    e.preventDefault();
    if (!input) {
      return console.log("Input error")
    }
    const url = `http://localhost:3000/api/messages/send/${selectedUser._id}`;
    const token = localStorage.getItem("jwtToken")
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(input),
    };

    const response = await fetch(url, options);
    const data = await response.json();
    console.log("handlesend message data is ",data)
    
    setMessages([...messages, data.newMessage]);
    setInput({
      chat: "",
    });
  };

  const handleGetMessages = async () => {
    const token = localStorage.getItem("jwtToken");
    const url = `http://localhost:3000/api/messages/${selectedUser._id}`;
    const options = {
      method: "GET",
      headers: {
        // Authorization: localStorage.getItem("jwtToken"),
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    setMessages(data.messages);
  };

  useEffect(() => {
    if (!selectedUser) return;
    handleGetMessages();
  }, [selectedUser]);

  return (
    <>
      {!selectedUser ? (
        <div className="flex flex-col  h-[560px] w-full overflow-auto text-white  rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
          <div className="flex items-center justify-center w-full h-full ">
            <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
              <p>Welcome 👋 {authUser.loggedInUser.name} ❄</p>
              <p>Select a chat to start messaging</p>
              <TiMessages className="text-3xl md:text-6xl text-center" />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-between w-[90%]">
          <div className="bg-slate-600 h-15 text-center flex w-full justify-center py-2">
            <div  className={`flex avatar ${onlineUsers.includes(selectedUser._id)?"online":"offline"} text-center  gap-2 items-center w-12 h-12`}>
      
              <img
                className="w-10 h-10"
                src={selectedUser.profileImage}
                alt="profileImage"
              />
              <p className="text-white">
                <span>{selectedUser.username}</span>
              </p>
          
            </div>

          </div>

          <div className="flex flex-col p-4  h-[540px] overflow-auto text-white border-none  rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            <div>
              <Message />
            </div>
          </div>
          <form className="input w-full text-white bg-slate-600 flex items-center" onSubmit={(e)=>{handleSendMessage(e)}}>
     
              <div className="w-full flex outline-none border-none">
                <input
                  type="text"
                  placeholder="Send a message"
                  className="input w-full text-white  outline-none border-none"
                  value={input.chat}
                  name="chat"
                  onChange={(e)=>{handleInput(e)}}
                  autoComplete="off"
                />
                <button  >
                  <IoIosSend className="text-white w-8 h-8" />
                </button>
              </div>
        
          </form>
        </div>
      )}
    </>
  );
};

export default ConversationPage;
