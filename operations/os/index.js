import { EOL, homedir, arch, userInfo, cpus } from "os";
import {
  handleFailedOperation,
  logCurrentDirectory,
} from "../../utils/logs.js";

export const os = (args, currentDirectory) => {
  try {
    if (args.length !== 1) {
      throw new Error();
    } else {
      const [param] = args;

      switch (param) {
        case "--EOL":
          console.log(JSON.stringify(EOL));
          logCurrentDirectory(currentDirectory);
          break;

        case "--cpus":
          const cpusInfo = cpus().map(({ model, speed }) => ({
            model: model,
            speed: speed / 1000,
          }));

          console.log("cpus amount:", cpusInfo.length);
          console.log(cpusInfo);
          logCurrentDirectory(currentDirectory);

          break;

        case "--homedir":
          console.log(homedir());
          logCurrentDirectory(currentDirectory);

          break;

        case "--username":
          const info = userInfo();

          console.log(info.username);
          logCurrentDirectory(currentDirectory);

          break;

        case "--architecture":
          console.log(arch());
          logCurrentDirectory(currentDirectory);

          break;

        default:
          throw new Error();
      }
    }
  } catch (e) {
    handleFailedOperation();
  }
};
