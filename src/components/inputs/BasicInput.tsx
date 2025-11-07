import { useFormContext } from "react-hook-form";

interface BasicInputProps {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
  disabled?: boolean;
}

const BasicInput = ({
  name,
  label,
  type,
  placeholder,
  required,
  disabled,
}: BasicInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="input-container">
      <label htmlFor={name}>
        {required && <span className="required">*</span>}
        {label}
      </label>
      <input
        className="form-field"
        type={type}
        id={name}
        placeholder={placeholder}
        {...register(name, { required: required })}
        disabled={disabled}
      />

      {errors[name]?.type === "required" && (
        <p className="error" role="alert">
          {name} is required
        </p>
      )}
    </div>
  );
};

export default BasicInput;
