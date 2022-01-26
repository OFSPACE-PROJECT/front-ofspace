import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/userSlice";

export default function Home(props) {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  // For POST requests
  axios.interceptors.response.use(
    (res) => {
      // Add configurations here
      console.log("Posted Successfully");
      return res;
    },
    (err) => {
      console.log(err);
      console.log("masuk err")
      console.log(err.response)
      if (err.response.status === 401) {
        dispatch(logout());
        navigate("/login");
      }
      return Promise.reject(err);
    }
  );
  return null;
}
