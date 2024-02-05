import readline from "readline";
import { homedir } from "os";

import {
  ls,
  add,
  read,
  remove,
  rename,
  cd,
  copy,
  hash,
  compress,
  decompress,
  os,
} from "./operations/index.js";
import { getUserNameFromCliArg } from "./utils/user.js";
import {
  greetUser,
  handleProgramExit,
  handleInvalidInput,
  logCurrentDirectory,
  handleFailedOperation,
} from "./utils/logs.js";
import { parseInput } from "./utils/args.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const fileManager = async () => {
  const args = process.argv.slice(2);
  const username = args.length && getUserNameFromCliArg(args[0]);

  let currentUserDirectory = homedir();

  if (username) {
    greetUser(username);

    logCurrentDirectory(currentUserDirectory);

    rl.on("line", async (input) => {
      const [operation, ...args] = input && parseInput(input);

      switch (operation) {
        case "up":
          if (args.length) {
            handleFailedOperation();
          } else {
            currentUserDirectory = await cd([".."], currentUserDirectory);
          }
          break;

        case "cd":
          currentUserDirectory = await cd(args, currentUserDirectory);
          break;

        case "ls":
          ls(args, currentUserDirectory);
          break;

        case "add":
          add(args, currentUserDirectory);
          break;

        case "cat":
          read(args, currentUserDirectory);
          break;

        case "rm":
          remove(args, currentUserDirectory);
          break;

        case "rn":
          rename(args, currentUserDirectory);
          break;

        case "cp":
          copy(args, currentUserDirectory, false);
          break;

        case "mv":
          copy(args, currentUserDirectory, true);
          break;

        case "hash":
          hash(args, currentUserDirectory);
          break;

        case "compress":
          compress(args, currentUserDirectory);
          break;

        case "decompress":
          decompress(args, currentUserDirectory);
          break;

        case "os":
          os(args, currentUserDirectory);
          break;

        case ".exit":
          if (args.length) {
            handleFailedOperation();
          } else {
            rl.close();
          }
          break;

        default:
          handleInvalidInput();
      }
    });

    rl.on("close", () => {
      handleProgramExit(username);
    });
  } else {
    process.exit(1);
  }
};

fileManager();
