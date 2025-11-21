import { useGetEvents } from "@/hooks/useGetEvents";
import { EventType } from "@/types/event";
import { Enums } from "@/enums/enums";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Event from "@/components/events/Event";

const EventsPage = () => {
  const { data: events, isLoading } = useGetEvents();

  if (isLoading) {
    return <h2>{Enums.LABELS.LOADING}</h2>;
  }

  console.log(events);

  return (
    <ErrorBoundary
      fallback={<h2>There was an error getting events. Check back later.</h2>}
      onError={(error, info) => console.error("Error caught:", error, info)}
    >
      <div className="events-container">
        {events.length > 0 ? (
          events?.map((event: EventType) => (
            <Event key={event?._id} event={event} />
          ))
        ) : (
          <h2>{Enums.LABELS.NO_EVENTS}</h2>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default EventsPage;
