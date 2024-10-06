import { Dispatch, MouseEventHandler, ReactNode, SetStateAction } from "react";
import { Message, User } from "../server/types";

export type LoginPropTypes = {
  nickname: string;
  setNickname: Dispatch<SetStateAction<string>>;
  login: MouseEventHandler;
}

export type ChatAreaPropTypes = {
  uuid: string;
  chatPartner: User|null;
  setChatPartner: Dispatch<SetStateAction<User|null>>;
  channelId: string|null;
  messages: Message[];
}

export type ChatMessagePropTypes = {
  you: boolean;
  think: boolean;
  children?: ReactNode;
}

export type PersonListPropTypes = {
  uuid: string;
  personList: User[];
  chatPartner: User|null;
  setChatPartner: Dispatch<SetStateAction<User|null>>;
  partnerToChannelMap: {[key: string]: string};
  setPartnerToChannelMap: Dispatch<SetStateAction<{[key: string]: string}>>;
  setChannelMessages: Dispatch<SetStateAction<{[key:string]: Message[]}>>;
}

export type PersonListItemPropTypes = {
  uuid: string;
  person: User;
  setChatPartner: Dispatch<SetStateAction<User|null>>;
  highlight: boolean;
  channelId: string|null;
  setPartnerToChannelMap: Dispatch<SetStateAction<{[key: string]: string}>>;
  setChannelMessages: Dispatch<SetStateAction<{[key:string]: Message[]}>>;
}