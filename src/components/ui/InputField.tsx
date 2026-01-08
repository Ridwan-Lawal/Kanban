import { EyeIcon } from "lucide-react";

export default function InputField() {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="label" className="body-m text-medium-grey dark:text-white">
        Text Field (idle)
      </label>

      <div className="input__field__container">
        <input
          type="text"
          name="label"
          id="label"
          placeholder="Enter task name"
          className="input__field body-l"
        />

        {/* <p className="body-l text-red">Can&apos;t be empty</p> */}
      </div>
    </div>
  );
}

// error: border-red

export function PasswordInputField() {
  const iconStyle = "text-medium-grey size-5 cursor-pointer dark:text-white";
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="label" className="body-m text-medium-grey dark:text-white">
        Text Field (idle)
      </label>

      <div className="input__field__container">
        <input
          type="text"
          name="label"
          id="label"
          placeholder="Enter task name"
          className="input__field body-l"
        />

        <EyeIcon className={iconStyle} />
        {/* <p className="body-l text-red">Can&apos;t be empty</p> */}
      </div>
    </div>
  );
}

// Build the subtask checkbbox
