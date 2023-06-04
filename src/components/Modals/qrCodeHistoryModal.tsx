import { maskCurrency } from '@/utils/currency';
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Flex,
  Modal,
  Title,
  Tooltip,
} from '@mantine/core';
import { useClipboard, useDisclosure, useLocalStorage } from '@mantine/hooks';
import { QRCodeCanvas } from 'qrcode.react';
import { FiEye } from 'react-icons/fi';

function QrCodeHistoryModal({ amount, description, name, brCode }) {
  const [opened, { open, close }] = useDisclosure(false);
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
    <>
      <Tooltip label="Visualizar">
        <ActionIcon variant="light" onClick={open}>
          <FiEye />
        </ActionIcon>
      </Tooltip>
      <Modal opened={opened} onClose={close} title={`QR Code Pix`}>
        <Flex justify={`center`} align={`center`} direction={`column`}>
          <Title order={2}>{maskCurrency(amount)}</Title>
          <Badge my={5}>{description || `Nenhuma descrição informada`}</Badge>
          <Box
            my={15}
            bg={qrStyle.bgColor}
            p={15}
            sx={{ borderRadius: 15, border: `2px solid #ccc` }}
          >
            <QRCodeCanvas
              value={brCode}
              fgColor={qrStyle.fgColor}
              bgColor={qrStyle.bgColor}
              size={256}
              imageSettings={qrStyle.imageSettings}
            />
          </Box>
          <Title order={4}>{name}</Title>
          <Button
            size={`xs`}
            disabled={clipboard.copied}
            onClick={() => {
              clipboard.copy(brCode);
            }}
          >
            {clipboard.copied ? `BRCode Copiado` : `Copiar BRCode`}
          </Button>
        </Flex>
      </Modal>
    </>
  );
}

export default QrCodeHistoryModal;
