import { React, useState, useEffect } from "react";
import "./MsgForm.css";

export default function MsgForm() {
  const [msgText, setMsgText] = useState("");
  const [sender, setSender] = useState("");

  return (
    <>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" placeholder="Name" id="name" />
        </div>
        <div>
          <label htmlFor="message"> Message</label>
          <input type="text" id="message" />
        </div>

        <button type="submit">Send</button>
      </form>
    </>
  );
}
