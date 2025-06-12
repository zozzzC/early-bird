"use client";
import { createTheme, Button } from "@mantine/core";

export const mantineTheme = createTheme({
  components: {
    Button: Button.extend({
      defaultProps: {
        color: "#E59442",
        variant: "outline",
      },
    }),
  },
});
