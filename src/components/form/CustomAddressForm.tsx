import BasicInput from "../inputs/BasicInput";

const CustomAddressForm = () => {
  return (
    <>
      <BasicInput
        type="text"
        name="customName"
        label="address:"
        required={true}
      />

      <BasicInput
        type="text"
        name="customAddress"
        label="custom venue address:"
        required={true}
      />

      <BasicInput type="text" name="city" label="city:" required={true} />

      <BasicInput type="text" name="state" label="state:" required={true} />

      <BasicInput
        type="number"
        name="zipcode"
        label="zipcode:"
        required={true}
      />
    </>
  );
};

export default CustomAddressForm;
