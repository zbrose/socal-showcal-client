import venues from "../constants/venues";
import { useState } from "react";
import { Link, useParams } from "react-router";
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
    mode: "onChange",
    defaultValues: {
      title: "",
    },
  });

  const { handleSubmit, control } = methods;

  const onSubmit = () => {
    const formValues = {
      ...formData,
      color: color ? color : randomColor(),
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
          placeholder="Event title"
          disabled={editEventPending || createEventPending}
        />

        <Controller
          name="venue"
          control={control}
          rules={{ required: "Venue is required" }}
          render={({ field, fieldState: { error } }) => (
            <SelectInput
              name={field.name}
              label="Venue:"
              options={venues}
              value={field.value ?? ""}
              onChange={field.onChange} // receives string
              error={error?.message}
            />
          )}
        />
        {/* 
        {formData?.address === venues.other && (
          <CustomAddressForm setFormData={setFormData} formData={formData} />
        )} */}

        <label htmlFor="date">Date: </label>
        <input
          type="date"
          id="date"
          value={formData?.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />
        <label htmlFor="time">Time: </label>
        <input
          type="time"
          id="time"
          value={formData?.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
        />
        <label htmlFor="link">Event Link: </label>
        <input
          type="text"
          id="link"
          value={formData?.link}
          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          required
        />
        <label htmlFor="cover">Cover Charge: </label>
        <input
          type="number"
          id="cover"
          value={formData?.cover}
          onChange={(e) => setFormData({ ...formData, cover: e.target.value })}
          required
        />
        <label htmlFor="details">Additional Info: </label>
        <textarea
          style={{ width: "100%", height: "150px" }}
          name="details"
          id="details"
          value={formData?.details}
          onChange={(e) =>
            setFormData({ ...formData, details: e.target.value })
          }
        ></textarea>
        <p>Select a Color:</p>
        <div className="center">
          <CirclePicker color={color} onChangeComplete={handleColor} />
        </div>
        <input type="submit" />
      </form>
      <Link to="/"> Back </Link>
      <DevTool control={methods.control} />
    </FormProvider>
  );
};

export default EventInput;
