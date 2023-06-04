import QrCodeHistoryModal from '@/components/Modals/qrCodeHistoryModal';
import { maskCurrency } from '@/utils/currency';
import { maskPixKey } from '@/utils/pix';
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Flex,
  Group,
  Table,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { FiPlus } from 'react-icons/fi';

function Index() {
  const router = useRouter();
  const [history, setHistory] = useLocalStorage({
    key: `history-qrcodes`,
    defaultValue: [] as any[],
  });

  return (
    <Box p={{ base: 10, sm: 50 }}>
      <Flex justify="space-between" align="center" mb={16}>
        <Title order={3}>Últimos QR Codes gerados</Title>
        <Button
          size="xs"
          variant="ghost"
          onClick={() => {
            setHistory([]);
          }}
        >
          Limpar Histórico
        </Button>
      </Flex>

      <Card shadow="sm" radius="md">
        {history.length > 0 ? (
          <div style={{ overflowX: `auto` }}>
            <Table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Chave</th>
                  <th>Valor</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {history.map((item: any, i) => (
                  <tr key={i}>
                    <td> {item?.name}</td>
                    <td>{maskPixKey(item?.key).masked}</td>
                    <td>{maskCurrency(item?.amount)}</td>
                    <td align="center">
                      <Group spacing={5}>
                        <QrCodeHistoryModal
                          amount={item.amount}
                          brCode={item.brCode}
                          description={item.description}
                          name={item.name}
                        />
                        <Tooltip label="Nova crobrança">
                          <ActionIcon
                            variant="light"
                            onClick={() =>
                              router.push({
                                pathname: `/`,
                                query: { name: item.name, key: item.key },
                              })
                            }
                          >
                            <FiPlus />
                          </ActionIcon>
                        </Tooltip>
                      </Group>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <Text size="sm">Nenhum QR Code gerado recentemente.</Text>
        )}
      </Card>
    </Box>
  );
}

export default Index;
