import { fixNumbers } from "./fixNumber";

export const checkInputValueJustNumber = (event: any) => {
  const fixedValue = fixNumbers(event.data);
  if (/[0-9]/.test(fixedValue)) {
  } else event.preventDefault();
};
