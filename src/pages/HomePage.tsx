import { useGetEvents } from "@/hooks/useGetEvents";
import Event from "../components/Event";
import { Masonry } from "@mui/lab";
import { Event as Show } from "@/types/events";
import { Enums } from "@/enums/enums";

const HomePage = () => {
  const { data: events, isLoading } = useGetEvents();

  const eventsList = events?.map((event: Show) => {
    return <Event key={event._id} event={event} />;
  });

  return !isLoading ? (
    events[0] ? (
      <Masonry columns={3} spacing={0}>
        {eventsList}
      </Masonry>
    ) : (
      <h2>{Enums.LABELS.NO_EVENTS}</h2>
    )
  ) : (
    <h2>{Enums.LABELS.LOADING}</h2>
  );
};

export default HomePage;
