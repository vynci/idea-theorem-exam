import { Group, Container, Box } from "@mantine/core";
import Logo from "../assets/logo.png";
import { themeBackground } from "../assets/theme";

export function Header() {
  return (
    <header>
      <Group grow bg={themeBackground} h={"56.83px"}>
        <Container size={"md"}>
          <Box p="sm">
            <img style={{ width: "294px" }} src={Logo} alt="Logo" />
          </Box>
        </Container>
      </Group>
    </header>
  );
}
