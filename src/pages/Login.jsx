import axios from "axios";
import { stringify } from "postcss";
import React, { useRef } from "react";
import { GiToken } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginUser } from "../Store/UserSlice";
import { Link } from "react-router-dom";

const Login = () => {
  let url = import.meta.env.VITE_DEPLOYEMENT==='production'?import.meta.env.VITE_ENDPOINT:"http://localhost:8081"
  let dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handelSubmit = async () => {
    let obj = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    if (!obj.email && !obj.password) {
      return toast.error("please fill all the fields");
    }
    if (!obj.email.includes("@")) {
      return toast.error("email not valid");
    }
    try {
      let res = await axios.post(url+`/users/login`, obj);

      if (res.status == 200) {
        dispatch(loginUser(res.data));
        localStorage.setItem(
          "mailLogin",
          JSON.stringify({ token: res.data.token })
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="bg-gray-50 font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">
              Sign in
            </h2>
            <form className="mt-8 space-y-4">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Email{" "}
                </label>
                <div className="relative flex items-center">
                  <input
                    ref={emailRef}
                    name="Email"
                    type="text"
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="email address"
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    ref={passwordRef}
                    name="password"
                    type="password"
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter password"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="text-sm">
                  <Link
                    to="/resetPassword"
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
              <div className="!mt-8">
                <button
                  onClick={handelSubmit}
                  type="button"
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Sign in
                </button>
              </div>
              <p className="text-gray-800 text-sm !mt-8 text-center">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                >
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
