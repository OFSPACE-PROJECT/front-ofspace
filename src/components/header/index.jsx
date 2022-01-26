import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";

export default function Header(props) {
  const [type, setType] = useState("address?address");
  const [input, setInput] = useState("");
  let params = {
    type: type,
    input: input,
  };
  const navigate = useNavigate();
  const navigateSearch = () => {
    navigate({
      pathname: "/search",
      search: `?${createSearchParams(params)}`,
    });
  };

  return (
    <Box
      sx={{
        paddingBottom: "10px",
        // height: "30vh",
        bgcolor: "#0D5C8C",
        display: "flex",
        flexDirection: "column",
        rowGap: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h4"
          component="div"
          sx={{
            padding: "20px",
            width: "30%",
          }}
          color="white"
          textAlign={"center"}
        >
          FIND YOUR BEST OFFICE AND COWORKING SPACE
        </Typography>
      </Box>

      <Box
        sx={{
          //   height: "60px",
          display: "flex",
          padding: "20px",
          justifyContent: "center",
          alignItems: "center",
          gap: "5px"
        }}
      >
        <Box>
          <Select
            labelId="type"
            id="type"
            value={type}
            label="type"
            color="secondary"
            onChange={(e) => setType(e.target.value)}
            sx={{ bgcolor: "secondary.button", borderRadius: "5px" }}
          >
            <MenuItem value="address?address">Address</MenuItem>
            <MenuItem value="search?name">Name</MenuItem>
          </Select>
        </Box>
        <Box>
          <TextField
          id="name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          name="name"
          autoComplete="name"
          color="secondary"
          variant="outlined"
          sx={{ bgcolor: "secondary.button", borderRadius: "5px" }}
        />
        </Box>
        <Box>
        <Button
              onClick={navigateSearch}
              // type="submit"
              variant="contained"
              color="primary"
            //   sx={{ mt: 3, mb: 2 }}
              sx={{ bgcolor: "secondary.button", height:"54.5px" }}
            >
              Search
            </Button>
        </Box>
      </Box>
    </Box>
  );
}
