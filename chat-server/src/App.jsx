import React from "react";
import { useState, useEffect } from "react";
import MsgForm from "./MsgForm/MsgForm";
import SearchMsg from "./SearchMsg/SearchMsg";
import SearchById from "./SearchDeleteById/SearchDeleteById";
import "./App.css";

export default function App() {
  return (
    <>
      <MsgForm />
      {/* <SearchMsg /> */}
      {/* <SearchById /> */}
    </>
  );
}
