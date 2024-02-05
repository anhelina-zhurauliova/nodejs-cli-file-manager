import { readdir } from "fs/promises";
import {
  handleFailedOperation,
  logCurrentDirectory,
} from "../../utils/logs.js";
import { getAbsolutePath } from "../../utils/path.js";

export const ls = async (args, currentUserDirectory) => {
  try {
    if (args.length) {
      throw new Error();
    } else {
      const absolutePath = getAbsolutePath(currentUserDirectory);

      const files = await readdir(absolutePath, { withFileTypes: true });

      console.table(
        files.map((file) => ({
          Name: file.name,
          Type: file.isDirectory() ? "directory" : "file",
        }))
      );
      logCurrentDirectory(currentUserDirectory);
    }
  } catch (e) {
    handleFailedOperation();
  }
};
