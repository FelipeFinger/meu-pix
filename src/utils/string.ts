export function onlyNumbers(input?: string | number): string {
  if (!input) return ``;

  return String(input).replace(/[^\d]/g, ``);
}

export function isLastChar(index?: number, input?: string): boolean {
  if (!index || !input) return false;

  return index === input.length - 1;
}

export function onlyAlphaNum(input?: string): string {
  if (!input) return ``;

  return String(input).replace(/[^\w]/g, ``);
}

export function normalize(
  str?: string,
  options: { allowSpaces: boolean } = { allowSpaces: false },
): string {
  if (!str) return ``;

  return str
    .normalize(`NFD`)
    .replace(
      options.allowSpaces
        ? /[\u0300-\u036f]|[^a-zA-Z0-9 ]/gi
        : /[\u0300-\u036f]|[^a-zA-Z0-9]/gi,
      ``,
    );
}
