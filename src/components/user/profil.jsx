import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Typography, Container, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { logout } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import axios from "axios";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: "white",
    width: 800,
    backgroundColor: "#212121",
    borderRadius: 15,
    padding: (20, 20, 20, 20),
  },
  style: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    color: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
});
const userMock = {
  id: 0,
  name: "",
  role: "",
  phone: "",
  status: "",
};
export default function Profil(props) {
  const user = props.user;
  console.log(user);
  const styles = useStyles();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [userData, setUser] = useState(userMock);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const logoutHandler = () => {
    dispatch(logout());
    handleClose();
    navigate("/login");
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/user/${user.id}`, {
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.user.token,
        },
      })
      .then(function (response) {
        const resp = response.data.data;
        console.log(response.data.data);
        setUser({
          name: resp.name,
          role: resp.role,
          phone: resp.phone,
          status: resp.status,
        });
        console.log(userData);
        props.setLoading(false);
      })
      .catch(function () {
        setError(true);
        props.setLoading(false);
      });
  }, []);
  return (
    <Container className={styles.container}>
      <Box sx={{ borderBottom: " 1px solid #ABABB1" }}>
        <Typography gutterBottom variant="h4" component="div" color="white">
          Profil
        </Typography>
      </Box>
      <Box
        component="div"
        sx={{
          width: "80%",
          color: "white",
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "column",
          pt: 1,
        }}
        noValidate
        autoComplete="off"
      >
        {error && (
          <Box sx={{ display: "flex", alignItems: "center", padding: "5px" }}>
            <Box sx={{ width: "100%", height: "100%" }}>
              <Typography
                gutterBottom
                variant="h6"
                component="p"
                color="white"
                sx={{ textAlign: "left" }}
              >
                Nama
              </Typography>
            </Box>
          </Box>
        )}
        {!error && (
          <>
            <Box sx={{ display: "flex", alignItems: "center", padding: "5px" }}>
              <Box sx={{ width: "20%" }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="p"
                  color="white"
                  sx={{ textAlign: "left" }}
                >
                  Nama
                </Typography>
              </Box>
              <Box sx={{ width: "70%" }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="p"
                  color="white"
                  sx={{ width: "50%", textAlign: "left" }}
                >
                  : {userData.name}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", padding: "5px" }}>
              <Box sx={{ width: "20%" }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="p"
                  color="white"
                  sx={{ textAlign: "left" }}
                >
                  Role
                </Typography>
              </Box>
              <Box sx={{ width: "70%" }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="p"
                  color="white"
                  sx={{ width: "50%", textAlign: "left" }}
                >
                  : {userData.role}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", padding: "5px" }}>
              <Box sx={{ width: "20%" }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="p"
                  color="white"
                  sx={{ textAlign: "left" }}
                >
                  Phone
                </Typography>
              </Box>
              <Box sx={{ width: "70%" }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="p"
                  color="white"
                  sx={{ width: "50%", textAlign: "left" }}
                >
                  : {userData.phone}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
              <Button onClick={handleOpen} variant="contained" color="primary">
                Log Out
              </Button>
              <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                // sx={{bgColor: "#212121"}}
              >
                <Box
                  className={styles.style}
                  sx={{
                    backgroundColor: "#212121",
                    padding: "5px",
                    borderRadius: "10px",
                  }}
                >
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Are you sure??
                  </Typography>
                  <Box
                    sx={{ bgColor: "#212121", display: "flex", columnGap: 2 }}
                  >
                    <Button
                      onClick={logoutHandler}
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2 }}
                    >
                      Yes
                    </Button>
                    <Button
                      onClick={handleClose}
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2 }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              </Modal>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
}
