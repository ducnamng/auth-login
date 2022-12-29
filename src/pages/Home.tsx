import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import store from "../state/store";
import { logout } from "../state/action";
import { Button } from "@mui/material";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = store.getState().authReducer["currentUser"]["username"];

  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  return (
    <div>
      <div className="flex justify-between px-5 py-3">
        <h1 className="text-[#333399] text-3xl font-semibold ">Home</h1>

        <Button variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-[100vh]">
        <p className="flex justify-center items-center h-full flex-col">
          <span className="text-white text-3xl font-semibold">
            Hello {username ? username : ""}
          </span>
          <span className="text-white text-3xl font-semibold">
            Have a nice day !
          </span>
        </p>
      </div>
    </div>
  );
}

export default Home;
