import { React, useState } from "react";
// import LatestMsgs from "../LatestMsgs/LatestMsgs";

export default function SearchMsg() {
  const [searchedMsgs, setSearchedMsgs] = useState([]);
  const [searchTerm, setsearchTerm] = useState("");
  const [latestMsgs, setLatestMsgs] = useState([]);
  const [dataToShow, setDataToShow] = useState(null);
  const [searchedFor, setSearchedFor] = useState("");
  const [latestMsgsVisible, setLatestMsgsVisible] = useState(false);

  const handleToggleLatestMsgsVisibility = (isVisible) => {
    setLatestMsgsVisible(isVisible);
  };

  const handleLatestMsgs = async (recentMsgs) => {
    setLatestMsgs(recentMsgs);
    setDataToShow("latestMsgs");
    setLatestMsgsVisible(true); // Make latest messages visible when received
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setDataToShow("searchedMsgs");
    const finalSearchTerm = searchTerm;

    if (finalSearchTerm.length !== 0) {
      setSearchedFor(finalSearchTerm);
      const data = await getSearchedMsgs(
        `http://localhost:9090/messages/search?text=${finalSearchTerm}`
      );
      setSearchedMsgs(data);
      setsearchTerm("");
    } else {
      setDataToShow(null);
      alert("Please type something then search for!");
    }
  };

  const handleInput = (e) => {
    setsearchTerm(e.target.value);
  };

  return (
    <>
      <div id="search-container">
        <form id="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleInput}
            placeholder="Search for any word"
          />
          <button type="submit">Search </button>
        </form>
        <LatestMsgs
          onLatestMsgs={handleLatestMsgs}
          onHideLatestMsgs={handleToggleLatestMsgsVisibility}
        />
      </div>
      <div>
        <ul>
          {/* render data for a searched text */}
          {/* Code for rendering searched messages */}

          {/* render data of latest msgs */}
          {dataToShow === "latestMsgs" &&
            latestMsgsVisible &&
            latestMsgs &&
            latestMsgs.length > 0 && <div> Your Most recent chat's data:</div>}

          {dataToShow === "latestMsgs" &&
            latestMsgsVisible &&
            latestMsgs &&
            latestMsgs.length > 0 &&
            latestMsgs.map((msgObject, index) => {
              return (
                <li key={index}>
                  <br />
                  {`ID: ${msgObject.id}`} <br />
                  {`Messages: ${msgObject.text}`} <br />
                  {`Time/Date: ${msgObject.sentTime} --- ${msgObject.sentDate}`}{" "}
                </li>
              );
            })}
          {dataToShow === null && <ul></ul>}
        </ul>
      </div>
    </>
  );
}
