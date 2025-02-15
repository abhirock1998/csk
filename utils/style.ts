export const classNames = (
  ...classes: (string | undefined | null | false | object)[]
) => {
  return classes.filter(Boolean).join(" ");
};
