// Utility with a potential to translate/ transform error exceptions from server side to more user friendly explanations
export const transformError = (error: string) => {
  return `Error: ${error}`;
};
