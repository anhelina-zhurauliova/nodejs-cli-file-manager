import { join } from "path";
import { createWriteStream } from "fs";

import {
  handleFailedOperation,
  logCurrentDirectory,
} from "../../utils/logs.js";

export const add = async (args, currentDirectory) => {
  try {
    if (args.length !== 1) {
      throw new Error();
    } else {
      const [fileName] = args;
      const filePath = join(currentDirectory, fileName);

      if (fileName) {
        createWriteStream(filePath);
        logCurrentDirectory(currentDirectory);
      } else {
        throw new Error();
      }
    }
  } catch (e) {
    handleFailedOperation();
  }
};
