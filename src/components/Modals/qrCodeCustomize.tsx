import {
  ActionIcon,
  Box,
  Button,
  ColorInput,
  FileInput,
  Flex,
  Modal,
  Stack,
  Title,
  Tooltip,
} from '@mantine/core';
import { useDisclosure, useLocalStorage } from '@mantine/hooks';
import { IconUpload } from '@tabler/icons-react';
import { QRCodeCanvas } from 'qrcode.react';
import { useState } from 'react';
import { FiSettings, FiTrash2 } from 'react-icons/fi';

function QrCodeCustomize() {
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [qrStyle, setQrStyle] = useLocalStorage({
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
  const [opened, { open, close }] = useDisclosure(false);

  const handleImageUpload = (file) => {
    if (file) {
      setImgFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setQrStyle({
          ...qrStyle,
          imageSettings: {
            src: reader.result as string,
            excavate: true,
            width: 48,
            height: 48,
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const resetStyles = () => {
    setImgFile(null);
    setQrStyle({
      fgColor: `#000`,
      bgColor: `#fff`,
      imageSettings: {
        src: ``,
        excavate: true,
        width: 48,
        height: 48,
      },
    });
  };

  return (
    <>
      <Tooltip label="Customizar QRCode">
        <ActionIcon variant="ghost" onClick={open}>
          <FiSettings color="white" />
        </ActionIcon>
      </Tooltip>
      <Modal opened={opened} onClose={close} title={`QR Code Pix`}>
        <Flex justify={`center`} align={`center`} direction={`column`}>
          <Title order={5}>Customização do QRCode</Title>
          <Stack w={`100%`} spacing={2} mb={10}>
            <ColorInput
              placeholder="Selecione a cor"
              label="Cor do QRCode"
              onChange={(fgColor) => setQrStyle({ ...qrStyle, fgColor })}
              value={qrStyle.fgColor}
            />
            <ColorInput
              placeholder="Selecione a cor"
              label="Cor de fundo"
              onChange={(bgColor) => setQrStyle({ ...qrStyle, bgColor })}
              value={qrStyle.bgColor}
            />
            <FileInput
              label="Imagem"
              placeholder="Importar imagem"
              icon={<IconUpload />}
              onChange={handleImageUpload}
              accept="image/*"
              value={imgFile}
            />
          </Stack>
          <Title order={5}>Pré-visualização</Title>
          <Box my={10}>
            <QRCodeCanvas
              value={`Felipe é Lindo`}
              fgColor={qrStyle.fgColor}
              bgColor={qrStyle.bgColor}
              size={256}
              imageSettings={qrStyle.imageSettings}
            />
          </Box>

          <Button rightIcon={<FiTrash2 />} onClick={resetStyles}>
            Resetar
          </Button>
        </Flex>
      </Modal>
    </>
  );
}

export default QrCodeCustomize;
