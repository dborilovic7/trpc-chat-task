import { WebSocket } from "ws";

export type Message = {
  nickname: string;
  message: string;
}

export type Client = {
  nickname?: string;
  ws: WebSocket;
}

export type User = {
  id: string;
  nickname: string;
}