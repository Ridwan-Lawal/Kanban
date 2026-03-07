import { EyeClosed, EyeIcon } from "lucide-react";
import { PropsWithChildren } from "react";

interface InputFieldProps extends PropsWithChildren {
  label: string;
  error?: string;
  htmlFor: string;
  isPasswordShown?: boolean;
  onPasswordVisiblity?: () => void;
}

export default function InputField({ label, error, htmlFor, children }: InputFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="body-m text-medium-grey dark:text-white">
        {label}
      </label>

      <div className="input__field__container">
        {children}

        {error && <p className="body-l text-red">{error}</p>}
      </div>
    </div>
  );
}

// error: border-red

export function PasswordInputField({
  children,
  htmlFor,
  error,
  label,
  isPasswordShown,
  onPasswordVisiblity,
}: InputFieldProps) {
  const iconStyle = "text-medium-grey size-5 cursor-pointer dark:text-white";

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="body-m text-medium-grey dark:text-white">
        {label}
      </label>

      <div className="input__field__container">
        {children}

        <button type="button" onClick={onPasswordVisiblity}>
          {isPasswordShown ? (
            <EyeClosed className={iconStyle} />
          ) : (
            <EyeIcon className={iconStyle} />
          )}
        </button>
      </div>
      {error && <p className="body-l text-red text-right text-xs">{error}</p>}
    </div>
  );
}

// Build the subtask checkbbox
