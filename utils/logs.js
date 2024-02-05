export const greetUser = (username) =>
  console.log(`Welcome to the File Manager, ${username}!`);

export const handleProgramExit = (username) =>
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);

export const handleInvalidInput = () => console.log("Invalid input");

export const logCurrentDirectory = (currentDirectory) =>
  console.log(`You are currently in ${currentDirectory}`);

export const handleFailedOperation = () => console.log("Operation failed");
