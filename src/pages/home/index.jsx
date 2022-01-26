import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Complex from "../../components/complex/card";
// import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import axios from "axios";

export default function Home(props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [complex, setComplex] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/complex`, {
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        console.log(response);
        if (response.data.data === null) {
          setError(true);
          setLoading(false);
        } else {
          setComplex(response.data.data);
          setLoading(false);
        }
      })
      .catch(function (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          gap: "5%",
          justifyContent: "center",
          flexWrap: "wrap",
          alignItems: "center",
          mt: 5,
        }}
      >
        {!error & !loading &&
          complex.map((item) => <Complex key={item.id} complex={item} />)}
      </Box>
    </>
  );
}
