import { join, dirname } from "path";
import { rename as fs_rename } from "fs/promises";

import {
  handleFailedOperation,
  logCurrentDirectory,
} from "../../utils/logs.js";
import { getAbsolutePath, getPathInfo } from "../../utils/path.js";

export const rename = async (args, currentDirectory) => {
  try {
    if (args.length !== 2) {
      throw new Error();
    } else {
      const [pathToFile, newName] = args;
      const absolutePath = getAbsolutePath(pathToFile, currentDirectory);
      const directory = dirname(absolutePath);
      const pathToNewFile = join(directory, newName);

      const sourceInfo = await getPathInfo(absolutePath);

      if (sourceInfo.isFile) {
        await fs_rename(absolutePath, pathToNewFile);
        logCurrentDirectory(currentDirectory);
      } else {
        throw new Error();
      }
    }
  } catch (err) {
    handleFailedOperation();
  }
};
