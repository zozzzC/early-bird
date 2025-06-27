import orderItemsInstanceFlatWhiteOutOfStock from "@/__tests__/sample/orderItemsInstanceFlatWhiteOutOfStock.json";
import { mantineTheme } from "@/components/MantineTheme";
import { OrderModalResponse } from "@/types/OrderModalResponse";
import { MantineProvider } from "@mantine/core";
import { render } from "@testing-library/react";
describe("Checkout Page Functionality", () => {
  it("accurately displays when an item is not in stock", () => {});
  
  //TODO
  it("when an item is not in stock and the user has not deleted it from the cart yet and the user clicks to pay, a warning modal pops up", () => {
    const orderItems: Array<OrderModalResponse> =
      orderItemsInstanceFlatWhiteOutOfStock;

      render(<MantineProvider theme={mantineTheme}>

      </MantineProvider>)

  });
});
