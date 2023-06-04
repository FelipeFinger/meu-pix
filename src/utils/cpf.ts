import { generateChecksum } from './checksum';
import { isLastChar, onlyNumbers } from './string';

const LENGTH = 11;

const DOT_INDEXES = [2, 5];

const HYPHEN_INDEXES = [8];

const RESERVED_NUMBERS = [
  `00000000000`,
  `11111111111`,
  `22222222222`,
  `33333333333`,
  `44444444444`,
  `55555555555`,
  `66666666666`,
  `77777777777`,
  `88888888888`,
  `99999999999`,
];

const CHECK_DIGITS_INDEXES = [9, 10];

function isValidmask(cpf: string): boolean {
  return /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/.test(cpf);
}

function isReservedNumber(cpf: string): boolean {
  return RESERVED_NUMBERS.indexOf(cpf) >= 0;
}

function isValidChecksum(cpf: string): boolean {
  return CHECK_DIGITS_INDEXES.every((i) => {
    const mod =
      generateChecksum(
        cpf
          .slice(0, i)
          .split(``)
          .reduce((acc, digit) => acc + digit, ``),
        i + 1,
      ) % 11;

    return cpf[i] === String(mod < 2 ? 0 : 11 - mod);
  });
}

export function maskCPF(cpf?: string | number): string {
  if (!cpf) return ``;

  let digits = onlyNumbers(cpf);

  digits = digits.padStart(LENGTH, `0`);

  return digits
    .slice(0, LENGTH)
    .split(``)
    .reduce((acc, digit, i) => {
      const result = `${acc}${digit}`;

      if (!isLastChar(i, digits)) {
        if (DOT_INDEXES.indexOf(i) >= 0) return `${result}.`;
        if (HYPHEN_INDEXES.indexOf(i) >= 0) return `${result}-`;
      }

      return result;
    }, ``);
}

export function validateCPF(cpf?: string): boolean {
  if (!cpf || typeof cpf !== `string`) return false;

  const digits = onlyNumbers(cpf);

  return (
    isValidmask(cpf) && !isReservedNumber(digits) && isValidChecksum(digits)
  );
}

export function hideSensInformation(cpf?: string): string {
  if (!cpf) return ``;

  return `***${cpf.substring(3, 12)}**`;
}
