import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "./Home.css";
import { AuthUser } from "../../contexts/authContext";

export default function Home() {
  const [newUser, setNewUser] = useState({});
  const { user, isLoggedIn, setIsLoggedIn } = AuthUser();
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const navigate = useNavigate();

  function handleOpen() {
    if (contentRef.current === null) return;
    contentRef.current.style.right = "0%";
  }

  function handleClose() {
    if (contentRef.current === null) return;
    contentRef.current.style.right = "-100%";
  }

  function handleOpenAndUserState() {
    setIsOpen(!isOpen);
    if (user) setNewUser(user);
  }

  function handleLoggedIn() {
    handleOpenAndUserState();
    setIsLoggedIn(!isLoggedIn);
  }

  const toggle = isOpen ? handleOpen() : handleClose();
  console.log(toggle);

  return (
    <>
      {isLoggedIn ? (
        <div className="home-container">
          <div className="home-header">
            <h1 className="home-heading">YogaIntelliJ</h1>

            <div className="content-container" ref={contentRef}>
              <p className="cross" onClick={() => setIsOpen(!isOpen)}>
                <span>X</span>
              </p>

              <p onClick={() => setIsOpen(!isOpen)}>
                Hello,
                <span className="user_name">
                  {user?.name?.split(" ")[0] ||
                    newUser?.name?.split(" ")[0] ||
                    "User"}
                </span>
              </p>

              <Link to="/about">
                <button
                  className="btn btn-secondary"
                  id="about-btn"
                  onClick={handleOpenAndUserState}
                >
                  About
                </button>
              </Link>

              <button
                className="btn btn-secondary"
                id="about-btn"
                onClick={handleLoggedIn}
              >
                Log Out
              </button>
            </div>

            <div className="menu" onClick={handleOpenAndUserState}>
              <span className="hamburger"></span>
              <span className="hamburger"></span>
              <span className="hamburger"></span>
            </div>
          </div>

          <h1 className="description">A Yoga AI Trainer</h1>
          <div className="home-main">
            <div className="btn-section">
              <Link to="/start">
                <button className="btn start-btn">Let's Start</button>
              </Link>
              <Link to="/tutorials">
                <button className="btn start-btn">Tutorials</button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        navigate("/")
      )}
    </>
  );
}
