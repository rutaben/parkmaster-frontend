export const transformError = (error: string) => {
  if (error === "VALIDATION.FILE_TOO_LARGE") {
    return "Error: File is too large";
  }

  return `Error: ${error}`;
};
