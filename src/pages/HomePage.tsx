import { useGetEvents } from "@/hooks/useGetEvents";
import { Masonry } from "@mui/lab";
import { EventType } from "@/types/event";
import { Enums } from "@/enums/enums";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Event from "@/components/Event";

const HomePage = () => {
  const { data: events, isLoading } = useGetEvents();

  if (isLoading) {
    return <h2>{Enums.LABELS.LOADING}</h2>;
  }

  return (
    <ErrorBoundary fallback={<h2>There was an error getting events...</h2>}>
      {events[0] ? (
        <Masonry columns={3} spacing={0}>
          {events?.map((event: EventType) => (
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
