import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../Store/UserSlice";
import { Link } from "react-router-dom";
import { FiCamera } from "react-icons/fi";
import axios from "axios";

const Sidebar = (props) => {
  let url = import.meta.env.VITE_DEPLOYEMENT==='production'?import.meta.env.VITE_ENDPOINT:"http://localhost:8081"
  let functions = props.props;

  const dispatch = useDispatch();

  const userSlice = useSelector((state) => state.user);

  let profile = userSlice?.userInfo?.profilePic;

  const handleProfileChange = async (e) => {
    let file = e.target.files[0];

    let formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Media_App");

    let res = await axios.post(
      "https://api.cloudinary.com/v1_1/dp8ihosht/upload",
      formData
    );
    let data = res.data;

    let res1 = await axios.put(
      url+`/users/update`,
      { profilePic: data.secure_url },
      {
        headers: {
          'Authorization': userSlice.token,
        },
      }
    );

    if (res1.status === 200) {
      functions();
    }
  };

  return (
    <div className="h-[95vh] ">
      <aside className="flex flex-col sm:w-64 w-40 h-full px-4 pb-2 overflow-y-auto border-r pt-12 dark:bg-gray-200 dark:border-gray-700 relative">
        <a href="#" className="mx-auto">
          <h1 className="sm:font-bold text-sm text-center">Mail App</h1>
        </a>
        <div className="flex flex-col items-center mt-6 -mx-2  relative">
          <img
            className="object-cover sm:w-24 sm:h-24 w-12 h-12 mx-2 rounded-full"
            src={profile}
            alt="avatar"
          />
          <label className="absolute sm:bottom-14  sm:right-16 bottom-5 right-11 bg-gray-300 sm:p-2 rounded-full cursor-pointer">
            <FiCamera className="w-5 h-5 " />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfileChange}
            />
          </label>

          <h4 className="mx-2 mt-2 sm:font-medium text-sm capitalize">
            {userSlice?.userInfo?.name}
          </h4>
          <p className="mx-2 mt-1 text-sm text-black font-bold hidden sm:block">
            {userSlice?.userInfo?.email}
          </p>
        </div>
        <div className="flex flex-col justify-between flex-1 mt-6 ">
          <nav className="flex flex-col gap-3">
            <Link
              className="flex items-center px-4 py-2 bg-black  text-white transition-colors duration-300 transform rounded-lg hover:bg-gray-600"
              to="/sendmail"
            >
              <span className="mx-4 sm:font-normal font-serif text-sm text-start">
                Compose
              </span>
            </Link>
            <Link
              className="flex items-center px-4 py-2  text-black transition-colors duration-300 transform rounded-lg hover:bg-gray-600"
              to="/"
            >
              <span className="mx-4 sm:font-normal font-serif text-sm text-start">
                All Mail
              </span>
            </Link>
            <Link
              className="flex items-center px-4 py-2  text-black transition-colors duration-300 transform rounded-lg hover:bg-gray-600"
              to="/sent"
            >
              <span className="mx-4 sm:font-normal font-serif text-sm text-start">
                Sent Mail
              </span>
            </Link>
          </nav>
        </div>
        <button
          onClick={() => dispatch(logoutUser())}
          className="flex items-center w-24 px-4 py-2 bg-black  text-white transition-colors duration-300 transform rounded-lg hover:bg-gray-600"
        >
          LogOut
        </button>
      </aside>
    </div>
  );
};

export default Sidebar;
