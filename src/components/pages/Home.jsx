import Event from "../Event";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

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

  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 1000: 2, 1250: 3 }}>
      <Masonry>
        {!isLoading ? (
          events[0] ? (
            eventsList
          ) : (
            <h2 style={{ margin: "0 auto" }}>No Upcoming Events</h2>
          )
        ) : (
          <h2 style={{ margin: "0 auto" }}>Loading Events...</h2>
        )}
      </Masonry>
    </ResponsiveMasonry>
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
  );
}

export default Home;
