type Value = string | number;

type SelectT = {
  value: Value;
  onChange: (value: Value) => void;
  options: {
    value: Value;
    label: Value | React.ReactNode;
  }[];
  disabled?: boolean;
};



/**
 * Select component that is globally used in the app.
 * 
 * @param value selected value.
 * @param onChange function that will be called when an option is selected. Will also return the `option.value`.
 * @param options array of objects that contains `value` (value of the option) and `label` (that will be displayed in the option).
 */
const Select: React.FC<SelectT> = ({
  value,
  onChange,
  options,
  disabled
}) => {
  return (
    <select
      className='bg-neutral-800 text-white py-1 md:py-2 px-2 md:px-4 rounded-md hover:cursor-pointer'
      value={value}
      onChange={e => onChange(e.target.value)}
      disabled={disabled}
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>{option.label}</option>
      ))}
    </select>
  );
};



export { Select };

