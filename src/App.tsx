import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import MainView from "./views/MainView";

function App() {
  return (
    <>
      <MantineProvider>
        <Notifications />
        <MainView />
      </MantineProvider>
    </>
  );
}

export default App;
