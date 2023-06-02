import {
  Box,
  Button,
  Divider,
  Flex,
  Group,
  Modal,
  Table,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure, useLocalStorage } from '@mantine/hooks';
import { PixStaticObject, createStaticPix, hasError } from 'pix-utils';
import { useState } from 'react';
import { QRCode } from 'react-qrcode-logo';

export default function Home() {
  const [opened, { open, close }] = useDisclosure(false);
  const [pixData, setPixData] = useState<PixStaticObject>();
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useLocalStorage({
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

    // validate: {
    //   email: (value) => (/^\S+@\S+$/.test(value) ? null : `Invalid email`),
    // },
  });

  const onSubmit = (values) => {
    setPixData(values);

    const pix = createStaticPix({
      merchantName: values.name,
      merchantCity: `Sao Paulo`,
      pixKey: values.key,
      infoAdicional: values.description,
      transactionAmount: +values.amount,
    });

    if (!hasError(pix)) {
      setHistory((old) => [...old.slice(-4)].concat([values]));
      setPixData(pix);
      form.reset();
    }
    open();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="QR Code Pix">
        <QRCode value={pixData?.toBRCode()} size={256} removeQrCodeBehindLogo />
      </Modal>
      <Flex
        justify={`center`}
        sx={{
          padding: 50,
        }}
      >
        <Flex
          maw={800}
          justify={`center`}
          sx={{
            backgroundColor: `#f7f7f7`,
            borderRadius: 10,
            padding: 20,
          }}
        >
          <Box w={400}>
            <Flex justify={`space-between`}>
              <Title order={3}>Novo QR Code</Title>
              <Button
                size="xs"
                variant="subtle"
                color={`gray`}
                disabled={history.length === 0}
                onClick={() => setShowHistory((old) => !old)}
              >
                Histórico
              </Button>
            </Flex>
            <form onSubmit={form.onSubmit(onSubmit)}>
              <TextInput
                withAsterisk
                required
                label="Nome Completo"
                {...form.getInputProps(`name`)}
              />

              <TextInput
                withAsterisk
                required
                label="Chave Pix"
                {...form.getInputProps(`key`)}
              />

              <TextInput
                withAsterisk
                required
                type="number"
                label="Valor"
                {...form.getInputProps(`amount`)}
              />

              <TextInput
                label="Descrição"
                {...form.getInputProps(`description`)}
              />

              <Group position="center" mt={20}>
                <Button type="submit">Gerar QR Code</Button>
              </Group>
            </form>
          </Box>
          {showHistory && (
            <>
              <Divider mx={20} orientation="vertical" />
              <Box>
                <Title order={3}>Ultimos QR Codes gerados</Title>

                <Table striped w={400}>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Chave</th>
                      <th>Valor</th>
                    </tr>
                  </thead>

                  <tbody>
                    {history.map((item: any, i) => (
                      <tr key={i}>
                        <td>{item?.name}</td>
                        <td>{item?.key}</td>
                        <td>{item?.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Box>
            </>
          )}
        </Flex>
      </Flex>
    </>
  );
}
