import { createReadStream, createWriteStream } from "fs";
import { basename, join } from "path";

import { getAbsolutePath, getPathInfo } from "../../utils/path.js";
import {
  handleFailedOperation,
  logCurrentDirectory,
} from "../../utils/logs.js";
import { remove } from "./remove.js";

export const copy = async (args, currentDirectory, shouldRemoveSource) => {
  try {
    if (args.length !== 2) {
      throw new Error();
    } else {
      const [file, directory] = args;

      const sourcePath = getAbsolutePath(file, currentDirectory);
      const destinationDirectory = getAbsolutePath(directory, currentDirectory);
      const destinationPath = join(destinationDirectory, basename(sourcePath));

      const sourceInfo = await getPathInfo(sourcePath);
      const destinationInfo = await getPathInfo(destinationDirectory);

      const isReadingEnabled = sourceInfo.exists && sourceInfo.isFile;
      const isWritingEnabled =
        destinationInfo.exists && destinationInfo.isDirectory;

      const readable =
        isReadingEnabled &&
        createReadStream(sourcePath, {
          encoding: "utf8",
        });

      const writable =
        isReadingEnabled &&
        isWritingEnabled &&
        createWriteStream(destinationPath);

      const stream = readable.pipe(writable);

      stream.on("finish", () => {
        shouldRemoveSource
          ? remove([sourcePath], currentDirectory)
          : logCurrentDirectory(currentDirectory);
      });
    }
  } catch (e) {
    handleFailedOperation();
  }
};
