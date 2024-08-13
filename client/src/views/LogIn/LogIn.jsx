import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useUserHandlers } from "../../handlers/userHandlers";
import NavBarHome from "../../components/Navs/NavBarHome/NavBarHome";
import NavMovile from "../../components/Navs/NavMovile/NavMovile";
import styles from "./LogIn.module.css";

const LogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const { handleLogIn } = useUserHandlers();

    const handleSignIn = () => {
        handleLogIn(email, password, setError);
    };
    
    return (
      <div className={styles.logInContainer}>
        <NavMovile />
        <NavBarHome />
        <div>
          <h3>Log In</h3>
        </div>
        <div className={styles.inputContainer}>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={handleSignIn} className={styles.button}>
            Sign In
          </button>
          <button
            onClick={() => navigate("/register")}
            className={styles.button}
          >
            You don't have an account? Register
          </button>
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    );
};

export default LogIn;