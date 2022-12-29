import * as React from "react";
import { useState } from "react";

import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login } from "../state/action";
import { user } from "../axiosConfig";
import { Button } from "@mui/material";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [usernameError, setusernameError] = useState("");
  const [error, setError] = useState("");

  const handleValidation = () => {
    let formIsValid = true;
    if (!username.match(/^[A-Za-z][A-Za-z0-9_]{7,29}$/)) {
      formIsValid = false;
      setusernameError(
        "Username must be from 8 to 30 characters, and starts with an anphalbet"
      );
      setError("");
      return false;
    } else {
      setusernameError("");
      formIsValid = true;
    }

    if (!password.match(/^[A-Za-z0-9_]{8,22}$/)) {
      formIsValid = false;
      setpasswordError(
        "Only Letters and length must best min 8 Chracters and Max 22 Chracters"
      );
      setError("");
      return false;
    } else {
      setpasswordError("");
      formIsValid = true;
    }
    return formIsValid;
  };

  const handleLogin = () => {
    const validate = handleValidation();
    if (validate) {
      if (username !== user.username || password !== user.password) {
        setError("Username or password is incorrect");
      } else {
        const userInfo = {
          username,
          password,
        };
        dispatch(login(userInfo, navigate));
      }
    }
  };

  return (
    <div>
      <div className="bg-rose-100 shadow-xl w-2/5 mx-auto rounded-lg mt-20">
        <Form className="form_login">
          <h1 className="text-[#333399] text-3xl font-semibold py-5 pl-5 ">
            Sign In
          </h1>
          <div className="pb-4">
            <Form.Group controlId="formBasicUsername" className="flex flex-col">
              <Form.Control
                className="border border-black rounded-lg w-3/5 mx-auto py-2 px-3 mb-2"
                type="text"
                placeholder="Username"
                onChange={(event) => setUsername(event.target.value)}
              />
              <small
                id="usernameerror"
                className="pl-2 w-3/5 mx-auto text-left"
              >
                {usernameError}
              </small>
            </Form.Group>
          </div>

          <div className="pb-4">
            <Form.Group className="flex flex-col" controlId="formBasicPassword">
              <Form.Control
                className="border border-black rounded-lg w-3/5 mx-auto py-2 px-3 mb-2"
                type="password"
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
              />
              <small
                id="passworderror"
                className="pl-2 w-3/5 mx-auto text-left"
              >
                {passwordError}
              </small>
              <small id="error" className="pl-2 w-3/5 mx-auto text-left">
                {error}
              </small>
            </Form.Group>
          </div>

          <Button
            variant="contained"
            onClick={handleLogin}
            className="!mb-5 !bg-[#333399]"
          >
            Contained
          </Button>
        </Form>
      </div>
    </div>
  );
}
