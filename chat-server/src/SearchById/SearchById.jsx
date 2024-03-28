import React from "react";
import { useState, useEffect } from "react";

export default function SearchById() {
  const [msgId, setMsgId] = useState("");
  const [msgOfId, setMsgOfId] = useState("");

  const findMsg = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  const handleClick = async (e) => {
    const data = await findMsg(`http://localhost:9090/messages/${msgId}`);
    console.log(data);
    setMsgOfId(data[0].text);
  };
  const handleInput = (e) => {
    setMsgId(e.target.value);
  };
  return (
    <>
      <input
        type="text"
        placeholder="type the id of the message"
        value={msgId}
        onChange={handleInput}
      />
      <button onClick={(e) => handleClick(e)}>Search By Id</button>
      <div>{msgOfId}</div>
    </>
  );
}
