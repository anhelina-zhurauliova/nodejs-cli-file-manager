import { createReadStream } from "fs";
import { Transform } from "stream";
import { createHash } from "crypto";

import { getAbsolutePath } from "../../utils/path.js";
import {
  handleFailedOperation,
  logCurrentDirectory,
} from "../../utils/logs.js";

export const hash = (args, currentDirectory) => {
  if (args.length !== 1) {
    handleFailedOperation();
  } else {
    const [path] = args;
    const absolutePath = getAbsolutePath(path, currentDirectory);

    const readable = createReadStream(absolutePath);

    const hashTransformStream = new Transform({
      transform(chunk, encoding, callback) {
        callback(null, createHash("sha256").update(chunk).digest("hex") + "\n");
      },
    });

    hashTransformStream.on("finish", () =>
      logCurrentDirectory(currentDirectory)
    );

    readable.pipe(hashTransformStream).pipe(process.stdout);
  }
};
