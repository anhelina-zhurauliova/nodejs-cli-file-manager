import { createReadStream, createWriteStream } from "fs";
import { createBrotliCompress } from "zlib";
import { join, basename } from "path";

import {
  handleFailedOperation,
  logCurrentDirectory,
} from "../../utils/logs.js";
import { getAbsolutePath, getPathInfo } from "../../utils/path.js";

export const compress = async (args, currentDirectory) => {
  try {
    if (args.length !== 2) {
      throw new Error();
    } else {
      const [file, destination] = args;
      const sourcePath = getAbsolutePath(file, currentDirectory);
      const destinationDirectory = getAbsolutePath(
        destination,
        currentDirectory
      );
      const destinationPath = join(
        destinationDirectory,
        `${basename(sourcePath)}.br`
      );

      const sourceInfo = await getPathInfo(sourcePath);
      const destinationInfo = await getPathInfo(destinationDirectory);

      const isReadingEnabled = sourceInfo.exists && sourceInfo.isFile;
      const isWritingEnabled =
        destinationInfo.exists && destinationInfo.isDirectory;

      const readStream = isReadingEnabled && createReadStream(sourcePath);

      const writeStream =
        isWritingEnabled &&
        isReadingEnabled &&
        createWriteStream(destinationPath);
      const compress = createBrotliCompress();
      const stream = readStream.pipe(compress).pipe(writeStream);

      stream.on("finish", () => {
        logCurrentDirectory(currentDirectory);
      });
    }
  } catch (e) {
    handleFailedOperation();
  }
};
