import React from "react";
import { useState, useEffect } from "react";
import "./SearchDeleteById.css";

export default function SearchById() {
  //this var set id of the msg user searches for
  const [msgId, setMsgId] = useState("");

  //this is the msg comes back from the server with the corresponding id
  const [msgOfId, setMsgOfId] = useState({});
  const [status, setStatus] = useState("");

  //this fetch function delete a specific msg from server
  const handleDeleteClick = async (e) => {
    try {
      const response = await fetch(`http://localhost:9090/messages/${msgId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setStatus("Delete successful");
        console.log(response.json());
      } else {
        setStatus("couldn't delete it");
      }
    } catch (error) {
      console.error(error);
    }
  };

  //this function fetch the message with a specific id
  const findMsg = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.log("an error happened");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const displayResults = (obj) => {
    return (
      <div id="search-result-by-id">
        Id: {obj.id} <br />
        From: {obj.from} <br />
        Message: {obj.text} <br />
      </div>
    );
  };
  const handleClick = async (e) => {
    const data = await findMsg(`http://localhost:9090/messages/${msgId}`);
    console.log(data);
    if (data.length !== 0) {
      setMsgOfId(data[0]);
    } else {
      setMsgOfId({});
      alert("No result for this Id!");
    }
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
      <button onClick={(e) => handleClick(e)}>Search it</button>
      <button onClick={(e) => handleDeleteClick(e)}>Delete it</button>
      {Object.keys(msgOfId).length > 0 ? displayResults(msgOfId) : null}
    </>
  );
}
