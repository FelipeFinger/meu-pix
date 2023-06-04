import { maskCurrency } from '@/utils/currency';
import { Badge, Box, Button, Flex, Modal, Title } from '@mantine/core';
import { useClipboard, useLocalStorage } from '@mantine/hooks';
import { QRCodeCanvas } from 'qrcode.react';

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
        <Box my={10}>
          <QRCodeCanvas
            value={pixData?.toBRCode()}
            fgColor={qrStyle.fgColor}
            bgColor={qrStyle.bgColor}
            size={256}
            imageSettings={qrStyle.imageSettings}
          />
        </Box>
        <Title order={4}>{pixData?.merchantName}</Title>
        <Button
          size={`xs`}
          disabled={clipboard.copied}
          onClick={() => {
            clipboard.copy(pixData?.toBRCode());
          }}
        >
          {clipboard.copied ? `BRCode Copiado` : `Copiar BRCode`}
        </Button>
      </Flex>
    </Modal>
  );
}

export default QrCodeModal;
