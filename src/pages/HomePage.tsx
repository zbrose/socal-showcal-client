import { useGetEvents } from "@/hooks/useGetEvents";
import Event from "../components/Event";
import { Masonry } from "@mui/lab";
import { Event as Show } from "@/types/events";
import { Enums } from "@/enums/enums";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const HomePage = () => {
  const { data: events, isLoading } = useGetEvents();

  if (isLoading) {
    return <h2>{Enums.LABELS.LOADING}</h2>;
  }

  return (
    <ErrorBoundary fallback={<h2>There was an error getting events...</h2>}>
      {events[0] ? (
        <Masonry columns={3} spacing={0}>
          {events?.map((event: Show) => (
            <Event key={event._id} event={event} />
          ))}
        </Masonry>
      ) : (
        <h2>{Enums.LABELS.NO_EVENTS}</h2>
      )}
    </ErrorBoundary>
  );
};

export default HomePage;
