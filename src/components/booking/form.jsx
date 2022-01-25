import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Alert, InputLabel, MenuItem, Select } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import axios from "axios";
import { useParams } from "react-router-dom";

const buildingData = {
  id: 0,
  name: "",
  units: [],
};
export default function BookingForm(props) {
  const { id } = useParams();
  const [building, setBuilding] = useState(buildingData);
  const [name, setName] = useState("");
  const [unit, setUnit] = useState(1);
  const [total, setTotal] = useState(0);
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState(new Date());
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const BookingHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(date);
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/booking`,
        {
          confirmed_name: name,
          costumer_id: parseInt(id),
          consultant_id: props.user.id,
          building_id: building.id,
          unit_id: unit,
          total_bought: parseInt(total),
          price: price,
          deal_date: date,
        },
        {
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + props.user.token,
          },
        }
      )
      .then(function (response) {
        console.log(response)
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error.message)
        setError(false);
        setLoading(false);
      });
  };
  const GetBuilding = (e) => {
    console.log("masuk");
    // e.preventDefault();
    setLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/building/search`,
        { params: { name: building.name } },
        {
          headers: { accept: "*/*", "Content-Type": "application/json" },
        }
      )
      .then(function (response) {
        if (response.data.data != null) {
          const resp = response.data.data[0];
          setBuilding({
            id: resp.id,
            name: resp.name,
            units: resp.units,
          });
          console.log(resp);
          console.log(building);
        } else {
          setError(true);
        }
        setLoading(false);
      })
      .catch(function () {
        setError(false);
        setLoading(false);
      });
  };
  const TotalHandler = (e) => {
    // e.preventDefault();
    setTotal(e.target.value);
    setPrice(e.target.value * building?.units[0].price);
    console.log(building?.units[0].price);
    console.log(total);
    console.log(price);
  };
  const isLoading = loading;
  const isError = error;

  return (
    <Container
      variant="login"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        color: "white",
        // width: "800",
        backgroundColor: "#212121",
        borderRadius: "15px",
        padding: "20px",
        mt: 2,
      }}
    >
      <Box>
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          color="white"
          //   sx={{ textAlign: "center" }}
        >
          Booking Form
        </Typography>
      </Box>
      <FormControl fullWidth onSubmit={BookingHandler} noValidate>
        <Box sx={{ display: "flex", alignItems: "center", gap: 5, padding: 2 }}>
          <Box sx={{ width: "20%" }}>
            <Typography
              gutterBottom
              variant="h6"
              component="p"
              noWrap
              color="white"
              sx={{ width: "100%" }}
            >
              Name
            </Typography>
          </Box>
          <TextField
            margin="normal"
            fullWidth
            required
            id="name"
            // label="Customer Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            autoComplete="name"
            autoFocus
            color="outline"
            variant="outlined"
          />
        </Box>
        <FormControl fullWidth>
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 5, padding: 2 }}
          >
            <Box sx={{ width: "20%" }}>
              <Typography
                gutterBottom
                variant="h6"
                component="p"
                color="white"
                sx={{ width: "100%" }}
              >
                Building
              </Typography>
            </Box>
            <Box sx={{ width: "100%", display: "flex", columnGap: "10px" }}>
              <TextField
                name="building"
                id="outlined-basic"
                value={building.name}
                onChange={(e) => setBuilding({ name: e.target.value })}
                variant="outlined"
                color="outline"
                sx={{ width: "90%" }}
              />
              <Button onClick={GetBuilding} variant="contained">
                Get
              </Button>
            </Box>
          </Box>
        </FormControl>
        {building?.units && building?.units.length !== 0 && (
          <FormControl fullWidth>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 5, padding: 2 }}
            >
              <Box sx={{ width: "20%" }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="p"
                  color="white"
                  sx={{ width: "100%" }}
                >
                  Unit
                </Typography>
              </Box>
              <Box sx={{ width: "100%", columnGap: "10px" }}>
                <Select
                  labelId="Unit"
                  id="unit"
                  value={unit}
                  label="Unit"
                  onChange={(e) => setUnit(e.target.value)}
                >
                  {!error &&
                    building?.units.map((unit) => (
                      <MenuItem key={unit.id} value={unit.id}>
                        {unit.unit_type}
                      </MenuItem>
                    ))}
                </Select>
              </Box>
            </Box>
          </FormControl>
        )}
        <Box sx={{ display: "flex", alignItems: "center", gap: 5, padding: 2 }}>
          <Box sx={{ width: "20%" }}>
            <Typography
              gutterBottom
              variant="h6"
              component="p"
              noWrap
              color="white"
              sx={{ width: "100%" }}
            >
              Total Unit
            </Typography>
          </Box>
          <TextField
            margin="normal"
            fullWidth
            required
            id="name"
            type="number"
            // label="Customer Name"
            value={total}
            onChange={(e) => TotalHandler(e)}
            name="name"
            autoComplete="name"
            autoFocus
            color="outline"
            variant="outlined"
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 5, padding: 2 }}>
          <Box sx={{ width: "20%" }}>
            <Typography
              gutterBottom
              variant="h6"
              component="p"
              noWrap
              color="white"
              sx={{ width: "100%" }}
            >
              Date
            </Typography>
          </Box>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              openTo="year"
              views={["year", "month", "day"]}
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  color="secondary"
                  sx={{ width: "100%" }}
                />
              )}
            />
          </LocalizationProvider>
        </Box>

        {isLoading && (
          <Box>
            <LoadingButton
              loading
              variant="outlined"
              sx={{ backgroundColor: "white", borderRadius: 1 }}
              color="primary"
            >
              Booking
            </LoadingButton>
          </Box>
        )}
        {isError && (
          <Alert variant="standard" severity="error">
            Something went wrong, please try again later.
          </Alert>
        )}
        {!isLoading && (
          <Box>
            <Button
              onClick={BookingHandler}
                // type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              // onSubmit={BookingHandler}
            >
              Booking
            </Button>
          </Box>
        )}
      </FormControl>
    </Container>
  );
}
