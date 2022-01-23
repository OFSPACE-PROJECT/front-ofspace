import React, { useState } from "react";
import { Typography, Box, Button, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useInsertMessage } from "../../hooks/InsertMessage";
import { useInsertChat } from "../../hooks/InsertChat";
import { useSelector } from "react-redux";
import { useSubscriptionChat } from "../../hooks/SubscriptionChat";

export default function ModalChat(props) {
  const user = useSelector((state) => state.persistedReducer.user);
  const [sqm, setSqm] = useState("");
  const [desk, setDesk] = useState("");
  const [value, setValue] = useState("");
  console.log(sqm + " " + desk);
  const [date, setDate] = React.useState(new Date());
  const { InsertMessage } = useInsertMessage();
  const { InsertChat, chat, loadingInsertChat } = useInsertChat();
  const { allChat, loadingAllChat } = useSubscriptionChat(user);

  const onClick = () => {
    if (props.type === "office") {
      setValue(props.name, props.type, sqm, "sqm", date);
    } else {
      setValue(props.name, props.type, desk, "desk", date);
    }
    if (!loadingAllChat & (allChat?.ofspace_chat.length !== 0)) {
      InsertMessage({
        variables: {
          chat_id: allChat?.ofspace_chat[0].id,
          message: value,
          type: user.role,
        },
      });
    } else if (!loadingAllChat & (allChat?.ofspace_chat.length === 0)) {
      InsertChat({
        variables: {
          customer_id: user.id,
        },
      });
      if (!loadingInsertChat) {
        InsertMessage({
          variables: {
            chat_id: chat.id,
            message: value,
            type: user.role,
          },
        });
      }
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "23%",
          backgroundColor: "#212121",
          border: "1px solid #808080",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#0D5C8C",
            width: "100%",
            pt: "5px",
            pb: "5px",
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            color="white"
            component="div"
            textAlign="center"
          >
            BOOK YOUR DESK HERE
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: "10px",
            pb: "10px",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              disableFuture
              color="secondary"
              label="Booking Date"
              openTo="year"
              views={["year", "month", "day"]}
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  color="secondary"
                  sx={{ width: "75%" }}
                />
              )}
            />
          </LocalizationProvider>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: "10px",
            pb: "10px",
            gap: "15%",
          }}
        >
          <TextField
            id="outlined-number"
            label="unit/sqm"
            type="number"
            color="secondary"
            value={sqm}
            onChange={(e) => setSqm(e.target.value)}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            sx={{
              width: "30%",
            }}
          />
          <TextField
            id="outlined-number"
            label="desk"
            type="number"
            value={desk}
            onChange={(e) => setDesk(e.target.value)}
            color="secondary"
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            sx={{
              width: "30%",
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            pt: "10px",
            pb: "10px",
          }}
        >
          <Typography
            gutterBottom
            variant="body"
            color="white"
            component="div"
            sx={{
              textAlign: "center",
              pl: "5px",
              pr: "5px",
            }}
          >
            Budget per month for 1 desk (7 sqm) Rp.2.100.000
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: "10px",
            pb: "10px",
          }}
        >
          <Button variant="contained" onClick={onClick} color="secondary">
            Book Now
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            pt: "10px",
            pb: "10px",
          }}
        >
          <Typography
            gutterBottom
            variant="body2"
            color="white"
            component="div"
            sx={{
              textAlign: "center",
              pl: "5px",
              pr: "5px",
            }}
          >
            With click “Book Now”, you will redirect to our verification process
            and meet out consultant in a LiveChat
          </Typography>
        </Box>
      </Box>
    </>
  );
}
