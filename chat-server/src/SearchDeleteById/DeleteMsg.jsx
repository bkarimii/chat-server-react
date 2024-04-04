import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export default function DeleteMsg({ msgId }) {
  const [status, setStatus] = useState("");

  const handleDeleteClick = async () => {
    try {
      if (msgId) {
        const response = await fetch(
          `http://localhost:9090/messages/${msgId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          setStatus("Delete successful");

          const data = await response.text();
          console.log(data);
          setStatus(data);
        } else {
          const data = await response.text();
          console.log(data, "data inside the else part");
          setStatus(data);
        }
      }
    } catch (error) {
      setStatus("An error happened!");
      console.error(error);
    }
  };

  return (
    <>
      <FontAwesomeIcon icon={faTrashAlt} onClick={handleDeleteClick} />
    </>
  );
}
