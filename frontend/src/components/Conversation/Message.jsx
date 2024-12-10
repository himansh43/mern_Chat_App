import React from "react";
import useMessages from "../../zustand/useMessages";
import { useAuthContext } from "../../context/AuthContext";
import Skeletons from "../Skeletons/skeletons";
import { useState } from "react";
import ChatBubbleMessages from "./ChatBubbleMessages";
import { useRef, useEffect } from "react";

const Message = () => {
  const { messages, setMessages } = useMessages();
  const [loading, setLoading] = useState(false);
  const lastMessageRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 100);
  }, [messages]);
  return (
    <div>
      {messages ? (
        <div>
          {loading ? (
            <Skeletons />
          ) : (
            <div>
              {Array.isArray(messages) &&
                messages?.map((message,_id) => (
                  <div key={_id} ref={lastMessageRef}>
                   <ChatBubbleMessages message={message} />
                </div>
                    
                  
                ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          <p>Send a message to start a conversation</p>
        </div>
      )}
    </div>
  );
};

export default Message;
