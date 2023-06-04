import {
  ActionIcon,
  Container,
  Group,
  Header,
  Title,
  Tooltip,
  createStyles,
  rem,
  useMantineColorScheme,
} from '@mantine/core';
import { useRouter } from 'next/router';
import { FaQrcode } from 'react-icons/fa';
import { FiList } from 'react-icons/fi';
import { RiMoonLine, RiSunLine } from 'react-icons/ri';
import QrCodeCustomize from '../Modals/qrCodeCustomize';

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.fn.variant({
      variant: `filled`,
      color: theme.primaryColor,
    }).background,
    borderBottom: 0,
  },

  inner: {
    height: rem(56),
    display: `flex`,
    justifyContent: `space-between`,
    alignItems: `center`,
  },

  mobileMenu: {
    [theme.fn.largerThan(`sm`)]: {
      display: `none`,
    },
    [theme.fn.smallerThan(`sm`)]: {
      display: `flex`,
      flexDirection: `column`,
      alignItems: `flex-end`,
      backgroundColor: theme.fn.variant({
        variant: `filled`,
        color: theme.primaryColor,
      }).background,
      position: `absolute`,
      top: rem(56),
      right: 0,
      width: `100%`,
      padding: `${rem(8)} ${rem(12)}`,
      borderRadius: theme.radius.sm,
      zIndex: 9999,
    },
  },

  link: {
    display: `block`,
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: `none`,
    color: theme.white,
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
  },

  linkLabel: {
    marginRight: rem(5),
  },
}));

export function GlobalHeader() {
  const router = useRouter();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === `dark`;
  const { classes } = useStyles();

  return (
    <Header height={56} className={classes.header} mb={30}>
      <Container>
        <div className={classes.inner}>
          <Title
            order={3}
            color="white"
            onClick={() => router.push(`/`)}
            sx={{ ':hover': { cursor: `pointer` } }}
          >
            meu Pix
          </Title>
          <Group spacing={5}>
            <Tooltip label={`Nova cobrança`}>
              <ActionIcon
                variant="ghost"
                onClick={() => router.push(`/`)}
                title="Toggle color scheme"
              >
                <FaQrcode color="white" />
              </ActionIcon>
            </Tooltip>
            <Tooltip label={`Histórico de cobranças`}>
              <ActionIcon
                variant="ghost"
                onClick={() => router.push(`/history`)}
                title="Toggle color scheme"
              >
                <FiList color="white" />
              </ActionIcon>
            </Tooltip>
            <QrCodeCustomize />
            <Tooltip label={`Tema ${dark ? `claro` : `escuro`}`}>
              <ActionIcon
                variant="ghost"
                onClick={() => toggleColorScheme()}
                title="Toggle color scheme"
              >
                {dark ? (
                  <RiSunLine color="white" />
                ) : (
                  <RiMoonLine color="white" />
                )}
              </ActionIcon>
            </Tooltip>
          </Group>
        </div>
      </Container>
    </Header>
  );
}
