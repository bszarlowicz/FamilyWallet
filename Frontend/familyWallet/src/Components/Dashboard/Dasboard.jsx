import React from "react";
import layouts from "../../styles/layouts.module.css";
import { useUserContext } from "../../context/userContext";

function Dashboard() {
  const { user } = useUserContext();
  const { name, photo, isVerified, bio } = user;
  return (
    <div className={`${layouts.dashboard}`}>
      <div className={`${layouts.innerLayout}`}>
        <h1>Dashboard</h1>
        {!isVerified && <button>Verify account</button>}
      </div>
    </div>
  );
}

export default Dashboard;
