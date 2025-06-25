import { ICartItem, OrderInstanceType } from "@/types/Cart";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartButton from "@/components/order/CartButton";
import CartProviderComponent from "@/components/order/CartProviderComponent";
import { OrderInstanceContext } from "@/hooks/OrderInstanceContext";
import ViewCartJsx from "@/components/test/ViewCartJsx";
import { MantineProvider } from "@mantine/core";
import { mantineTheme } from "@/components/MantineTheme";
import OrderInstanceWrapper from "@/components/test/OrderInstanceWrapper";
import RandomButton from "@/components/test/RandomButton";

describe("Cart functionalities", () => {
  it("adds a single item into an empty cart", async () => {
    render(
      <MantineProvider theme={mantineTheme}>
        <OrderInstanceWrapper>
          <CartProviderComponent>
            <ViewCartJsx showItems={true} showItemsArray={true} />
            <CartButton />
          </CartProviderComponent>
        </OrderInstanceWrapper>
      </MantineProvider>
    );

    const cart = screen.getByText("add to cart");

    await userEvent.click(cart);

    expect(screen.getByTestId("items").innerHTML).toBe(
      JSON.stringify({
        faf274d6153dee5d78c7aaa0f627b20a50ed66fe28a38aa53a9319446837d3dc: {
          key: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab",
          name: "Americano",
          category: "hot",
          size: null,
          milk: null,
          extra: null,
          price: 4.5,
          quantity: 1,
        },
      })
    );

    expect(screen.getByTestId("itemsArray").innerHTML).toBe(
      JSON.stringify([
        {
          id: "faf274d6153dee5d78c7aaa0f627b20a50ed66fe28a38aa53a9319446837d3dc",
          key: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab",
          name: "Americano",
          category: "hot",
          size: null,
          milk: null,
          extra: null,
          price: 4.5,
          quantity: 1,
        },
      ])
    );
  });

  it("adds an item that already exists in the cart 2 times", async () => {
    render(
      <MantineProvider theme={mantineTheme}>
        <OrderInstanceWrapper resetInstance={true}>
          <CartProviderComponent>
            <CartButton />
            <ViewCartJsx showItems={true} showItemsArray={true} />
          </CartProviderComponent>
        </OrderInstanceWrapper>
      </MantineProvider>
    );

    await userEvent.click(screen.getByText("add to cart"));
    await userEvent.click(screen.getByText("add to cart"));

    expect(screen.getByTestId("items").innerHTML).toBe(
      JSON.stringify({
        faf274d6153dee5d78c7aaa0f627b20a50ed66fe28a38aa53a9319446837d3dc: {
          key: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab",
          name: "Americano",
          category: "hot",
          size: null,
          milk: null,
          extra: null,
          price: 9.0,
          quantity: 2,
        },
      })
    );

    expect(screen.getByTestId("itemsArray").innerHTML).toBe(
      JSON.stringify([
        {
          id: "faf274d6153dee5d78c7aaa0f627b20a50ed66fe28a38aa53a9319446837d3dc",
          key: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab",
          name: "Americano",
          category: "hot",
          size: null,
          milk: null,
          extra: null,
          price: 9.0,
          quantity: 2,
        },
      ])
    );
  });
});
