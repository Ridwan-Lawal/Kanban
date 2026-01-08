import Dropdown from "@/components/ui/Dropdown";
import InputField, { PasswordInputField } from "@/components/ui/InputField";
import SubtaskCheckbox from "@/components/ui/SubtaskCheckbox";

export default function Page() {
  return (
    <div>
      <InputField />
      <PasswordInputField />
      <Dropdown />
      <SubtaskCheckbox />
    </div>
  );
}
