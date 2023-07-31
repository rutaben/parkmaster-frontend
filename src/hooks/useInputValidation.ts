import { ChangeEvent, useState } from "react";

export type Input = {
  name: string;
  label: string;
  type: string;
  value: string;
  validations?: ((value: string, inputs?: Input[]) => string | undefined)[];
  error: any;
  disabled?: boolean;
};

// A custom hook for handling input validation in a form
export const useInputValidation = (initialInputs: Input[]) => {
  const [inputs, setInputs] = useState<Input[]>(
    initialInputs.map((input) => ({ ...input, error: "" }))
  );

  const handleOnInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;

    setInputs((prevInputs) => {
      return prevInputs.map((prevInput) => {
        if (prevInput.name === name) {
          const newInput = { ...prevInput, value };

          // Validate the value against all the validation functions (if any)
          if (prevInput.validations) {
            const errors = prevInput.validations.map((validate) =>
              validate(value)
            );

            // Finds the first non-empty error message and set it as the input's error
            newInput.error = errors.find((error) => !!error) || "";
          }

          return newInput;
        }

        return prevInput;
      });
    });
  };

  // Resets the value of an input field to an empty string
  const resetInputValue = (name: string) => {
    setInputs((prevInputs) =>
      prevInputs.map((prevInput) =>
        prevInput.name === name ? { ...prevInput, value: "" } : prevInput
      )
    );
  };

  return { inputs, handleOnInputChange, resetInputValue };
};
