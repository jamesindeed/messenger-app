import { Avatar, IconButton } from "@material-ui/core";
import React, { useState } from "react";
import "../Styles/Chat.css";
import {
  AttachFile,
  MoreVert,
  SearchOutlined,
  InsertEmoticon,
} from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";
import axios from '../axios';

function Chat({ messages }) {
const [input, setInput] = useState("");

const sendMessage = async (e) => {
  e.preventDefault();

  await axios.post("/messages/new", {
    message: input,
    name: "User",
    timestamp: "Just now!",
    received: false,
  });

  setInput('');
};

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />

        <div className="chat__headerInfo">
          <h3>Room Name</h3>
          <p>Last seen at...</p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => (
          <p className={`${message.received === false ? "chat__message chat__sent" : "chat__message"}`}>
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">{message.timestamp}</span>
          </p>
        ))}
      </div>

      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            type="text"
          />
          <button onClick={sendMessage} type="submit">Send</button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
