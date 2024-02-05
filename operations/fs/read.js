import { createReadStream } from "fs";

import {
  handleFailedOperation,
  logCurrentDirectory,
} from "../../utils/logs.js";
import { getAbsolutePath, getPathInfo } from "../../utils//path.js";

export const read = async (args, currentDirectory) => {
  try {
    if (args.length !== 1) {
      throw new Error();
    } else {
      const [pathToFile] = args;
      const absolutePath = getAbsolutePath(pathToFile, currentDirectory);

      const pathInfo = await getPathInfo(absolutePath);

      const readableStream =
        pathInfo.exists &&
        pathInfo.isFile &&
        createReadStream(absolutePath, {
          encoding: "utf8",
        });

      readableStream.pipe(process.stdout);

      readableStream.on("end", () => {
        process.stdout.write("\n");
        logCurrentDirectory(currentDirectory);
      });
    }
  } catch (e) {
    handleFailedOperation();
  }
};
