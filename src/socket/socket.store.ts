"use client";

import { create } from "zustand";
import { socket } from "./socket";

type SocketState = {
  connect: (token: string) => void;
  disconnect: () => void;
};

export const useSocketStore = create<SocketState>(() => ({
  connect: (token) => {
    socket.auth = { token };
    socket.connect();
  },
  disconnect: () => socket.disconnect(),
}));
