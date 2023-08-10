import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./shared/Router";

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
