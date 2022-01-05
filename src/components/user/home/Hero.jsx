import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const Hero = () => {
  const [type, setType] = useState("");

  const handleChange = (e) => {
    setType(e.target.value);
  };
  return (
    <div>
      <Container
        style={{
          marginTop: "50px",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs>
            <FormControl fullWidth>
              <InputLabel
                id='demo-simple-select-label'
                style={{ color: "#000" }}
              >
                Type
              </InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={type}
                label='type'
                onChange={handleChange}
                style={{ color: "#000" }}
              >
                <MenuItem value={"office"}>Office</MenuItem>
                <MenuItem value={"coworking-space"}>Coworking Space</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField label='Search Building' style={{ color: "#000" }} />
          </Grid>
          <Grid item xs>
            Item 3
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Hero;
