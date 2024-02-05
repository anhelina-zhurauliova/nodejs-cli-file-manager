import { existsSync } from "fs";
import { getAbsolutePath, getPathInfo } from "../../utils/path.js";
import {
  handleFailedOperation,
  logCurrentDirectory,
} from "../../utils/logs.js";

export const cd = async (args, currentDirectory) => {
  try {
    if (args.length !== 1) {
      throw new Error();
    } else {
      const [path] = args;
      const absolutePath = getAbsolutePath(path, currentDirectory);
      const pathInfo = await getPathInfo(absolutePath);

      if (existsSync(absolutePath) && pathInfo.isDirectory) {
        logCurrentDirectory(absolutePath);
        return absolutePath;
      } else {
        throw new Error();
      }
    }
  } catch (e) {
    handleFailedOperation();
  }

  return currentDirectory;
};
