import { React, useState, useEffect } from "react";
import LatestMsgs from "../LatestMsgs/LatestMsgs";
import "./SearchMsg.css";

export default function SearchMsg() {
  const [searchedMsgs, setSearchedMsgs] = useState([]);
  const [searchTerm, setsearchTerm] = useState("");
  const [latestMsgs, setLatestMsgs] = useState([]);
  const [dataToShow, setDataToShow] = useState(null);

  //question , why should we put this inside useEffect ?
  useEffect(() => {
    if (latestMsgs.length > 0) {
      setDataToShow("latestMsgs");
    }
    console.log(latestMsgs, "latest msgs useeffect parent");
  }, [latestMsgs]);

  async function getSearchedMsgs(url) {
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
    setDataToShow("searchedMsgs");
    const finalSearchTerm = searchTerm;
    if (finalSearchTerm.length !== 0) {
      const data = await getSearchedMsgs(
        `http://localhost:9090/messages/search?text=${finalSearchTerm}`
      );
      setSearchedMsgs(data);
      setsearchTerm("");
    } else {
      alert("Please type something then search for!");
    }
  };
  const handleInput = (e) => {
    setsearchTerm(e.target.value);
  };

  // this function should takes data from the child comp LatestMsgs and handle it
  const handleLatestMsgs = async (recentMsgs) => {
    setLatestMsgs(recentMsgs);
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
      <div></div>
      <div>
        <ul>
          {dataToShow === "searchedMsgs" &&
            searchedMsgs.length > 0 &&
            searchedMsgs.map((obj, index) => {
              return <li key={index}>{obj.text}</li>;
            })}
          {dataToShow === "latestMsgs" &&
            latestMsgs &&
            latestMsgs.length > 0 &&
            latestMsgs.map((msgObject, index) => {
              return (
                <li
                  key={index}
                >{`ID: ${msgObject.id} <br/> Messages: ${msgObject.text} <br/> Time/Date: ${msgObject.sentTime}/${msgObject.sentDate}`}</li>
              );
            })}
          {dataToShow === null && <ul></ul>}
        </ul>
      </div>
    </>
  );
}
