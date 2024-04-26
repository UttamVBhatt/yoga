import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthUser } from "../contexts/authContext";
import { useRef } from "react";

import "./../styles/signup.css";
import video from "./../utils/video.mp4";
import Button from "./Button";

export const BASE_URL = "https://yogabackend-l7dp.onrender.com";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [isClick, setIsClick] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const nameLabel = useRef(0);
  const emailLabel = useRef(0);
  const passwordLabel = useRef(null);
  const passwordConfirmLabel = useRef(null);
  const ageLabel = useRef(null);
  const genderLabel = useRef(null);
  const weightLabel = useRef(null);
  const heightLabel = useRef(null);

  const { setUser, setIsLoggedIn } = AuthUser();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setName(e.target[0].value);
    setEmail(e.target[1].value);
    setPassword(e.target[2].value);
    setPasswordConfirm(e.target[3].value);
    setAge(e.target[4].value);
    setGender(e.target[5].value);
    setWeight(e.target[6].value);
    setHeight(e.target[7].value);
    setIsClick(true);
  }

  useEffect(() => {
    async function SignUp() {
      try {
        if (
          email === "" &&
          password === "" &&
          passwordConfirm === "" &&
          name === ""
        )
          return;

        setIsLoading(true);

        const data = await axios({
          method: "POST",
          url: `${BASE_URL}/api/v1/users/signup`,
          data: {
            name,
            email,
            password,
            passwordConfirm,
            age,
            weight,
            gender,
            height,
          },
        });

        setUser(data?.data?.data?.user);
        console.log(data?.data?.data?.user);
        setIsLoading(false);
        setIsLoggedIn(true);
        navigate("/home");
      } catch (err) {
        setIsLoading(false);
        setIsClick(false);
        alert(err?.response?.data?.message);
        console.log(err?.response?.data?.message);
        navigate("/signup");
      }
    }
    SignUp();
  }, [
    name,
    email,
    password,
    passwordConfirm,
    age,
    gender,
    weight,
    navigate,
    setUser,
    height,
    setIsLoggedIn,
  ]);

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
      <div className="main-sign">
        {isLoading ? (
          <div className="loader-div-sign">
            <h2>Loading...</h2>
          </div>
        ) : (
          <>
            <div className="form-div-sign">
              <form onSubmit={handleSubmit}>
                <div>
                  <label ref={nameLabel} htmlFor="name">
                    Name :-
                  </label>
                  <input
                    id="name"
                    type="name"
                    onFocus={() => handleFocusOn(nameLabel)}
                    onBlur={() => handleFocusOut(nameLabel, true)}
                  />
                </div>
                <br />
                <br />
                <div>
                  <label ref={emailLabel} htmlFor="email">
                    Email :-
                  </label>
                  <input
                    id="email"
                    type="email"
                    onFocus={() => handleFocusOn(emailLabel)}
                    onBlur={() => handleFocusOut(emailLabel, true)}
                  />
                </div>
                <br />
                <br />
                <div>
                  <label ref={passwordLabel} htmlFor="password">
                    Password :-
                  </label>
                  <input
                    onFocus={() => handleFocusOn(passwordLabel)}
                    onBlur={() => handleFocusOut(passwordLabel, true)}
                    id="password"
                    type="password"
                    minLength={8}
                  />
                </div>
                <br />
                <br />
                <div>
                  <label ref={passwordConfirmLabel} htmlFor="passwordConfirm">
                    Confirm Password :-
                  </label>
                  <input
                    onFocus={() => handleFocusOn(passwordConfirmLabel)}
                    onBlur={() => handleFocusOut(passwordConfirmLabel, true)}
                    id="passwordConfirm"
                    type="password"
                    minLength={8}
                  />
                </div>
                <br />
                <br />
                <div>
                  <label ref={ageLabel} htmlFor="age">
                    Your Age :-
                  </label>
                  <input
                    onFocus={() => handleFocusOn(ageLabel)}
                    onBlur={() => handleFocusOut(ageLabel, true)}
                    id="age"
                    type="number"
                    minLength={14}
                  />
                </div>
                <br />
                <br />
                <div>
                  <label ref={genderLabel} htmlFor="gender">
                    Gender :-
                  </label>
                  <select
                    id="gender"
                    onFocus={() => handleFocusOn(genderLabel)}
                    onBlur={() => handleFocusOut(genderLabel, true)}
                  >
                    <option value={"male"}>Male</option>
                    <option value={"female"}>Female</option>
                    <option value={"other"}>Other</option>
                  </select>
                </div>
                <br />
                <br />
                <div>
                  <label ref={weightLabel} htmlFor="weight">
                    Your Weight :-
                  </label>
                  <input
                    onFocus={() => handleFocusOn(weightLabel)}
                    onBlur={() => handleFocusOut(weightLabel, true)}
                    id="weight"
                    type="number"
                    minLength={35}
                  />
                </div>
                <br />
                <br />
                <div>
                  <label ref={heightLabel} htmlFor="height">
                    Your Height (in cms) :-
                  </label>
                  <input
                    onFocus={() => handleFocusOn(heightLabel)}
                    onBlur={() => handleFocusOut(heightLabel, true)}
                    id="height"
                    type="number"
                    minLength={100}
                  />
                </div>
                <br />
                <br />
                <button type="submit">
                  {isClick ? "Creating Account..." : "Create Account"}
                </button>
              </form>
            </div>
            <Button className={"video-div-sign"}>
              <video src={video} autoPlay loop muted></video>
            </Button>
          </>
        )}
      </div>
    </>
  );
}

export default Signup;
