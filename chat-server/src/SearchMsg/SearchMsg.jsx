import { react, useState, useEffect } from "react";

export default function SearchMsg() {
  const [allMessages, setAllMessages] = useState([]);

  async function getAllMessages(url) {
    const response = await fetch(url);
    const data = await response.json();
    setAllMessages(data);
  }

  return (
    <>
      <form id="search-form">
        <input type="text" placeholder="Search for any word" />
        <button type="submit">Search</button>
      </form>
    </>
  );
}
