const DIGIT = `9`;
const ALPHA = `A`;
const ALPHANUM = `S`;

export function mask(value: number | string, pattern: string): string {
  const patternChars = pattern.replace(/\W/g, ``);
  const output = pattern.split(``);
  const values = value.toString().replace(/\W/g, ``);
  const charsValues = values.replace(/\W/g, ``);
  let charCounter = 0;
  let index;

  const outputLength = output.length;
  for (index = 0; index < outputLength; index++) {
    if (charCounter >= values.length) {
      if (patternChars.length === charsValues.length) {
        return output.join(``);
      }
      break;
    } else if (
      (output[index] === DIGIT && values[charCounter].match(/\d/)) ||
      (output[index] === ALPHA && values[charCounter].match(/[a-zA-Z]/)) ||
      (output[index] === ALPHANUM && values[charCounter].match(/[0-9a-zA-Z]/))
    ) {
      output[index] = values[charCounter++];
    } else if (
      output[index] === DIGIT ||
      output[index] === ALPHA ||
      output[index] === ALPHANUM
    ) {
      return output.slice(0, index).join(``);
    } else if (output[index] === values[charCounter]) {
      charCounter++;
    }
  }
  return output.join(``).substring(0, index);
}
