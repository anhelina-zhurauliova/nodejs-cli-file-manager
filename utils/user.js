export const getUserNameFromCliArg = (arg) => {
  const [property, username] = arg.split("=");

  if (property === "--username" && username) {
    return username[0].toUpperCase() + username.substring(1);
  } else {
    return null;
  }
};
