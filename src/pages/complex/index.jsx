import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Building from "../../components/building/card";
import Map from "../../components/map";
// import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ComplexPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [complex, setComplex] = useState({});
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/complex/${id}`, {
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        console.log(response.data.data);
        if (response.data.data === null) {
          setError(true);
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
      {!loading & !error && (
        <>
          <Box
            sx={{
              display: "flex",
              gap: "5%",
              justifyContent: "space-between",
              mt: 5,
              ml: 5,
              mr: 5,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "2%",
              }}
            >
              {!error & !loading &&
                complex.buildings.map((item) => (
                  <Building key={item.id} building={item} address={complex.address}/>
                ))}
            </Box>
            <Map complex={complex} />
          </Box>
        </>
      )}
    </>
  );
}
