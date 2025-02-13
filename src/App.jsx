import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { ToastContainer } from "react-toastify";
import SendMail from "./pages/SendMail";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { logoutUser, updateUser } from "./Store/UserSlice";
import { Button, Modal } from "antd";
import Sent from "./pages/Sent";
import { connectToSoket } from "./Store/SocketManger";

import ResetPassword from "./pages/ResetPassword";


function App() {
  let url = import.meta.env.VITE_DEPLOYEMENT==='production'?import.meta.env.VITE_ENDPOINT:"http://localhost:8081"
  const SocketSlice = useSelector((state) => state.socket);
  // console.log(SocketSlice);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  let dispatch = useDispatch();

  let userStore = useSelector((state) => state.user);
  // console.log(userStore);
  let login = userStore.login;
  console.log(login);

  let userInfo = useRef();
  // console.log(userInfo);

  async function getUser() {
    try {
      let res = await axios.get(url+`/users/getuser`, {
        headers: {
         ' Authorization': userStore.token,
        },
      });
      if (res.status == 200) {
        // console.log("all good");
        // console.log(res.data);
        userInfo.current = res.data.user;
        dispatch(updateUser(res.data.user));
      } else {
          if(res.response.data.message==='token expired'){
            // console.log("kuch kaam krna hai");
        }
      }
    } catch (error) {
      // console.log(error);
      if (error.response.data.message === "token expired") {
        setIsModalOpen(true);
        setTimeout(() => {
          dispatch(logoutUser());
          setIsModalOpen(false);
        }, 6000);
      }
    }
  }
  useEffect(() => {
    if (userStore.token) {
      getUser();
    }
  }, [userStore.token]);

  useEffect(() => {
    if (userInfo.current?._id) {
      connectToSoket(dispatch, userInfo.current?._id);
    }
  }, [userInfo.current?._id]);

  return (
    <>
     
      <BrowserRouter>
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <h1>Token expired ! please Login again</h1>
        </Modal>
        <Routes>
          {SocketSlice.isConnected &&
            <Route
              path="/"
              element={login === true ? <Home  getUser={getUser}/> : <Navigate to="/login" />}
            />
          }
          {!SocketSlice.isConnected && <Route path='/' element={login === true ? <Home /> : <Navigate to='/login' />} />}


          <Route
            path="/login"
            element={login === false ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={login === false ? <Signup /> : <Navigate to="/" />}
          />
          {SocketSlice.isConnected && (
            <Route
              path="/sent"
              element={login === true ? <Sent  getUser={getUser}/> : <Navigate to="/login" />}
            />
          )}

          {SocketSlice.isConnected && (
            <Route
              path="/sendmail"
              element={login === true ? <SendMail  getUser={getUser}/> : <Navigate to="/login" />}
            />
          )}

          <Route
            path="/resetPassword"
            element={ <ResetPassword /> }
          />


        </Routes>
        <ToastContainer />
      </BrowserRouter>
     
    </>
  );
}

export default App;
