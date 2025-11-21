import { useGetEvents } from "@/hooks/useGetEvents";
import { EventType } from "@/types/event";
import { Enums } from "@/enums/enums";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Event from "@/components/events/Event";

const EventsPage = () => {
  const { data: events, isLoading } = useGetEvents();

  const sortedEvents = events.sort((a: EventType, b: EventType) => {
    const aTime = a.date ? new Date(a.date).getTime() : 0;
    const bTime = b.date ? new Date(b.date).getTime() : 0;
    return aTime - bTime;
  });

  if (isLoading) {
    return <h2>{Enums.LABELS.LOADING}</h2>;
  }

  return (
    <ErrorBoundary
      fallback={<h2>There was an error getting events. Check back later.</h2>}
      onError={(error, info) => console.error("Error caught:", error, info)}
    >
      <div className="events-container">
        {events.length > 0 ? (
          sortedEvents?.map((event: EventType) => (
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
