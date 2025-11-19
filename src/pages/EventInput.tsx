import venues from "../constants/venues";
import { useMemo, useState } from "react";
import { Link, NavLink, useParams } from "react-router";
import { useCreateEvent } from "@/hooks/useCreateEvent";
import { useGetEvents } from "@/hooks/useGetEvents";
import { CreateForm, EventType } from "@/types/event";
import { CirclePicker } from "react-color";
import { useEditEvent } from "@/hooks/useEditEvent";
import CustomAddressForm from "../components/form/CustomAddressForm";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import BasicInput from "../components/inputs/BasicInput";
import SelectInput from "../components/inputs/SelectInput";

const EventInput = () => {
  const params = useParams();
  const { data: events } = useGetEvents();
  const { mutate: createEvent, isPending: createEventPending } =
    useCreateEvent();
  const { mutate: editEvent, isPending: editEventPending } = useEditEvent();
  const foundEvent: CreateForm = events?.find(
    (event: EventType) => String(event._id) === params.id
  );

  const [formData, setFormData] = useState<CreateForm>(foundEvent);
  const [color, setColor] = useState("");

  const methods = useForm<CreateForm>({
    mode: "all",
  });

  const {
    handleSubmit,
    control,
    watch,
    formState: { isValid },
  } = methods;

  const venueMap = useMemo(
    () => new Map(venues.map((v) => [v.name.toLowerCase(), v])),
    []
  );

  const selectedVenue = watch("venue");

  const onSubmit = (data: CreateForm) => {
    const venueKey = String(data.venue ?? "").toLowerCase();
    const foundVenue = venueMap.get(venueKey);
    const address = foundVenue?.address ?? data.address ?? "";

    methods.setValue("address", address);

    const formValues = {
      ...data,
      address,
      color: color || randomColor(),
    };

    if (!foundEvent) {
      createEvent(formValues);
    } else {
      editEvent(formValues);
    }
  };

  const handleColor = (color: any) => {
    setColor(color.hex);
    setFormData({ ...formData, color: color.hex });
  };

  function randomColor() {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ backgroundColor: color }}
      >
        <BasicInput
          type="text"
          name="title"
          label="event title:"
          required={true}
          placeholder="give your event a title"
          disabled={editEventPending || createEventPending}
        />

        <Controller
          name="venue"
          control={control}
          rules={{ required: "Venue is required" }}
          render={({ field, fieldState: { error } }) => (
            <SelectInput
              name={field.name}
              label="venue:"
              options={venues}
              value={field.value ?? ""}
              onChange={field.onChange}
              error={error?.message}
              required
            />
          )}
        />

        {selectedVenue === "Custom Address" && (
          <CustomAddressForm setFormData={setFormData} formData={formData} />
        )}

        <BasicInput
          type="date"
          name="date"
          label="event date:"
          required
          disabled={editEventPending || createEventPending}
        />

        <BasicInput
          type="time"
          name="time"
          label="event time:"
          required
          disabled={editEventPending || createEventPending}
        />

        <BasicInput
          type="text"
          name="link"
          label="event link:"
          placeholder="add a link to your event"
          disabled={editEventPending || createEventPending}
        />

        <BasicInput
          type="number"
          name="price"
          label="ticket price:"
          placeholder="ticket price"
          min={0}
          disabled={editEventPending || createEventPending}
        />

        <Controller
          name="details"
          control={control}
          render={({ field }) => (
            <>
              <label htmlFor="details">event details: </label>
              <textarea
                className="details-input"
                name={field.name}
                value={field.value}
                onChange={field.onChange}
              ></textarea>
            </>
          )}
        />

        <p>Select a Color:</p>
        <div className="center">
          <CirclePicker color={color} onChangeComplete={handleColor} />
        </div>
        <div className="flex-row">
          <input className="button" type="submit" disabled={!isValid} />
          <NavLink className="nav-link" to="/">
            Cancel
          </NavLink>
        </div>
      </form>
      <DevTool control={methods.control} />
    </FormProvider>
  );
};

export default EventInput;
