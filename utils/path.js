import { resolve, isAbsolute } from "path";
import { existsSync } from "fs";
import { stat } from "fs/promises";

export const getAbsolutePath = (path, currentDirectory) => {
  if (isAbsolute(path)) {
    return path;
  } else {
    return resolve(currentDirectory, path.replace(/['"]+/g, ""));
  }
};

export const getPathInfo = async (path) => {
  const isExist = existsSync(path);

  const pathStat = isExist ? await stat(path) : null;
  const isPathToFile = pathStat?.isFile();
  const isPathToDirectory = pathStat?.isDirectory();

  return {
    exists: isExist,
    isFile: isPathToFile,
    isDirectory: isPathToDirectory,
  };
};
