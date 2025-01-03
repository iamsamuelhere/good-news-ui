import { useState, useEffect } from "react";
import AddEvent from "../components/modals/AddEvent";

import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Accordion from "../components/Accordion";
const VITE_test = import.meta.env.VITE_test;
import getEvents from "../api/getEvents";

import DeleteModal from "../components/modals/DeleteModal";
import Card from "@mui/material/Card";

import EditModal from "../components/modals/EditEvent";

const Home = () => {
  const [event, setEvent] = useState({
    title: "",
    description: "",
    isPublic: false,
    userInfo: "",
    recordDate: "",
    createdAt: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [privateEvents, setPrivateEvents] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const userInfo = localStorage.getItem("userInfo")
    getEvents(`?userEmail=${userInfo}`)
      .then((result) => {
        console.log(result);
        setPrivateEvents(result?.events || []);
      })
      .catch()
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <p
          style={{
            fontSize: "1.2em",
            textAlign: "center",
          }}
        >
          Dear, child of God!!
        </p>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card
          variant="outlined"
          style={{
            fontSize: "1em",
            padding: "0.5em",

          }}
        >
          So God created man in His own image; in the image of God. He created him; male and female He created them.
        </Card>
      </div>
      <Paper
        elevation={1}
        style={{
          height: "70vh",
          padding: "1em",
          margin: "1em",
          overflowY: "scroll",
        }}
      >
        <AddEvent
          event={event}
          setEvent={setEvent}
          privateEvents={privateEvents}
          setPrivateEvents={setPrivateEvents}
        />
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",

              alignItems: "center",
            }}
          >
            {" "}
            <CircularProgress />
          </div>
        ) :
          (privateEvents.length === 0) ?
            (
              <div style={{ display: "flex", justifyContent: "center" }}>

                <div>
                  <p>You have no events, use Add Event to create.</p>
                </div>
              </div>
            )
            : (


              privateEvents.map((privateEvent) => {
                return (
                  <Accordion
                    key={privateEvent?.id}
                    item={privateEvent}
                    backgroundColor = {privateEvent.isPublic?"#5DB996":"#074799"}
                    actions={
                      <>
                        <div style={{ display: "flex", justifyContent: "end" }}>
                          <EditModal
                            privateEvent={privateEvent}
                            event={event}
                            setEvent={setEvent}
                            privateEvents={privateEvents}
                            setPrivateEvents={setPrivateEvents}
                          />
                          <DeleteModal
                            events={privateEvents}
                            setEvents={setPrivateEvents}
                            title="Confirm Delete"
                            description={`Are you sure you want to delete the event`}
                            content={privateEvent}
                          />
                        </div>
                      </>
                    }
                  />
                );
              })
            )}
      </Paper>
    </>
  );
};

export default Home;
