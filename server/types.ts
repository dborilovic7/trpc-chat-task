import { WebSocket } from "ws";

export type Message = {
  userId: string;
  channelId: string;
  text: string;
  thinkStyling?: boolean;
}

export type Client = {
  nickname?: string;
  ws: WebSocket;
}

export type User = {
  id: string;
  nickname: string;
  channelMap: { [key: string]: string };
}

export type ServerUser = {
  nickname: string;
  channelMap: { [key: string]: string };
}