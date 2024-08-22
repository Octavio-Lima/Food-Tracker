import { FormInput } from "./form-input.js";

export function isFormValid(inputs: FormInput[]): boolean {
  inputs.forEach((i) => i.trigger());

  if (inputs.every((i) => i.isValid)) return true;
  return false;
}
