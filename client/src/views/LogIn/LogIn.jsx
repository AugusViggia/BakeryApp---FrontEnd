import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useUserHandlers } from "../../handlers/userHandlers";
import NavBarHome from "../../components/Navs/NavBarHome/NavBarHome";
import NavMovile from "../../components/Navs/NavMovile/NavMovile";
import styles from "./LogIn.module.css";

const LogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const { handleLogIn } = useUserHandlers();

    const handleSignIn = () => {
        handleLogIn(email, password);
    };
    
    return (
        <div className={styles.logInContainer}>
            <NavMovile />
            <NavBarHome />
            <div>
                <h3>Log In</h3>
            </div>
            <div>
                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <button onClick={handleSignIn}>Sign In</button>
                <button onClick={() => navigate("/register")}>
                    You don't have an account? Register
                </button>
            </div>
        </div>
    );
};

export default LogIn;