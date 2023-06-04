import { validateCPF } from './cpf';
import { mask } from './mask';
import { onlyNumbers } from './string';

export const maskPixKey = (
  value?: string,
): { type: string; masked: string; raw: string } => {
  if (!value) return { type: `INVALID`, masked: ``, raw: `` };
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const normalizedValue = value.trim().toLowerCase();

  if (/^[0-9]{11}$/.test(normalizedValue)) {
    if (validateCPF(normalizedValue)) {
      console.log(`sim`);
      return {
        type: `CPF`,
        masked: mask(normalizedValue, `999.999.999-99`),
        raw: normalizedValue.trim(),
      };
    }
    return {
      type: `PHONE`,
      masked: mask(normalizedValue, `(99) 99999-9999`),
      raw: `+55${onlyNumbers(normalizedValue.trim())}`,
    };
  }
  if (normalizedValue.match(/^[0-9]{10}$/)) {
    return {
      type: `PHONE`,
      masked: mask(normalizedValue, `(99) 9999-9999`),
      raw: `+55${onlyNumbers(normalizedValue.trim())}`,
    };
  }
  if (normalizedValue.match(/^\+55\d{10,11}$/)) {
    const phoneNumber = normalizedValue.replace(`+55`, ``);
    return {
      type: `PHONE`,
      masked: mask(
        phoneNumber,
        phoneNumber.length > 10 ? `(99) 99999-9999` : `(99) 9999-9999`,
      ),
      raw: normalizedValue,
    };
  }
  if (normalizedValue.match(/^[0-9]{14}$/)) {
    return {
      type: `CNPJ`,
      masked: mask(normalizedValue, `99.999.999/9999-99`),
      raw: normalizedValue.trim(),
    };
  }
  if (
    normalizedValue?.match(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    )
  ) {
    return {
      type: `EMAIL`,
      masked: normalizedValue,
      raw: normalizedValue.trim().toLowerCase(),
    };
  }
  if (
    normalizedValue?.match(
      /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/,
    )
  ) {
    return {
      type: `EVP`,
      masked: normalizedValue,
      raw: normalizedValue.trim().toLowerCase(),
    };
  }
  return { type: `INVALID`, masked: normalizedValue, raw: normalizedValue };
};
