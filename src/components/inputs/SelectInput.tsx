interface SelectOption {
  id: number;
  name: string;
  address: string;
}

interface SelectInputProps {
  name: string;
  label: string;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
}

const SelectInput = ({
  name,
  label,
  options,
  value,
  onChange,
  required,
  disabled,
  error,
}: SelectInputProps) => {
  return (
    <div className="input-container">
      <label htmlFor={name}>
        {required && <span className="required">*</span>}
        {label}
      </label>

      <select
        id={name}
        name={name}
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        required={required}
        disabled={disabled}
        className="form-field"
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.name}>
            {opt.name}
          </option>
        ))}
      </select>

      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default SelectInput;
