import { generateChecksum } from './checksum';
import { isLastChar, onlyNumbers } from './string';

const LENGTH = 14;

const DOT_INDEXES = [1, 4];

const SLASH_INDEXES = [7];

const HYPHEN_INDEXES = [11];

const RESERVED_NUMBERS = [
  `00000000000000`,
  `11111111111111`,
  `22222222222222`,
  `33333333333333`,
  `44444444444444`,
  `55555555555555`,
  `66666666666666`,
  `77777777777777`,
  `88888888888888`,
  `99999999999999`,
];

const CHECK_DIGITS_INDEXES = [12, 13];

const FIRST_CHECK_DIGIT_WEIGHTS = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

function isValidmask(cnpj: string): boolean {
  return /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/.test(cnpj);
}

function isReservedNumber(cpf: string): boolean {
  return RESERVED_NUMBERS.indexOf(cpf) >= 0;
}

function isValidChecksum(cnpj: string): boolean {
  const weights = [...FIRST_CHECK_DIGIT_WEIGHTS];

  return CHECK_DIGITS_INDEXES.every((i) => {
    if (i === CHECK_DIGITS_INDEXES[CHECK_DIGITS_INDEXES.length - 1]) {
      weights.unshift(6);
    }

    const mod =
      generateChecksum(
        cnpj
          .slice(0, i)
          .split(``)
          .reduce((acc, digit) => acc + digit, ``),
        weights,
      ) % 11;

    return cnpj[i] === String(mod < 2 ? 0 : 11 - mod);
  });
}

export function maskCNPJ(cnpj?: string | number): string {
  if (!cnpj) return ``;

  let digits = onlyNumbers(cnpj);

  digits = digits.padStart(LENGTH, `0`);

  return digits
    .slice(0, LENGTH)
    .split(``)
    .reduce((acc, digit, index) => {
      const result = `${acc}${digit}`;

      if (!isLastChar(index, digits)) {
        if (DOT_INDEXES.includes(index)) return `${result}.`;
        if (SLASH_INDEXES.includes(index)) return `${result}/`;
        if (HYPHEN_INDEXES.includes(index)) return `${result}-`;
      }

      return result;
    }, ``);
}

export function validateCNPJ(cnpj?: string): boolean {
  if (!cnpj || typeof cnpj !== `string`) return false;

  const numbers = onlyNumbers(cnpj);

  return (
    isValidmask(cnpj) && !isReservedNumber(numbers) && isValidChecksum(numbers)
  );
}
