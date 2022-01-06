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
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const Hero = () => {
  const [type, setType] = useState("");

  const handleChange = (e) => {
    setType(e.target.value);
  };
  return (
    <div>
      <Container
        direction='column'
        alignItems='center'
        justifyContent='center'
        style={{
          paddingTop: "50px",
          height: "50vh",
        }}
      >
        <Typography variant='h4' color='white' align='center'>
          FIND YOUR BEST OFFICE AND COWORKING SPACE
        </Typography>
        <Grid
          container
          spacing={3}
          sx={{ m: 2 }}
          alignItems='center'
          justifyContent='center'
        >
          <Grid item xs>
            <FormControl fullWidth>
              <InputLabel
                id='demo-simple-select-label'
                // style={{ color: "#000" }}
              >
                Type
              </InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={type}
                label='type'
                onChange={handleChange}
                // style={{ color: "#000" }}
              >
                <MenuItem value={"office"}>Office</MenuItem>
                <MenuItem value={"coworking-space"}>Coworking Space</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                label='Search Building'
                // style={{ color: "#000", width: "100%" }}
                fullWidth
              />
            </FormControl>
          </Grid>
          <Grid item xs>
            <Button variant='contained'>Filter</Button>
          </Grid>
        </Grid>
        <Box textAlign='center'>
          <Button variant='contained'>Search</Button>
        </Box>
      </Container>
    </div>
  );
};

export default Hero;
