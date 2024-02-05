import { createReadStream, createWriteStream } from "fs";
import { createBrotliDecompress } from "zlib";
import { join, basename, extname } from "path";

import {
  handleFailedOperation,
  logCurrentDirectory,
} from "../../utils/logs.js";
import { getAbsolutePath, getPathInfo } from "../../utils/path.js";

export const decompress = async (args, currentDirectory) => {
  try {
    if (args.length !== 2) {
      throw new Error();
    } else {
      const [file, destination] = args;

      const sourcePath = getAbsolutePath(file, currentDirectory);
      const fileExt = extname(sourcePath);
      const destinationDirectory = getAbsolutePath(
        destination,
        currentDirectory
      );
      const destinationPath = join(
        destinationDirectory,
        basename(sourcePath).replace(fileExt, "")
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
      const decompress = createBrotliDecompress();

      const stream = readStream.pipe(decompress).pipe(writeStream);

      stream.on("finish", () => {
        logCurrentDirectory(currentDirectory);
      });
    }
  } catch (e) {
    handleFailedOperation();
  }
};
