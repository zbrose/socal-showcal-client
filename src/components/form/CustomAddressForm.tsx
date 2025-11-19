import { CreateForm } from "@/types/event";

interface CustomAddressFormProps {
  setFormData: (data: any) => void;
  formData: CreateForm;
}

const CustomAddressForm = ({
  setFormData,
  formData,
}: CustomAddressFormProps) => {
  return (
    <>
      <label htmlFor="customVenueName">Custom Venue Name: </label>
      <input
        type="text"
        id="customVenueName"
        value={formData?.customVenueName}
        onChange={(e) =>
          setFormData({ ...formData, customVenueName: e.target.value })
        }
      />
      <label htmlFor="otherAddress">Address: </label>
      <input
        type="text"
        id="otherAddress"
        value={formData?.otherAddress}
        onChange={(e) =>
          setFormData({ ...formData, otherAddress: e.target.value })
        }
      />
      <label htmlFor="city">City: </label>
      <input
        type="text"
        id="city"
        value={formData?.city}
        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
      />
      <label htmlFor="state">State: </label>
      <input
        type="text"
        id="state"
        value={formData?.state}
        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
      />
      <label htmlFor="zipcode">Zip: </label>
      <input
        type="number"
        id="zipcode"
        value={formData?.zipcode}
        onChange={(e) => setFormData({ ...formData, zipcode: e.target.value })}
      />
    </>
  );
};

export default CustomAddressForm;
