import querystring from "querystring";
import { IncomingMessage } from "http";
import { WebSocket } from "ws";
import { EventEmitter } from "events";
import { mainEE } from "./router";
import type { Client, Message, ServerUser, User } from "./types";

let clients: { [key: string]: Client } = {};
let users: Map<string, ServerUser> = new Map();
export let channels: Map<string, EventEmitter> = new Map();
export let channelMessages: {[key:string]: Message[]} = {};

export const otherUsers = (id: string): User[] => {
  let usersCopy = new Map(users);
  usersCopy.delete(id);
  return Array.from(usersCopy, ([userId, rest]) => ({id: userId, ...rest}));
}

export const registerClient = (ws: WebSocket, req: IncomingMessage) => {
  const queryString = querystring.parse(req.url!);
  const id = queryString["/?id"] as string;
  clients[id] = { ws };

  console.log(`Saved a client with UUID: ${id}.`);
  console.log(`Clients size: ${Object.keys(clients).length}\n`);
}

export const unregisterClient = (ws: WebSocket) => {
  const id = Object.keys(clients).find(id => clients[id].ws === ws) ?? "";

  users.delete(id);
  delete clients[id];
  mainEE.emit("usersUpdate");
  
  console.log(`Removed a client with UUID: ${id}.`);
  console.log(`Clients size: ${Object.keys(clients).length}`);
  console.log(`Users size: ${users.size}\n`);
}

export const loginUser = (id: string, nickname: string) => {
  clients[id].nickname = nickname;
  users.set(id, {nickname, channelMap: {}});
  mainEE.emit("usersUpdate");

  console.log(`Set ${id}'s nickname to ${nickname}.`);
  console.log(`Users size: ${users.size}\n`);
}

export const getOrCreateChannel = (userId: string, partnerId: string) => {
  // Check if there's a channel for this user pair and return its data if it exists
  const user = users.get(userId)!;
  const channelId = user.channelMap[partnerId];
  if(channelId) {
    const messages = channelMessages[channelId];
    return {channelId, messages};
  };

  // If this user pair doesn't have a channel, create a new one...
  const id = crypto.randomUUID();
  channels.set(id, new EventEmitter());
  channelMessages[id] = [];
  console.log(`Created a new channel with id ${id}`);
  console.log(`Channels size: ${channels.size}`);

  // ...store it in both user's channel map...
  const partner = users.get(partnerId)!;
  user.channelMap[partnerId] = id;
  partner.channelMap[userId] = id;

  // ...and return the channel data.
  return {channelId: id, messages: []};
}

export const changeNickname = (userId: string, newNickname: string) => {
  const user = users.get(userId)!;
  user.nickname = newNickname;
  mainEE.emit("usersUpdate");
}

export const deleteLastMessage = (userId: string, channelId: string) => {
  const channel = channels.get(channelId)!;
  const messages = channelMessages[channelId];
  const length = messages.length;

  for(let i = length - 1; i >= 0; i--) {
    if(messages[i].userId === userId) {
      messages.splice(i, 1);
      channel.emit("messagesUpdate", messages);
      return;
    }
  }
}