import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  FormLabelProps,
  Input,
  InputProps,
} from '@chakra-ui/react';
import { PropsWithoutRef } from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

interface FormInputProps extends PropsWithoutRef<InputProps> {
  name: string;
  label: string;
  control: Control<any, object>;
  outerProps?: PropsWithoutRef<FormControlProps>;
  labelProps?: PropsWithoutRef<FormLabelProps>;
  registerOptions?: RegisterOptions;
}

function FormCurrencyInput({
  name,
  label,
  outerProps = {},
  labelProps = {},
  control,
  defaultValue = ``,
  registerOptions = {},
  ...props
}: FormInputProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={registerOptions}
      defaultValue={defaultValue}
      render={({
        field,
        formState: { isSubmitting },
        fieldState: { invalid, error },
      }) => (
        <FormControl
          {...outerProps}
          isInvalid={invalid}
          isDisabled={isSubmitting}
        >
          <FormLabel htmlFor={name} {...labelProps}>
            {label}
          </FormLabel>

          <Input
            as={NumericFormat}
            allowNegative={false}
            thousandSeparator={`.`}
            decimalSeparator={`,`}
            fixedDecimalScale={2}
            decimalScale={2}
            prefix={`R$ `}
            id={name}
            {...props}
            {...field}
          />
          {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
        </FormControl>
      )}
    />
  );
}

export default FormCurrencyInput;
