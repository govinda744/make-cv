import "@mantine/core/styles.css";

import React from "react";
import { Button, MantineProvider, createTheme } from "@mantine/core";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import buttonStyles from "./css/button.module.css";

const theme = createTheme({
  components: {
    Button: Button.extend({
      classNames: buttonStyles,
    }),
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <App />
    </MantineProvider>
  </React.StrictMode>
);
