import { CheckCircle, CircleX } from "lucide-react";

interface PasswordReqProps {
  isPasswordReqListOpen: boolean;
  passwordReqs: {
    met: boolean;
    name: string;
    regex: RegExp;
    message: string;
  }[];
}

export default function PasswordRequirements({
  isPasswordReqListOpen,
  passwordReqs,
}: PasswordReqProps) {
  return (
    <div
      className={`grid transition-all ${isPasswordReqListOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
    >
      <ul className="overflow-hidden">
        {passwordReqs.map((req, idx) => (
          <li
            key={idx}
            className={`flex items-start gap-2 space-y-2 text-xs text-[11px] font-medium ${req.met ? "text-green-600" : "text-medium-grey"}`}
          >
            {req.met ? <CheckCircle className="size-3" /> : <CircleX className="size-3" />}
            <span>{req.message}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
