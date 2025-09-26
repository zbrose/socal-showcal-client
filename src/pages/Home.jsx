import Event from "../components/Event";
import { Masonry } from "@mui/lab";

function Home() {
  const eventsList = events.map((event) => {
    return (
      <Event
        key={event.id}
        setTrigger={setTrigger}
        event={event}
        currentUser={currentUser}
      />
    );
  });

  return !isLoading ? (
    events[0] ? (
      <Masonry columns={3} spacing={0}>
        {eventsList}
      </Masonry>
    ) : (
      <h2>No Upcoming Events</h2>
    )
  ) : (
    <h2>Loading Events...</h2>
  );
}

export default Home;
