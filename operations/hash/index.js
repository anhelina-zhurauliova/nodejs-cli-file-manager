import { createReadStream } from "fs";
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

    const hash = new Promise((resolve, reject) => {
      const hash = createHash("sha256");
      const readable = createReadStream(absolutePath);

      readable.on("error", reject);
      readable.on("data", (chunk) => hash.update(chunk));
      readable.on("end", () => {
        resolve(hash.digest("hex"));
      });
    });

    hash
      .then((hash) => {
        console.log(hash);
        logCurrentDirectory(currentDirectory);
      })
      .catch((e) => {
        handleFailedOperation();
      });
  }
};
