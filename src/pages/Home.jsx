import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { getSocket } from "../Store/socketManager";

const Home = (props) => {
let url = import.meta.env.VITE_DEPLOYEMENT==='production'?import.meta.env.VITE_ENDPOINT:"http://localhost:8081"

  let propss = props.getUser;

  let socket = getSocket();

  let userSlice = useSelector((state) => state.user);

  const [sentMails, setsentMails] = useState([]);

  async function sentMail() {
    try {
      let res = await axios.get(url+`/email/getMail`, {
        headers: {
          'Authorization': userSlice.token,
        },
      });
      if (res.status === 200) {
        setsentMails(res.data.sentMails);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    sentMail();
  }, []);

  useEffect(() => {
    socket?.on("recieveMsg", (ans) => {
      setsentMails([...sentMails, ans]);
    });
  }, [socket?.id, sentMails]);

  return (
    <div className="flex gap-2 md:flex-row">
      <Sidebar props={propss} />
      <div className="w-full md:w-3/4 flex  flex-col gap-3 p-4 md:p-6 lg:p-8">
        {sentMails
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((mail, index) => {
            return (
              <div
                key={index}
                className="bg-gray-200 w-full rounded-xl p-4 md:p-6 lg:p-8"
              >
                <p className="cursor-pointer font-serif text-lg md:text-xl lg:text-2xl">
                  {mail.from}
                </p>
                <p className="font-serif text-gray-500 text-md md:text-lg lg:text-xl">
                  <span>Subject: </span> {mail.subject}
                </p>
                <p className="text-md font-serif md:text-lg lg:text-xl">
                  {mail.body}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
