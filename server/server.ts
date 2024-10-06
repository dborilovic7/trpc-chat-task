import express from "express";
import cors from "cors";
import http from "http";
import { appRouter, AppRouter } from "./router";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { Server as wsServer } from "ws";
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import { registerClient, unregisterClient } from "./clientHandler";

const PORT = 3000;

// HTTP Server
const app = express();
const server = http.createServer(app);

// WS Server
const wss = new wsServer({ server });
const wssHandler = applyWSSHandler<AppRouter>({
  wss,
  router: appRouter
});

app.use(cors());

app.use("/", createExpressMiddleware<AppRouter>({
  router: appRouter
}))

wss.on("connection", (ws, req) => {
  registerClient(ws, req);

  ws.on("close", () => unregisterClient(ws));
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}\n`);
})

process.on("SIGTERM", () => {
  wssHandler.broadcastReconnectNotification();
  wss.close();
  server.close();
})