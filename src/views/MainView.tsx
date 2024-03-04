import { Container } from "@mantine/core";

import { Header } from "../components/Header";
import CreateUserForm from "../components/CreateUserForm/CreateUserForm";

export default function MainView() {
  return (
    <>
      <Header />
      <Container mt="xl" size={502}>
        <CreateUserForm />
      </Container>
    </>
  );
}
