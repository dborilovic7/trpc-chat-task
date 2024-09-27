import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink, wsLink, splitLink, createWSClient } from "@trpc/client";
import { trpc } from "../trpc";
import App from "./App";
import "./index.css";

const HTTP_URL = "http://localhost:3000";
const WS_URL = "ws://localhost:3000";

const queryClient = new QueryClient();
const wsClient = createWSClient({ url: WS_URL });
const trpcClient = trpc.createClient({
  links: [
    splitLink({
      condition: (op) => op.type === "subscription",
      true: wsLink({ client: wsClient }),
      false: httpBatchLink({ url: HTTP_URL })
    })
  ]
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </trpc.Provider>
  </StrictMode>,
);