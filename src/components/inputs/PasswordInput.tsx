import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

interface PasswordInputProps {
  name: string;
  label: string;
  id?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

const PasswordInput = ({
  name,
  id,
  placeholder,
  label,
  required = false,
  disabled = false,
  className,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const passwordValue = watch("password");

  const validationRules =
    name === "password"
      ? {
          required: required ? "Password is required" : false,
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters long",
          },
          validate: {
            hasLetter: (v: string) =>
              /[A-Za-z]/.test(v) || "Password must contain at least one letter",
            hasNumber: (v: string) =>
              /\d/.test(v) || "Password must contain at least one number",
            hasSpecialChar: (v: string) =>
              /[@$!%*?&]/.test(v) ||
              "Password must contain at least one special character",
          },
        }
      : {
          required: required ? "Please confirm your password" : false,
          validate: (v: string) =>
            v === passwordValue || "Passwords do not match",
        };

  return (
    <div>
      <label htmlFor={name}>
        {required && <span className="required">*</span>}
        {label}
      </label>
      <div className="input-container">
        <input
          className={className}
          type={showPassword ? "text" : "password"}
          id={id || name}
          placeholder={placeholder}
          {...register(name, validationRules)}
          disabled={disabled}
        />
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
      </div>
      {errors[name] && (
        <p className="error" role="alert">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
};

export default PasswordInput;
