import { WebSocket } from "ws";

export type Message = {
  userId: string;
  text: string;
}

export type Client = {
  nickname?: string;
  ws: WebSocket;
}

export type User = {
  id: string;
  nickname: string;
}