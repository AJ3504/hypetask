import React from "react";
import supabase from "./config/supabaseClient";
import Router from "./shared/Router";

function App() {
  console.log(supabase);

  return <Router></Router>;
}

export default App;
