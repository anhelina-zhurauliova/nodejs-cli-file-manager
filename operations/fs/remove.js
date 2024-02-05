import { rm } from "fs/promises";

import {
  handleFailedOperation,
  logCurrentDirectory,
} from "../../utils/logs.js";
import { getAbsolutePath } from "../../utils/path.js";

export const remove = async (args, currentDirectory) => {
  try {
    if (args.length !== 1) {
      handleFailedOperation();
    } else {
      const [pathToFile] = args;
      const absolutePath = getAbsolutePath(pathToFile, currentDirectory);

      await rm(absolutePath);

      logCurrentDirectory(currentDirectory);
    }
  } catch (err) {
    handleFailedOperation();
  }
};
