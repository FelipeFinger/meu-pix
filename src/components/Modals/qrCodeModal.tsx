import { maskCurrency } from '@/utils/currency';
import {
  Badge,
  Box,
  Button,
  Flex,
  Modal,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useClipboard, useLocalStorage } from '@mantine/hooks';
import { QRCodeCanvas } from 'qrcode.react';
import { FiCheck } from 'react-icons/fi';

function QrCodeModal({ pixData, opened, close }) {
  const clipboard = useClipboard({ timeout: 1000 });

  const [qrStyle] = useLocalStorage({
    key: `style-qrcodes`,
    defaultValue: {
      fgColor: `#000`,
      bgColor: `#fff`,
      imageSettings: {
        src: ``,
        excavate: true,
        width: 48,
        height: 48,
      },
    },
  });

  return (
    <Modal opened={opened} onClose={close} title={`QR Code Pix`}>
      <Flex justify={`center`} align={`center`} direction={`column`}>
        <Title order={2}>{maskCurrency(pixData?.transactionAmount)}</Title>
        <Badge my={5}>
          {pixData?.infoAdicional || `Nenhuma descrição informada`}
        </Badge>
        <Box
          my={15}
          bg={qrStyle.bgColor}
          p={15}
          sx={{ borderRadius: 15, border: `2px solid #ccc` }}
        >
          <QRCodeCanvas
            value={pixData?.toBRCode()}
            fgColor={qrStyle.fgColor}
            bgColor={qrStyle.bgColor}
            size={200}
            imageSettings={qrStyle.imageSettings}
          />
        </Box>
        <Text size={`xs`}>Recebedor</Text>
        <Title order={4}>{pixData?.merchantName}</Title>
        <Stack spacing={10} mt={10}>
          <Button
            size={`xs`}
            disabled={clipboard.copied}
            onClick={() => {
              clipboard.copy(pixData?.toBRCode());
            }}
          >
            {clipboard.copied ? `BRCode Copiado` : `Copiar BRCode`}
          </Button>
          <Button size={`xs`} rightIcon={<FiCheck />} onClick={close}>
            Ok
          </Button>
        </Stack>
      </Flex>
    </Modal>
  );
}

export default QrCodeModal;
