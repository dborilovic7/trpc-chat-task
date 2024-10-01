import { WebSocket } from "ws";
import { IncomingMessage } from "http";
import querystring from "querystring";

const clients: { [key: string]: Client } = {};

type Client = {
  nickname?: string;
  ws: WebSocket
}

export const registerClient = (ws: WebSocket, req: IncomingMessage) => {
  const queryString = querystring.parse(req.url!);
  const id = queryString["/?id"] as string;
  clients[id] = { ws };

  console.log(`Saved a client with UUID: ${id}.`);
  console.log(`Clients size: ${Object.keys(clients).length}`);
}

export const unregisterClient = (ws: WebSocket) => {
  const id = Object.keys(clients).find(id => clients[id].ws === ws) ?? "";
  delete clients[id];
  
  console.log(`Removed a client with UUID: ${id}.`);
  console.log(`Clients size: ${Object.keys(clients).length}`);
}

export const loginUser = (id: string, nickname: string) => {
  clients[id].nickname = nickname;
  console.log(`Set ${id}'s nickname to ${nickname}.`);
}
