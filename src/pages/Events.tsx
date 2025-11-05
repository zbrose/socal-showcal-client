import { useGetEvents } from "@/hooks/useGetEvents";
import { EventType } from "@/types/event";
import { Enums } from "@/enums/enums";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Event from "@/components/Event";

const EventsPage = () => {
  const { data: events, isLoading } = useGetEvents();

  if (isLoading) {
    return <h2>{Enums.LABELS.LOADING}</h2>;
  }

  return (
    <ErrorBoundary fallback={<h2>There was an error getting events...</h2>}>
      <div className="events-container">
        {events[0] ? (
          events?.map((event: EventType) => (
            <Event key={event._id} event={event} />
          ))
        ) : (
          <h2>{Enums.LABELS.NO_EVENTS}</h2>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default EventsPage;
