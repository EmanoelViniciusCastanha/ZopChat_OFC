import { io } from "socket.io-client";

export const socket = io("http://192.168.155.19:3002", { autoConnect: false });
