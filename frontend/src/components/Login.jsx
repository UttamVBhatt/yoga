import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { AuthUser } from "../contexts/authContext";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "./Signup";

import "./../styles/login.css";
import video from "./../utils/video.mp4";
import Button from "./Button";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isClick, setIsClick] = useState(false);

  const style = useRef(0);
  const passStyle = useRef(0);
  // const inputStyle = useRef(null);

  const { setUser, setIsLoggedIn } = AuthUser();

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setEmail(e.target[0].value);
    setPassword(e.target[1].value);
    setIsClick(true);
  }

  useEffect(() => {
    async function login() {
      try {
        if (email === "" && password === "") return;

        setIsLoading(true);

        const data = await axios({
          method: "POST",
          url: `${BASE_URL}/api/v1/users/login`,
          data: {
            email,
            password,
          },
        });
        setUser(data?.data?.data?.user);
        console.log(data?.data?.data?.user);

        setIsLoading(false);
        setIsLoggedIn(true);
        navigate("/home");
      } catch (err) {
        setIsClick(false);
        setIsLoading(false);
        alert(err?.response?.data?.message);
        console.log(err);
        console.log(err?.response?.data?.message);
        navigate("/");
      }
    }
    login();
  }, [email, password, setUser, navigate, setIsLoggedIn]);

  function handleFocusOn(style) {
    style.current.style.top = "-2.1rem";
    style.current.style.left = "0.6rem";
    style.current.style.color = "white";
    style.current.style.fontSize = "1.1rem";
  }

  function handleFocusOut(style, val) {
    if (val) return;
    style.current.style.top = "0.5rem";
  }

  return (
    <>
      <div className="main">
        {isLoading ? (
          <div className="loader-div">
            <h2>Loading...</h2>
          </div>
        ) : (
          <>
            <div className="form-div">
              <form onSubmit={handleSubmit}>
                <div>
                  <label ref={style} htmlFor="email">
                    Email :-
                  </label>
                  <input
                    id="email"
                    type="email"
                    onFocus={() => handleFocusOn(style)}
                    onBlur={() => handleFocusOut(style, true)}
                  />
                </div>
                <br />
                <br />

                <div>
                  <label ref={passStyle} htmlFor="password">
                    Password :-
                  </label>
                  <input
                    onFocus={() => handleFocusOn(passStyle)}
                    onBlur={() => handleFocusOut(passStyle, true)}
                    id="password"
                    type="password"
                    minLength={8}
                  />
                </div>
                <br />
                <p>
                  Don't have an account ? <Link to="/signup">Create Now</Link>
                </p>

                <button type="submit">
                  {isClick ? "LogingIn..." : "Login"}
                </button>
              </form>
            </div>
            <Button className={"video-div"}>
              <video src={video} autoPlay loop muted></video>
            </Button>
          </>
        )}
      </div>
    </>
  );
}

export default Login;
