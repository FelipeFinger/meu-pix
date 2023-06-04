import QrCodeModal from '@/components/Modals/qrCodeModal';
import { unMaskCurrency } from '@/utils/currency';
import { maskPixKey } from '@/utils/pix';
import { onlyNumbers } from '@/utils/string';
import {
  Box,
  Button,
  Flex,
  Group,
  Input,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure, useLocalStorage } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { PixStaticObject, createStaticPix, hasError } from 'pix-utils';
import { useEffect, useState } from 'react';
import {
  FiArrowRight,
  FiDollarSign,
  FiFile,
  FiKey,
  FiUser,
} from 'react-icons/fi';
import { NumericFormat } from 'react-number-format';

export default function Home() {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [pixData, setPixData] = useState<PixStaticObject>();
  const [, setHistory] = useLocalStorage({
    key: `history-qrcodes`,
    defaultValue: [] as any[],
  });
  const form = useForm({
    initialValues: {
      name: ``,
      key: ``,
      amount: ``,
      description: ``,
    },
  });

  useEffect(() => {
    if (router.query) {
      form.setFieldValue(`key`, maskPixKey(router.query?.key as string).masked);
      form.setFieldValue(`name`, (router.query?.name as string) || ``);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  const onSubmit = (values) => {
    if (!form.isValid) return;
    const pixKey = maskPixKey(
      [`CPF`, `CNPJ`, `PHONE`].includes(
        maskPixKey(onlyNumbers(values.key)).type,
      )
        ? onlyNumbers(values.key)
        : values.key,
    );

    if (pixKey.type === `INVALID`) {
      return form.setFieldError(`key`, `Chave Pix inválida`);
    }

    const data = {
      merchantName: values.name,
      merchantCity: `Sao Paulo`,
      pixKey: pixKey.raw,
      infoAdicional: values.description,
      transactionAmount: unMaskCurrency(values.amount),
    };

    const pix = createStaticPix(data);

    if (!hasError(pix)) {
      const generated = {
        name: data.merchantName,
        key: data.pixKey,
        amount: data.transactionAmount,
        description: data.infoAdicional,
        brCode: pix.toBRCode(),
      };
      setHistory((old) => [generated].concat([...old.slice(-4)]));
      setPixData(pix);
      form.reset();
    }
    open();
  };

  return (
    <Box>
      <QrCodeModal pixData={pixData} opened={opened} close={close} />
      <Flex
        justify={`center`}
        sx={{
          borderRadius: 10,
        }}
      >
        <Box w={400} p={20}>
          <Title order={3}>Novo QR Code</Title>
          <form onSubmit={form.onSubmit(onSubmit)}>
            <TextInput
              withAsterisk
              icon={<FiUser />}
              required
              label="Nome Completo"
              {...form.getInputProps(`name`)}
            />

            <TextInput
              withAsterisk
              icon={<FiKey />}
              required
              label="Chave Pix"
              {...form.getInputProps(`key`)}
              value={form.values.key}
              onChange={(v) => {
                form.setFieldValue(
                  `key`,
                  maskPixKey(
                    [`CPF`, `CNPJ`, `PHONE`].includes(
                      maskPixKey(onlyNumbers(v.target.value)).type,
                    )
                      ? onlyNumbers(v.target.value)
                      : v.target.value,
                  ).masked,
                );
              }}
            />

            <Input.Wrapper label="Valor" withAsterisk required>
              <Input<any>
                component={NumericFormat}
                allowNegative={false}
                thousandSeparator={`.`}
                icon={<FiDollarSign />}
                decimalSeparator={`,`}
                fixedDecimalScale={2}
                decimalScale={2}
                required
                prefix={`R$ `}
                {...form.getInputProps(`amount`)}
              />
            </Input.Wrapper>

            <TextInput
              label="Descrição"
              icon={<FiFile />}
              {...form.getInputProps(`description`)}
            />

            <Group position="center" mt={20}>
              <Button rightIcon={<FiArrowRight />} type="submit">
                Gerar QR Code
              </Button>
            </Group>
          </form>
        </Box>
      </Flex>
    </Box>
  );
}
