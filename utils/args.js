export const parseInput = (input) =>
  input.match(/\\?.|^$/g).reduce(
    (previous, current) => {
      if (current === '"') {
        previous.quote ^= 1;
      } else if (!previous.quote && current === " ") {
        previous.push("");
      } else {
        previous[previous.length - 1] += current.replace(/\\(.)/, "$1");
      }
      return previous;
    },
    [""]
  );
