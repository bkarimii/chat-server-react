import { React, useEffect, useState } from "react";
import DeleteMsg from "../SearchDeleteById/DeleteMsg";
import "./LatestMsgs.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export default function LatestMsgs() {
  const [latestMsgs, setLatestMsgs] = useState([]);
  const [msgId, setMsgId] = useState(null);

  const fetchLatestmsgs = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const runkitLink =
    "https://chat-server-behrouz-karimi-5l4glcbel8q1.runkit.sh/messages/latest";

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
          <div>
            <span>
              <FontAwesomeIcon icon={faUser} />
            </span>
            <span id="users-name"> {item.from}</span>
            <FontAwesomeIcon icon={faEdit} />
            <p>{item.text}</p>
            <span>{item.sentTime}</span>
          </div>
          <DeleteMsg msgId={item.id} />
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
