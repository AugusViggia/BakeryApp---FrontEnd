import React from "react";
import { useSelector } from "react-redux";
import NavBarHome from "../../components/Navs/NavBarHome/NavBarHome";
import NavMovile from "../../components/Navs/NavMovile/NavMovile";
import styles from "./Profile.module.css";

const Profile = () => {
  const user = useSelector((state) => state.authSlice.user);
  const userName = useSelector((state) => state.authSlice.userName);

  console.log(user, userName);

  return (
    <div className="{style.container}">
      <NavMovile />
      <NavBarHome />
      <div className={styles.profile}>
        <h2>User Profile</h2>
        <div className="profile-info">
          <div>
            <strong>Name:</strong>
          </div>
          <div>
            <strong>Email:</strong> {user}
          </div>
          <div>
            <strong>Username:</strong> {userName}
          </div>
          <div>
            <strong>Location:</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;