import React from "react";
import supabase from "./config/supabaseClient";
import { follow } from "./api/user";
type Props = {};

const App = (props: Props) => {
  console.log(supabase);
  follow();
  return <div>App</div>;
};
export default App;
