import axios from "axios";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ResetPassword = () => {
  let url = import.meta.env.VITE_DEPLOYEMENT==='production'?import.meta.env.VITE_ENDPOINT:"http://localhost:8081"
  let inputRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();

    let obj = {
      email: inputRef.current.value,
    };

    let res = await axios.post(
      url+`/users/forgetPassword`,
      obj
    );

    if (res.data.success === true) {
      toast.success(res.data.msg, { position: "top-right" });
      inputRef.current.value = "";
    } else {
      toast.error(res.data.msg, { position: "top-right" });
      inputRef.current.value = "";
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
      <div className="w-96 bg-white shadow-2xl rounded-2xl p-6">
        <div>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Forgot Password?
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Enter your email to receive a reset link
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <div className="absolute left-3 top-3 text-gray-400" />
              <input
                ref={inputRef}
                type="email"
                placeholder="Enter your email"
                className="pl-10 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Send Reset Link
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
