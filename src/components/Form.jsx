import axios from "axios";
import venues from "../constants/venues";
import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { CirclePicker } from "react-color";
import { useCreateEvent } from "@/hooks/useCreateEvent";

function Form({ foundEvent }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ ...foundEvent });
  const [color, setColor] = useState("");
  const { mutate } = useCreateEvent();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formValues = {
      ...formData,
      color: color ? color : randomColor(),
    };

    if (!foundEvent) {
      mutate(formValues);
    } else {
      const token = localStorage.getItem("jwt");
      const config = {
        headers: { Authorization: `${token}` },
      };
      axios
        .put(
          `${import.meta.env.VITE_SERVER_URL}/events/${foundEvent._id}/edit`,
          formData,
          config
        )
        .then((response) => {
          console.log(response.data);
          // setTrigger("edited");
          navigate("/");
        })
        .catch(console.log);
    }
  };

  const handleChange = (e) => {
    const sel = document.querySelector("select");
    const venueName = sel.options[sel.selectedIndex].text;
    setFormData({ ...formData, address: e.target.value, venue: venueName });
  };

  const handleColor = (color) => {
    setColor(color.hex);
    setFormData({ ...formData, color: color.hex });
  };

  function randomColor() {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;
  }

  const otherAddress = (
    <>
      <label htmlFor="customVenueName">Custom Venue Name: </label>
      <input
        type="text"
        id="customVenueName"
        value={formData.customVenueName}
        onChange={(e) =>
          setFormData({ ...formData, customVenueName: e.target.value })
        }
      />
      <label htmlFor="otherAddress">Address: </label>
      <input
        type="text"
        id="otherAddress"
        value={formData.otherAddress}
        onChange={(e) =>
          setFormData({ ...formData, otherAddress: e.target.value })
        }
      />
      <label htmlFor="city">City: </label>
      <input
        type="text"
        id="city"
        value={formData.city}
        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
      />
      <label htmlFor="state">State: </label>
      <input
        type="text"
        id="state"
        value={formData.state}
        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
      />
      <label htmlFor="zipcode">Zip: </label>
      <input
        type="number"
        id="zipcode"
        value={formData.zipcode}
        onChange={(e) => setFormData({ ...formData, zipcode: e.target.value })}
      />
    </>
  );

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ backgroundColor: color }}>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />

        <label htmlFor="address">Venue: </label>
        <select
          id="address"
          value={formData.address || "default"}
          onChange={handleChange}
          placeholder="Select a Venue"
          required
        >
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

        {formData.address === venues.other ? otherAddress : ""}

        <label htmlFor="date">Date: </label>
        <input
          type="date"
          id="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />

        <label htmlFor="time">Time: </label>
        <input
          type="time"
          id="time"
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
        />

        <label htmlFor="link">Event Link: </label>
        <input
          type="text"
          id="link"
          value={formData.link}
          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          required
        />

        <label htmlFor="cover">Cover Charge: </label>
        <input
          type="number"
          id="cover"
          value={formData.cover}
          onChange={(e) => setFormData({ ...formData, cover: e.target.value })}
          required
        />

        <label htmlFor="details">Additional Info: </label>
        <textarea
          style={{ width: "100%", height: "150px" }}
          name="details"
          id="details"
          value={formData.details}
          onChange={(e) =>
            setFormData({ ...formData, details: e.target.value })
          }
        ></textarea>

        <label htmlFor="color">Select a Color: </label>

        <CirclePicker id="color" color={color} onChangeComplete={handleColor} />

        <input type="submit" />
      </form>
      <Link to="/"> Back </Link>
    </div>
  );
}

export default Form;
