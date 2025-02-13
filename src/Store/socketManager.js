import { io } from "socket.io-client";
import { setStatus } from "./SocketSlice";

let socket = null;

let ENDPOINT = import.meta.env.VITE_DEPLOYEMENT==='production'?import.meta.env.VITE_ENDPOINT:"http://localhost:8081"


export const connectToSoket = (dispatch, userId) => {
  console.log(userId);
  console.log(ENDPOINT);
  socket = io(ENDPOINT, { transports: ["websocket"]});

  socket.on("connect", () => {
    dispatch(setStatus(true));
    socket.emit("adduser", userId);
  });

  socket.on("disconnect", () => {
    dispatch(setStatus(false));
  });

  return socket;
};

export const getSocket = () => socket;
