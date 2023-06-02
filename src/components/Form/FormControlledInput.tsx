import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  FormLabelProps,
  Input,
  InputProps,
} from '@chakra-ui/react';
import React, { PropsWithoutRef } from 'react';
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';

interface FormInputProps<T extends FieldValues>
  extends PropsWithoutRef<InputProps> {
  name: string;
  label?: string;
  control: Control<T, object>;
  outerProps?: PropsWithoutRef<FormControlProps>;
  labelProps?: PropsWithoutRef<FormLabelProps>;
  registerOptions?: RegisterOptions;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  defaultValue?: string;
}

function FormControlledInput({
  name,
  label,
  outerProps = {},
  labelProps = {},
  control,
  defaultValue = ``,
  onChange: customOnChange,
  registerOptions = {},
  isDisabled = false,
  ...props
}: FormInputProps<any>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={registerOptions}
      defaultValue={defaultValue}
      render={({
        field: { onChange, ...field },
        formState: { isSubmitting },
        fieldState: { error },
      }) => (
        <FormControl
          {...outerProps}
          isInvalid={!!error}
          isDisabled={isDisabled || isSubmitting}
        >
          {label && (
            <FormLabel htmlFor={name} {...labelProps}>
              {label}
            </FormLabel>
          )}

          <Input
            {...field}
            {...props}
            id={name}
            isDisabled={isDisabled || isSubmitting}
            onChange={(v) => {
              if (customOnChange) {
                const customValue = customOnChange(v);
                onChange(customValue);
                return customValue;
              }
              return onChange(v);
            }}
          />

          <FormErrorMessage>{error && error.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
}

export default FormControlledInput;
