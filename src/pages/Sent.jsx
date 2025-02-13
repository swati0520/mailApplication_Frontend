import React, { useEffect, useState } from "react";
// import SendMail from "./SendMail";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";

const Sent = (props) => {
  let url = import.meta.env.VITE_DEPLOYEMENT==='production'?import.meta.env.VITE_ENDPOINT:"http://localhost:8081"
  let functions = props.getUser;

  let userSlice = useSelector((state) => state.user);

  const [sentMails, setsentMail] = useState([]);
  async function sentMail() {
    try {
      let res = await axios.get(url+`/email/sentmails`, {
        headers: {
          'Authorization': userSlice.token,
        },
      });
      if (res.status === 200) {
        setsentMail(res.data.sentMails);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    sentMail();
  }, []);

  const handelDelete = async (mail) => {
    console.log(mail);
    try {
      let res = await axios.delete(
        url+`/email/delete/${mail._id}`,
        {
          headers: {
            'Authorization': userSlice.token,
          },
        }
      );

      if (res.status == 200) {
        sentMail();
      }
    } catch (error) {}
  };
  return (
    <div className="flex gap-2 ">
      <Sidebar props={functions} />

      <div className="w-full flex  gap-2 ">
        {sentMails.map((mail, index) => {
          return (
            <div key={index} className=" h-full w-full relative rounded-xl p-4">
              <p className="font-serif">{mail.to}</p>
              <p className="font-serif text-gray-500 ">
                <span>Subject : </span>
                {mail.subject}
              </p>
              <p>{mail.body}</p>
              <button
                onClick={() => handelDelete(mail)}
                className="absolute right-4 top-3"
              >
                <MdDelete size={20} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sent;
