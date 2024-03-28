import react from "react";
import { useState, useEffect } from "react";
import MsgForm from "./MsgForm/MsgForm";
import "./App.css";
import SearchMsg from "./SearchMsg/SearchMsg";

export default function App() {
  return (
    <>
      <MsgForm />
      <SearchMsg />
    </>
  );
}
