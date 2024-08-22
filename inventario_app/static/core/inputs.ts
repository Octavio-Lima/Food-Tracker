import { Currency } from "./currency.js";

export function FormatInput(input: HTMLInputElement, format: Function): void {
  let length = 0;

  input.addEventListener("beforeinput", () => {
    length = input.value.length;
  });

  input.addEventListener("input", () => format(input, length));
  input.addEventListener("change", () => format(input, length));
}

export function PriceInput(input: HTMLInputElement, ogLength: number): void {
  let start = input.selectionStart;
  let end = input.selectionEnd;

  input.value = Currency.centsToCurrency(Currency.toCents(input.value));

  let difference = input.value.length - ogLength;

  if (start) {
    if (difference > 1) start += difference - 1;
    if (difference < -1) start += difference + 1;
    if (start < 3) start = 3;
  }
  if (end) {
    if (difference > 1) end += difference - 1;
    if (difference < -1) end += difference + 1;
    if (end < 3) end = 3;
  }

  input.setSelectionRange(start, end);
}

export function PhoneInput(input: HTMLInputElement) {
  let n = input.value.replace(/\D/g, "").slice(0, 11);
  let r = "";

  let prefix = n.slice(0, 2);
  let left = n.length > 2 ? (n.length <= 10 ? n.slice(2, 6) : n.slice(2, 7)) : "";
  let right = n.length > 6 ? (n.length <= 10 ? n.slice(6, n.length) : n.slice(7, n.length)) : "";

  if (n.length >= 1 && n.length <= 2) r = `(${prefix}`;
  else if (n.length >= 3 && n.length <= 6) r = `(${prefix}) ${left}`;
  else if (n.length >= 7) r = `(${prefix}) ${left}-${right}`;

  input.value = r;
}
