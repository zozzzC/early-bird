import CheckoutList from "@/components/checkout/CheckoutList";
import TotalBar from "@/components/checkout/TotalBar";
import { mantineTheme } from "@/components/MantineTheme";
import CartButton from "@/components/order/CartButton";
import CartProviderComponent from "@/components/order/CartProviderComponent";
import EditButton from "@/components/test/EditButton";
import OrderInstanceWrapper from "@/components/test/OrderInstanceWrapper";
import ViewCartJsx from "@/components/test/ViewCartJsx";
import { ICart, ICartItem, ICartItemWithId } from "@/types/Cart";
import { MantineProvider } from "@mantine/core";
import userEvent from "@testing-library/user-event";
import defaultInstance from "./sample/defaultInstance.json";
import defaultItems from "./sample/defaultItems.json";
import defaultItemsArray from "./sample/defaultItemsArray.json";
import instance from "./sample/instance.json";
import sampleOrderItems from "./sample/sampleOrderItems.json";
import { render, screen } from "../helpers/test-utils";

describe("Cart functionalities", () => {
  it("adds a single item into an empty cart", async () => {
    render(
      <OrderInstanceWrapper>
        <CartProviderComponent>
          <ViewCartJsx showItems={true} showItemsArray={true} />
          <CartButton />
        </CartProviderComponent>
      </OrderInstanceWrapper>
    );

    const cart = screen.getByText("add to cart");

    await userEvent.click(cart);

    expect(screen.getByTestId("items").innerHTML).toBe(
      JSON.stringify({
        "4b16fc6f1806768de8c09bca26b0a856e82bb79a3888f636e6084ca65203bc31": {
          key: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab",
          name: "Americano",
          category: "hot",
          size: null,
          milk: null,
          extra: null,
          price: 4.5,
          basePrice: 4.5,
          quantity: 1,
        },
      })
    );

    expect(screen.getByTestId("itemsArray").innerHTML).toBe(
      JSON.stringify([
        {
          id: "4b16fc6f1806768de8c09bca26b0a856e82bb79a3888f636e6084ca65203bc31",
          key: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab",
          name: "Americano",
          category: "hot",
          size: null,
          milk: null,
          extra: null,
          price: 4.5,
          basePrice: 4.5,
          quantity: 1,
        },
      ])
    );
  });

  it("adds an item that already exists in the cart 2 times", async () => {
    render(
      <OrderInstanceWrapper resetInstance={true}>
        <CartProviderComponent>
          <CartButton />
          <ViewCartJsx showItems={true} showItemsArray={true} />
        </CartProviderComponent>
      </OrderInstanceWrapper>
    );

    await userEvent.click(screen.getByText("add to cart"));
    await userEvent.click(screen.getByText("add to cart"));

    expect(screen.getByTestId("items").innerHTML).toBe(
      JSON.stringify({
        "4b16fc6f1806768de8c09bca26b0a856e82bb79a3888f636e6084ca65203bc31": {
          key: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab",
          name: "Americano",
          category: "hot",
          size: null,
          milk: null,
          extra: null,
          price: 9.0,
          basePrice: 4.5,
          quantity: 2,
        },
      })
    );

    expect(screen.getByTestId("itemsArray").innerHTML).toBe(
      JSON.stringify([
        {
          id: "4b16fc6f1806768de8c09bca26b0a856e82bb79a3888f636e6084ca65203bc31",
          key: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab",
          name: "Americano",
          category: "hot",
          size: null,
          milk: null,
          extra: null,
          price: 9.0,
          basePrice: 4.5,
          quantity: 2,
        },
      ])
    );
  });

  it("accurately updates the value of something in the cart to the correct price", async () => {
    render(
      <OrderInstanceWrapper instance={instance as ICartItem}>
        <CartProviderComponent>
          <ViewCartJsx showItems={true} />
          <CartButton />
        </CartProviderComponent>
      </OrderInstanceWrapper>
    );

    const cart = screen.getByText("add to cart");
    await userEvent.click(cart);

    expect(screen.getByTestId("items").innerHTML).toBe(
      JSON.stringify({
        "01bc3b4047d9b6eda4988ed928507ec8d5fb86d6e4748d2972f30109cdd03cce": {
          key: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab",
          name: "Americano",
          category: "hot",
          size: null,
          milk: {
            id: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab6ffffebb-93ea-4616-b3ce-5f59b33e8a63",
            name: "Soy milk",
            price: 1,
          },
          extra: [
            {
              id: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab9bff625c-9f08-4e1e-b40c-e4241d132071",
              name: "Vanilla syrup",
              price: 1,
            },
            {
              id: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6abe2a9faad-9f79-4397-bf0b-73f0dd9b1901",
              name: "Hazelnut syrup",
              price: 1,
            },
          ],
          basePrice: 4.5,
          quantity: 1,
          price: 7.5,
        },
      })
    );
  });

  it("edits an instance into a new item in the cart that doesn't already exist", async () => {
    render(
      <OrderInstanceWrapper>
        <CartProviderComponent>
          <ViewCartJsx showItems={true} />
          <CartButton />
          <EditButton cartItem={instance as ICartItem} />
        </CartProviderComponent>
      </OrderInstanceWrapper>
    );

    const cart = screen.getByText("add to cart");
    const edit = screen.getByText("edit cart item");

    await userEvent.click(cart);

    expect(screen.getByTestId("items").innerHTML).toBe(
      JSON.stringify({
        "4b16fc6f1806768de8c09bca26b0a856e82bb79a3888f636e6084ca65203bc31": {
          key: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab",
          name: "Americano",
          category: "hot",
          size: null,
          milk: null,
          extra: null,
          price: 4.5,
          basePrice: 4.5,
          quantity: 1,
        },
      })
    );

    await userEvent.click(edit);

    expect(screen.getByTestId("items").innerHTML).toBe(
      JSON.stringify({
        "01bc3b4047d9b6eda4988ed928507ec8d5fb86d6e4748d2972f30109cdd03cce": {
          key: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab",
          name: "Americano",
          category: "hot",
          size: null,
          milk: {
            id: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab6ffffebb-93ea-4616-b3ce-5f59b33e8a63",
            name: "Soy milk",
            price: 1,
          },
          extra: [
            {
              id: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab9bff625c-9f08-4e1e-b40c-e4241d132071",
              name: "Vanilla syrup",
              price: 1,
            },
            {
              id: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6abe2a9faad-9f79-4397-bf0b-73f0dd9b1901",
              name: "Hazelnut syrup",
              price: 1,
            },
          ],
          basePrice: 4.5,
          quantity: 1,
          price: 7.5,
        },
      })
    );
  });

  it("edits an instance to an existing item in the cart that is not itself", async () => {
    render(
      <OrderInstanceWrapper>
        <CartProviderComponent
          defaultItems={defaultItems as ICart}
          defaultItemsArray={defaultItemsArray as ICartItemWithId[]}
        >
          <ViewCartJsx showItems={true} showItemsArray={true} />
          <EditButton cartItem={instance as ICartItem} />
        </CartProviderComponent>
      </OrderInstanceWrapper>
    );

    const edit = screen.getByText("edit cart item");
    await userEvent.click(edit);

    expect(screen.getByTestId("items").innerHTML).toBe(
      JSON.stringify({
        "01bc3b4047d9b6eda4988ed928507ec8d5fb86d6e4748d2972f30109cdd03cce": {
          key: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab",
          name: "Americano",
          category: "hot",
          size: null,
          milk: {
            id: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab6ffffebb-93ea-4616-b3ce-5f59b33e8a63",
            name: "Soy milk",
            price: 1,
          },
          extra: [
            {
              id: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab9bff625c-9f08-4e1e-b40c-e4241d132071",
              name: "Vanilla syrup",
              price: 1,
            },
            {
              id: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6abe2a9faad-9f79-4397-bf0b-73f0dd9b1901",
              name: "Hazelnut syrup",
              price: 1,
            },
          ],
          basePrice: 4.5,
          quantity: 2,
          price: 15,
        },
      })
    );

    expect(screen.getByTestId("itemsArray").innerHTML).toBe(
      JSON.stringify([
        {
          id: "01bc3b4047d9b6eda4988ed928507ec8d5fb86d6e4748d2972f30109cdd03cce",
          key: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab",
          name: "Americano",
          category: "hot",
          size: null,
          milk: {
            id: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab6ffffebb-93ea-4616-b3ce-5f59b33e8a63",
            name: "Soy milk",
            price: 1,
          },
          extra: [
            {
              id: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab9bff625c-9f08-4e1e-b40c-e4241d132071",
              name: "Vanilla syrup",
              price: 1,
            },
            {
              id: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6abe2a9faad-9f79-4397-bf0b-73f0dd9b1901",
              name: "Hazelnut syrup",
              price: 1,
            },
          ],
          basePrice: 4.5,
          quantity: 2,
          price: 15,
        },
      ])
    );
  });

  it("edits the same instance to the same instance and nothing changed", async () => {
    const defaultInstance = {
      key: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab",
      name: "Americano",
      category: "hot",
      size: null,
      milk: null,
      extra: null,
      price: 4.5,
      basePrice: 4.5,
      quantity: 1,
    } as ICartItem;
    render(
      <OrderInstanceWrapper>
        <CartProviderComponent>
          <ViewCartJsx showItems={true} showItemsArray={true} />
          <CartButton />
          <EditButton cartItem={defaultInstance} />
        </CartProviderComponent>
      </OrderInstanceWrapper>
    );

    const cart = screen.getByText("add to cart");
    const edit = screen.getByText("edit cart item");

    await userEvent.click(cart);

    expect(screen.getByTestId("items").innerHTML).toBe(
      JSON.stringify({
        "4b16fc6f1806768de8c09bca26b0a856e82bb79a3888f636e6084ca65203bc31": {
          key: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab",
          name: "Americano",
          category: "hot",
          size: null,
          milk: null,
          extra: null,
          price: 4.5,
          basePrice: 4.5,
          quantity: 1,
        },
      })
    );

    await userEvent.click(edit);

    expect(screen.getByTestId("items").innerHTML).toBe(
      JSON.stringify({
        "4b16fc6f1806768de8c09bca26b0a856e82bb79a3888f636e6084ca65203bc31": {
          key: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab",
          name: "Americano",
          category: "hot",
          size: null,
          milk: null,
          extra: null,
          price: 4.5,
          basePrice: 4.5,
          quantity: 1,
        },
      })
    );

    expect(screen.getByTestId("itemsArray").innerHTML).toBe(
      JSON.stringify([
        {
          id: "4b16fc6f1806768de8c09bca26b0a856e82bb79a3888f636e6084ca65203bc31",
          key: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab",
          name: "Americano",
          category: "hot",
          size: null,
          milk: null,
          extra: null,
          price: 4.5,
          basePrice: 4.5,
          quantity: 1,
        },
      ])
    );
  });

  it("edits the same instance to an updated version, where only the quantity changed", async () => {
    render(
      <OrderInstanceWrapper>
        <CartProviderComponent>
          <ViewCartJsx showItems={true} showItemsArray={true} />
          <CartButton />
          <EditButton
            cartItem={{ ...(defaultInstance as ICartItem), quantity: 2 }}
          />
        </CartProviderComponent>
      </OrderInstanceWrapper>
    );

    const cart = screen.getByText("add to cart");
    const edit = screen.getByText("edit cart item");

    await userEvent.click(cart);

    expect(screen.getByTestId("items").innerHTML).toBe(
      JSON.stringify({
        "4b16fc6f1806768de8c09bca26b0a856e82bb79a3888f636e6084ca65203bc31": {
          key: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab",
          name: "Americano",
          category: "hot",
          size: null,
          milk: null,
          extra: null,
          price: 4.5,
          basePrice: 4.5,
          quantity: 1,
        },
      })
    );

    await userEvent.click(edit);

    expect(screen.getByTestId("items").innerHTML).toBe(
      JSON.stringify({
        "4b16fc6f1806768de8c09bca26b0a856e82bb79a3888f636e6084ca65203bc31": {
          key: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab",
          name: "Americano",
          category: "hot",
          size: null,
          milk: null,
          extra: null,
          price: 9.0,
          basePrice: 4.5,
          quantity: 2,
        },
      })
    );

    expect(screen.getByTestId("itemsArray").innerHTML).toBe(
      JSON.stringify([
        {
          id: "4b16fc6f1806768de8c09bca26b0a856e82bb79a3888f636e6084ca65203bc31",
          key: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab",
          name: "Americano",
          category: "hot",
          size: null,
          milk: null,
          extra: null,
          price: 9.0,
          basePrice: 4.5,
          quantity: 2,
        },
      ])
    );
  });

  it("totals a cart item correctly", async () => {
    render(
      <OrderInstanceWrapper>
        <CartProviderComponent
          defaultItems={defaultItems}
          defaultItemsArray={defaultItemsArray}
        >
          <CheckoutList orderItems={sampleOrderItems} />
        </CartProviderComponent>
      </OrderInstanceWrapper>
    );

    console.log(screen.getAllByRole("button", { name: "edit item" }));
    const edit = screen.getAllByRole("button", { name: "edit item" })[0];

    await userEvent.click(edit);

    const itemTotal = screen.getByTestId("cart-item-price");
    expect(itemTotal.innerHTML).toBe("$7.50");
  });

  //TODO
  it("totals the entire cart correctly", async () => {
    render(
      <MantineProvider theme={mantineTheme}>
        <OrderInstanceWrapper>
          <CartProviderComponent>
            <CheckoutList orderItems={sampleOrderItems} />
            <TotalBar />
          </CartProviderComponent>
        </OrderInstanceWrapper>
      </MantineProvider>
    );
  });
});
