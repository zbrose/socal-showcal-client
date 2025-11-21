import venues from "../constants/venues";
import { useMemo, useState } from "react";
import { NavLink, useParams } from "react-router";
import { useCreateEvent } from "@/hooks/useCreateEvent";
import { useGetEvents } from "@/hooks/useGetEvents";
import { CreateForm, EventType } from "@/types/event";
import { CirclePicker } from "react-color";
import { useEditEvent } from "@/hooks/useEditEvent";
// import CustomAddressForm from "../components/form/CustomAddressForm";
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

  console.log(foundEvent);

  const [formData, setFormData] = useState<CreateForm>(foundEvent);
  const [color, setColor] = useState("");

  const methods = useForm<CreateForm>({
    mode: "all",
    defaultValues: foundEvent ?? "",
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
    const isCustom = String(data.venue).toLowerCase() === "custom address";

    const venueName = isCustom ? data.customVenue : data.venue;

    const venueKey = String(data.venue).toLowerCase();

    const foundVenue = venueMap.get(venueKey);
    const address = isCustom
      ? data.address
      : foundVenue?.address ?? data.address ?? "";

    methods.setValue("venue", venueName);
    methods.setValue("address", address);

    const { customVenue: _customVenue, ...rest } = data;

    const formValues: CreateForm = {
      ...rest,
      venue: venueName,
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
          <>
            <BasicInput
              type="text"
              name="customVenue"
              label="custom venue name:"
              placeholder="enter a custom event title"
              required={true}
              disabled={editEventPending || createEventPending}
            />
            <BasicInput
              type="text"
              name="address"
              label="event address:"
              placeholder="address, city, state and zip"
              required={true}
              disabled={editEventPending || createEventPending}
              validateFn={(value: any) => {
                const pattern =
                  /^\d+\s+[^\n,]+,\s*[A-Za-z\s'.-]+,\s*[A-Za-z]{2}\s*\d{5}$/i;
                return (
                  pattern.test(String(value || "").trim()) ||
                  "Address format must be: 123 Street Name, City, State Code 12345"
                );
              }}
            />
          </>
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
          disabled={editEventPending || createEventPending}
        />

        <BasicInput
          type="number"
          name="cover"
          label="ticket price:"
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
