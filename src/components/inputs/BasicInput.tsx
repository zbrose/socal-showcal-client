import { FieldValues, useFormContext, Validate } from "react-hook-form";

interface BasicInputProps {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  min?: number;
  validateFn?:
    | Validate<any, FieldValues>
    | Record<string, Validate<any, FieldValues>>
    | undefined;
}

const BasicInput = ({
  name,
  label,
  type,
  placeholder,
  required,
  disabled,
  min,
  validateFn,
}: BasicInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name] as any;

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
        min={min}
        placeholder={placeholder}
        {...register(name, { required: required, validate: validateFn })}
        disabled={disabled}
      />

      {error && (
        <p className="error" role="alert">
          {error.message ?? `${name} is required`}
        </p>
      )}
    </div>
  );
};

export default BasicInput;
