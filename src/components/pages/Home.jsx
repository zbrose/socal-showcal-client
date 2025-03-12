import Event from "../Event";
import { Masonry } from "@mui/lab";

function Home({ events, setTrigger, currentUser, isLoading }) {
  const eventsList = events.map((event, i) => {
    return (
      <Event
        key={`keyone=${i}`}
        setTrigger={setTrigger}
        event={event}
        currentUser={currentUser}
      />
    );
  });

  return !isLoading ? (
    events[0] ? (
      <Masonry columns={3} spacing={0}>
        eventsList
      </Masonry>
    ) : (
      <h2>No Upcoming Events</h2>
    )
  ) : (
    <h2>Loading Events...</h2>
  );

  // <div className="flex-container">
  //   {!isLoading ? (
  //     events[0] ? (
  //       eventsList
  //     ) : (
  //       <h2 style={{ margin: "0 auto" }}>No Upcoming Events</h2>
  //     )
  //   ) : (
  //     <h2 style={{ margin: "0 auto" }}>Loading Events...</h2>
  //   )}
  // </div>
}

export default Home;
