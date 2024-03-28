import { React, useState, useEffect } from "react";

export default function SearchMsg() {
  const [allMessages, setAllMessages] = useState([]);
  const [searchTerm, setsearchTerm] = useState("");

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
    const data = await getAllMessages(
      `http://localhost:9090/messages/search?text=${finalSearchTerm}`
    );
    setAllMessages(data);
    allMessages.map((object, index) => {
      return (
        <ul>
          <li key={index}>{object.text}</li>
        </ul>
      );
    });
  };
  const handleInput = (e) => {
    setsearchTerm(e.target.value);
  };
  return (
    <>
      <form id="search-form" onSubmit={(e) => handleSearch(e)}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInput}
          placeholder="Search for any word"
        />
        <button type="submit">Search</button>
      </form>
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
