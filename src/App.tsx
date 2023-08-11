import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./shared/Router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
