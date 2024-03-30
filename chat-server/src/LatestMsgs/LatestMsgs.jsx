import { React, useState, useEffect } from "react";

export default function LatestMsgs({ onLatestMsgs }) {
  //   const [latestMsgs, setLatestMsgs] = useState([]);

  //fetch function to get most recent msgs
  const fetchLatestmsgs = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const link = "http://localhost:9090/messages/latest";
  const handlClick = async (e) => {
    const data = await fetchLatestmsgs(link);
    onLatestMsgs(data);
    // setLatestMsgs(data);
  };

  return (
    <>
      <button onClick={(e) => handlClick(e)}>Recent messages</button>

      {/* <ul>
        {latestMsgs.map((msg, index) => {
          return (
            <li key={index}>
              ID: {msg.id} , Message: {msg.text} , Time/Date:{" "}
              {`${msg.sentTime} -- ${msg.sentDate}`}
            </li>
          );
        })}
      </ul> */}
    </>
  );
}
