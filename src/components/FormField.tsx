import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

interface FormFieldProps {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
  disabled?: boolean;
}

const FormField = ({
  name,
  label,
  type,
  placeholder,
  required,
  disabled,
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <label htmlFor={name}>
        {required && <span className="required">*</span>}
        {label}
      </label>
      <div className="input-container">
        <input
          className="form-field"
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          id={name}
          placeholder={placeholder}
          {...register(name, { required: required })}
          disabled={disabled}
        />
        {type === "password" && (
          <button
            type="button"
            className="show-password-btn"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye} />
            )}
          </button>
        )}
      </div>

      {errors[name]?.type === "required" && (
        <p className="error" role="alert">
          {name} is required
        </p>
      )}
    </>
  );
};

export default FormField;
