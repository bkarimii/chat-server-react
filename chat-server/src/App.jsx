import React from "react";
import { useState, useEffect } from "react";
import MsgForm from "./MsgForm/MsgForm";
import SearchMsg from "./SearchMsg/SearchMsg";
import SearchById from "./SearchById/SearchById";
import "./App.css";

export default function App() {
  return (
    <>
      <MsgForm />
      <SearchMsg />
      <SearchById />
    </>
  );
}
