import Event from "../Event";

function Home({ events, setTrigger, currentUser }) {
  const eventsList = events.map((event, i) => {
    return (
      <div key={`keyone=${i}`}>
        <Event
          setTrigger={setTrigger}
          event={event}
          currentUser={currentUser}
        />
      </div>
    );
  });

  return (
    <>
      <div className="flex-container">
        {events[0] ? (
          eventsList
        ) : (
          <h2 style={{ margin: "0 auto" }}>No Upcoming Events</h2>
        )}
      </div>
    </>
  );
}

export default Home;
