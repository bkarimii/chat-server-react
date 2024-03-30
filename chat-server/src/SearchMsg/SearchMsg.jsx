import { React, useState, useEffect } from "react";
import LatestMsgs from "../LatestMsgs/LatestMsgs";
import "./SearchMsg.css";

export default function SearchMsg() {
  const [allMessages, setAllMessages] = useState([]);
  const [searchTerm, setsearchTerm] = useState("");
  const [latestMsgs, setLatestMsgs] = useState([]);
  const [dataToShow, setDataToShow] = useState(null);

  useEffect(() => {});

  async function getAllMessages(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    const finalSearchTerm = searchTerm;
    if (finalSearchTerm.length !== 0) {
      const data = await getAllMessages(
        `http://localhost:9090/messages/search?text=${finalSearchTerm}`
      );
      setAllMessages(data);
      setsearchTerm("");
    } else {
      alert("Please type something then search for!");
    }
  };
  const handleInput = (e) => {
    setsearchTerm(e.target.value);
  };

  // this function should takes data from the child comp LatestMsgs and handle it
  const handleLatestMsgs = (recentMsgs) => {
    setLatestMsgs(recentMsgs);
    console.log(latestMsgs, "this is latest msgs inside parent");
  };

  return (
    <>
      <div id="search-container">
        <form id="search-form" onSubmit={(e) => handleSearch(e)}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleInput}
            placeholder="Search for any word"
          />
          <button type="submit">Search </button>
        </form>
        <LatestMsgs onLatestMsgs={handleLatestMsgs} />
      </div>
      <div>
        <ul>
          {allMessages.length > 0 &&
            allMessages.map((obj, index) => {
              return <li key={index}>{obj.text}</li>;
            })}
        </ul>
      </div>
    </>
  );
}
