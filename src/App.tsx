import {
  AppShell,
  Burger,
  Group,
  Skeleton,
  useMantineTheme,
  rem,
  Switch,
  useMantineColorScheme,
  Flex,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSun, IconMoonStars } from "@tabler/icons-react";
import Navbar from "./components/Navbar";

function App() {
  const [opened, { toggle }] = useDisclosure(true);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
          <img src="/favicon.svg" width={25} />
          <Flex justify="flex-end" flex={1}>
            <ThemeSwitcher />
          </Flex>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Navbar />
      </AppShell.Navbar>
      <AppShell.Main>Main</AppShell.Main>
    </AppShell>
  );
}

function ThemeSwitcher() {
  const theme = useMantineTheme();
  const { toggleColorScheme } = useMantineColorScheme();

  const sunIcon = (
    <IconSun
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.yellow[4]}
    />
  );

  const moonIcon = (
    <IconMoonStars
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.blue[6]}
    />
  );

  return (
    <Switch
      size="md"
      color="dark.4"
      onLabel={sunIcon}
      offLabel={moonIcon}
      onChange={toggleColorScheme}
    />
  );
}

export default App;
