import querystring from "querystring";
import { IncomingMessage } from "http";
import { WebSocket } from "ws";
import type { Client, User } from "./types";
import { mainEE } from "./router";

let clients: { [key: string]: Client } = {};
let users: User[] = [];

export const otherUsers = (id: string) => users.filter(user => user.id !== id);

export const registerClient = (ws: WebSocket, req: IncomingMessage) => {
  const queryString = querystring.parse(req.url!);
  const id = queryString["/?id"] as string;
  clients[id] = { ws };

  console.log(`Saved a client with UUID: ${id}.`);
  console.log(`Clients size: ${Object.keys(clients).length}`);
}

export const unregisterClient = (ws: WebSocket) => {
  const id = Object.keys(clients).find(id => clients[id].ws === ws) ?? "";
  const index = users.indexOf({id, nickname: clients[id].nickname ?? ""});

  users.splice(index, 1);
  delete clients[id];
  mainEE.emit("usersUpdate");
  
  console.log(`Removed a client with UUID: ${id}.`);
  console.log(`Clients size: ${Object.keys(clients).length}`);
  console.log(`Users size: ${users.length}`);
}

export const loginUser = (id: string, nickname: string) => {
  clients[id].nickname = nickname;
  users.push({id, nickname});
  mainEE.emit("usersUpdate");

  console.log(`Set ${id}'s nickname to ${nickname}.`);
  console.log(`Users size: ${users.length}`);
}
