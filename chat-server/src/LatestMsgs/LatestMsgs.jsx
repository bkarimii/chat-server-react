import { React, useEffect, useState } from "react";
import "./LatestMsgs.css";

// export default function LatestMsgs({ onLatestMsgs, onHideLatestMsgs }) {
//   const [isVisible, setIsVisible] = useState(false);

//   const handleToggleVisibility = () => {
//     setIsVisible(!isVisible);
//     onHideLatestMsgs(!isVisible);
//   };

//   const fetchLatestmsgs = async (url) => {
//     try {
//       const response = await fetch(url);
//       const data = await response.json();

//       return data;
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const link = "http://localhost:9090/messages/latest";
//   const handleClick = async () => {
//     const data = await fetchLatestmsgs(link);
//     onLatestMsgs(data);
//     setIsVisible(true);
//   };

//   return (
//     <>
//       <button onClick={handleClick}>Recent messages</button>
//       {isVisible && (
//         <button onClick={handleToggleVisibility}>Hide Messages</button>
//       )}
//     </>
//   );
// }

export default function LatestMsgs() {
  const [latestMsgs, setLatestMsgs] = useState([]);

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

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchLatestmsgs(link);
      setLatestMsgs(data);
    };

    fetchData();
  }, [latestMsgs]);

  const handleRecentMsgs = async () => {
    console.log(latestMsgs);
  };

  const chatDisplay = (arr) => {
    return arr.map((item, index) => {
      return (
        <li key={index} id="chat-history">
          <span>From:{item.from}</span>
          <p>{item.text}</p>
          <span>{item.sentTime}</span>
        </li>
      );
    });
  };

  return (
    <>
      <button onClick={handleRecentMsgs}>Show Recent Chat</button>
      <button>Hide Chat</button>
      <div>{chatDisplay(latestMsgs)}</div>
    </>
  );
}
