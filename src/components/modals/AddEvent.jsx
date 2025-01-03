import * as React from "react";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import createEvent from "../../api/createEvent";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
const AddEvent = ({ event, setEvent, privateEvents, setPrivateEvents }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    const userInfo = localStorage.getItem("userInfo")
    const addEvent = { ...event, createdAt: new Date().toString(),
      userInfo
     };

    userInfo
    createEvent(addEvent)
      .then((response) => {

          addEvent.id = response?.body?.id;
          console.log("ADDEVENT", addEvent);
          setPrivateEvents([...privateEvents, addEvent]);
        
      })
      .catch();
  };
  return (
    <div style={{ textAlign: "center" }}>
      <Button
        variant="contained"
        startIcon={<AddRoundedIcon />}
        onClick={handleClickOpen}
      >
        Add Event
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle
            sx={{ m: 0, p: 2, textAlign: "center" }}
            id="customized-dialog-title"
          >
            Add Event
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={(theme) => ({
              position: "absolute",
              right: 8,
              top: 8,
            })}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="en-gb"
              >
                <DatePicker
                  required
                  label="When"
                  format="DD-MM-YYYY"
                  onChange={(value) => {
                    setEvent({
                      ...event,
                      recordDate: value.format("DD-MM-YYYY"),
                    });
                  }}
                />
              </LocalizationProvider>
              <TextField
                required
                id="outlined-basic"
                label="Event Title"
                variant="outlined"
                style={{ marginTop: "1em" }}
                multiline
                minRows={2}
                helperText="What is the event?"
                onChange={(e) => {
                  setEvent({ ...event, title: e.target.value });
                }}
              />
              <TextField
                required
                id="outlined-basic"
                label="How"
                variant="outlined"
                style={{ marginTop: "1em" }}
                multiline
                minRows={4}
                helperText="Describe the event?"
                onChange={(e) => {
                  setEvent({ ...event, description: e.target.value });
                }}
              />

              <p>Add Note to: </p>

              <div>
                Self
                <Switch
                  onChange={(e) => {
                    setEvent({ ...event, isPublic: e.target.checked });
                  }}
                  label="Event"
                />
                Others
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button autoFocus type="submit">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default AddEvent;
