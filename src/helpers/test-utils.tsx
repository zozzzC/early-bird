import { mantineTheme } from "@/components/MantineTheme";
import {
  createTheme,
  MantineProvider,
  mergeThemeOverrides,
  Modal,
} from "@mantine/core";
import { render, RenderOptions } from "@testing-library/react";
import React, { ReactElement } from "react";

const testTheme = mergeThemeOverrides(
  mantineTheme,
  createTheme({
    components: {
      Modal: Modal.extend({
        defaultProps: {
          transitionProps: { duration: 0 },
        },
      }),
    },
  })
);

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <MantineProvider theme={testTheme} env="test">
      {children}
    </MantineProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
