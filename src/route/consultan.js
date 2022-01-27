import React, { useEffect} from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ConsultanRoute() {
  const user = useSelector((state) => state.persistedReducer.user);
  // console.log("token = ", user);
  const navigate = useNavigate();
  // let location = useLocation();
  useEffect(() => {
  if (!user) {
    console.log("navigate login");
    navigate("/login");
  } else {
      if (user.role !== "consultan"){
        navigate("/");
    }
  }
}, []);
  return (
    <div>
      <Outlet />
    </div>
  );
}

