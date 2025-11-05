import venues from "../constants/venues";
import { useState } from "react";
import { Link, useParams } from "react-router";
import { useCreateEvent } from "@/hooks/useCreateEvent";
import { useGetEvents } from "@/hooks/useGetEvents";
import { CreateForm, EventType } from "@/types/event";
import { CirclePicker } from "react-color";
import { useEditEvent } from "@/hooks/useEditEvent";
import CustomAddressForm from "./CustomAddressForm";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

const EventForm = () => {
  const params = useParams();
  const { data: events } = useGetEvents();
  const { mutate: createEvent } = useCreateEvent();
  const { mutate: editEvent } = useEditEvent();
  const foundEvent: CreateForm = events?.find(
    (event: EventType) => String(event._id) === params.id
  );

  const [formData, setFormData] = useState<CreateForm>(foundEvent);
  const [color, setColor] = useState("");

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateForm>({
    mode: "onChange",
    defaultValues: {
      title: "",
    },
  });

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
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ backgroundColor: color }}
      >
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          id="title"
          {...(register("title"), { required: true })}
          aria-invalid={errors.title ? "true" : "false"}
          placeholder="Enter a title for your event..."
        />
        {errors.title?.type === "required" && (
          <p role="alert">Title is required</p>
        )}
        <label htmlFor="address">Venue: </label>
        <select id="address" value={formData?.address || "default"} required>
          <option value="default" disabled hidden>
            Select a Venue
          </option>
          <option value={venues.eta}>ETA Highland Park</option>
          <option value={venues.goldDiggers}>Gold Diggers</option>
          <option value={venues.hollywoodBowl}>Hollywood Bowl</option>
          <option value={venues.theEcho}>The Echo</option>
          <option value={venues.theWiltern}>The Wiltern</option>
          <option value={venues.zebulon}>Zebulon</option>
          <option value={venues.picoUnion}>Pico Union Project</option>
          <option value={venues.goldFish}>The Goldfish</option>
          <option value={venues.other}>Other</option>
        </select>
        {formData?.address === venues.other && (
          <CustomAddressForm setFormData={setFormData} formData={formData} />
        )}
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
          <CirclePicker
            id="color"
            color={color}
            onChangeComplete={handleColor}
          />
        </div>
        <input type="submit" />
      </form>
      <Link to="/"> Back </Link>
      <DevTool control={control} />
    </div>
  );
};

export default EventForm;
