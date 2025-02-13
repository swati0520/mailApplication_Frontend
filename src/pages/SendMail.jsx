import React, { useRef } from "react";
import Sidebar from "../components/Sidebar";
import { RiUploadCloud2Line } from "react-icons/ri";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getSocket } from "../Store/socketManager";

const SendMail = (props) => {
  let url = import.meta.env.VITE_DEPLOYEMENT==='production'?import.meta.env.VITE_ENDPOINT:"http://localhost:8081"
  let functions = props.getUser;

  let socket = getSocket();

  //  let token =JSON.parse(localStorage.getItem('mailLogin')).token

  let userslice = useSelector((state) => state.user);

  let toRef = useRef();
  let subjectdRef = useRef();
  let bodydRef = useRef();

  const handelSubmit = async (e) => {
    e.preventDefault();
    let obj = {
      to: toRef.current.value,
      subject: subjectdRef.current.value,
      body: bodydRef.current.value,
    };

    socket?.emit("sendMsg", { ...obj, form: userslice.userInfo._id });

    try {
      let res = await axios.post(url+`/email/create`, obj, {
        headers: {
          'Authorization': userslice.token,
        },
      });

      if (res.status === 200 || res.status === 201) {
        toast.success(res.data.message, { position: "top-center" });
        (toRef.current.value = ""),
          (subjectdRef.current.value = ""),
          (bodydRef.current.value = "");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex  h-full overflow-hidden ">
      <Sidebar props={functions} />
      <form
        action=""
        className="
        flex flex-col   w-full p-8 gap-3"
      >
        <div className="relative ">
          <label htmlFor="" className="absolute left-2 top-4">
            To:
          </label>

          <input
            ref={toRef}
            type="email"
            placeholder="enter a email "
            className="px-2 py-3 w-[] border-2"
          />
        </div>

        <div className="relative">
          <label htmlFor="" className="absolute left-2 top-4">
            Subject:
          </label>

          <input
            ref={subjectdRef}
            type="text"
            placeholder="enter a subject"
            className="px-20 py-3 w-full border-2"
          />
        </div>

        <div className="relative">
          <label htmlFor="" className="absolute left-2 top-4">
            Text:{" "}
          </label>
          <textarea
            ref={bodydRef}
            name=""
            className="px-20 py-3 w-full border-2 min-h-[58.3vh]"
            id=""
          ></textarea>
          <div className="flex gap-2 ">
            <button
              onClick={handelSubmit}
              className="w-max  text-black border-2  bg-blue-500 rounded-md px-4 py-2"
            >
              send
            </button>

            <label htmlFor="file">
              {" "}
              <RiUploadCloud2Line size={30} />
            </label>
            <input type="file" id="file" hidden />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SendMail;
