import React, { useState, useEffect } from "react";
import BuildingCard from "../../components/review/detailBuilding.jsx";
import Form from "../../components/review/form.jsx";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { Box, CircularProgress, Container, Typography } from "@mui/material";

export default function ReviewForm(props) {
  const [searchParams] = useSearchParams();
  const [error, setError] = useState(false);
  const [building, setBuilding] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/building/${searchParams.get(
          "building"
        )}`,
        {
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + props.user.token,
          },
        }
      )
      .then(function (response) {
        console.log(response.data.data);
        setBuilding(response.data.data);
        setLoading(false);
      })
      .catch(function () {
        setError(true);
        setLoading(false);
      });
  }, []);
  return (
    <>
      {loading && (
        <Box
          sx={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress
            style={{ width: "200px", height: "200px", color: "#white" }}
          />
        </Box>
      )}
      {!loading && (
        <Container
          sx={{ width: "75%", display: "flex", justifyContent: "center", flexDirection:"column", alignItems:"center", rowGap: "20px" }}
        >
          {error && (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                gutterBottom
                variant="h4"
                component="div"
                color="white"
              >
                Profil
              </Typography>
            </Box>
          )}
          {!error && (
            <>
              <BuildingCard
                building={building}
                id={searchParams.get("building")}
              />
              <Form user={props.user} building={searchParams.get("building")} unit={searchParams.get("unit")} booking={searchParams.get("booking")}/>
            </>
          )}
        </Container>
      )}
    </>
  );
}
