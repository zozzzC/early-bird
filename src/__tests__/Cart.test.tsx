import CheckoutList from "@/components/checkout/CheckoutList";
import TotalBar from "@/components/checkout/TotalBar";
import { mantineTheme } from "@/components/MantineTheme";
import CartButton from "@/components/order/CartButton";
import CartProviderComponent from "@/components/order/CartProviderComponent";
import EditButton from "@/components/test/EditButton";
import OrderInstanceWrapper from "@/components/test/OrderInstanceWrapper";
import ViewCartJsx from "@/components/test/ViewCartJsx";
import { ICart, ICartItem } from "@/types/Cart";
import { MantineProvider } from "@mantine/core";
import userEvent from "@testing-library/user-event";
import { render, screen } from "../helpers/test-utils";
import getItemsArray from "./helpers/getItemsArray";
import defaultInstance from "./sample/defaultInstance.json";
import defaultItems from "./sample/defaultItems.json";
import instance from "./sample/instance.json";
import sampleOrderItems from "./sample/sampleOrderItems.json";

describe("Cart functionalities", () => {
  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(jest.fn());
  });
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
        cd95a6ece74af996094f966b72087d55564fccfd04ba27034231cbcf9ac4d45f: {
          key: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab",
          name: "Americano",
          category: "hot",
          size: {
            id: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab30578160-04bf-45c6-8098-f2d4c6c06e9f",
            name: "small",
            price: 0,
          },
          milk: {
            id: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6abe2b8dde1-18aa-4b55-9c4a-f0ba4f3a2710",
            name: "Fresh milk",
            price: 0,
          },
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
          id: "cd95a6ece74af996094f966b72087d55564fccfd04ba27034231cbcf9ac4d45f",
          key: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab",
          name: "Americano",
          category: "hot",
          size: {
            id: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab30578160-04bf-45c6-8098-f2d4c6c06e9f",
            name: "small",
            price: 0,
          },
          milk: {
            id: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6abe2b8dde1-18aa-4b55-9c4a-f0ba4f3a2710",
            name: "Fresh milk",
            price: 0,
          },
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
        cd95a6ece74af996094f966b72087d55564fccfd04ba27034231cbcf9ac4d45f: {
          key: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab",
          name: "Americano",
          category: "hot",
          size: {
            id: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab30578160-04bf-45c6-8098-f2d4c6c06e9f",
            name: "small",
            price: 0,
          },
          milk: {
            id: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6abe2b8dde1-18aa-4b55-9c4a-f0ba4f3a2710",
            name: "Fresh milk",
            price: 0,
          },
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
          id: "cd95a6ece74af996094f966b72087d55564fccfd04ba27034231cbcf9ac4d45f",
          key: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab",
          name: "Americano",
          category: "hot",
          size: {
            id: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab30578160-04bf-45c6-8098-f2d4c6c06e9f",
            name: "small",
            price: 0,
          },
          milk: {
            id: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6abe2b8dde1-18aa-4b55-9c4a-f0ba4f3a2710",
            name: "Fresh milk",
            price: 0,
          },
          extra: null,
          price: 9.0,
          basePrice: 4.5,
          quantity: 2,
        },
      ])
    );
  });

  //TODO: what does this function even do???
  // it("accurately updates the value of something in the cart to the correct price", async () => {
  //   render(
  //     <OrderInstanceWrapper instance={instance as ICartItem}>
  //       <CartProviderComponent>
  //         <ViewCartJsx showItems={true} />
  //         <CartButton />
  //       </CartProviderComponent>
  //     </OrderInstanceWrapper>
  //   );

  //   const cart = screen.getByText("add to cart");
  //   await userEvent.click(cart);

  //   expect(screen.getByTestId("items").innerHTML).toBe(
  //     JSON.stringify({
  //       "5dcf4224b077dbebc8324df213a7b1a069024a6f1a31dd91f9a956e9d4b07199": {
  //         key: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab",
  //         name: "Americano",
  //         category: "hot",
  //         size: {
  //           id: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab30578160-04bf-45c6-8098-f2d4c6c06e9f",
  //           name: "small",
  //           price: 0,
  //         },
  //         milk: {
  //           id: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab6ffffebb-93ea-4616-b3ce-5f59b33e8a63",
  //           name: "Soy milk",
  //           price: 1,
  //         },
  //         extra: [
  //           {
  //             id: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab9bff625c-9f08-4e1e-b40c-e4241d132071",
  //             name: "Vanilla syrup",
  //             price: 1,
  //           },
  //           {
  //             id: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6abe2a9faad-9f79-4397-bf0b-73f0dd9b1901",
  //             name: "Hazelnut syrup",
  //             price: 1,
  //           },
  //         ],
  //         price: 7.5,
  //         quantity: 1,
  //         basePrice: 4.5,
  //       },
  //     })
  //   );
  // });

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

    await userEvent.click(edit);

    expect(screen.getByTestId("items").innerHTML).toBe(
      JSON.stringify({
        "5dcf4224b077dbebc8324df213a7b1a069024a6f1a31dd91f9a956e9d4b07199": {
          key: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab",
          name: "Americano",
          category: "hot",
          size: {
            id: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab30578160-04bf-45c6-8098-f2d4c6c06e9f",
            name: "small",
            price: 0,
          },
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
          price: 7.5,
          quantity: 1,
          basePrice: 4.5,
        },
      })
    );
  });

  it("edits an instance to an existing item in the cart that is not itself, ensuring that after editing, the order of items in the array is persisted", async () => {
    render(
      <OrderInstanceWrapper>
        <CartProviderComponent
          defaultItems={defaultItems as ICart}
          defaultItemsArray={getItemsArray(defaultItems as ICart)}
        >
          <ViewCartJsx showItems={true} showItemsArray={true} />
          <EditButton cartItem={instance as ICartItem} />
        </CartProviderComponent>
      </OrderInstanceWrapper>
    );

    expect(screen.getByTestId("items").innerHTML).toBe(
      JSON.stringify(defaultItems)
    );
    expect(screen.getByTestId("itemsArray").innerHTML).toBe(
      JSON.stringify(getItemsArray(defaultItems as ICart))
    );

    const edit = screen.getByText("edit cart item");
    await userEvent.click(edit);

    expect(screen.getByTestId("items").innerHTML).toBe(
      JSON.stringify({
        "3503a0cd0f8f82ebcfc4d57fb146a8df9313062341241e55031e03b30f6ae03a": {
          key: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab",
          name: "Americano",
          category: "hot",
          size: {
            id: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab30578160-04bf-45c6-8098-f2d4c6c06e9f",
            name: "small",
            price: 0,
          },
          milk: {
            id: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab6ffffebb-93ea-4616-b3ce-5f59b33e8a63",
            name: "Soy milk",
            price: 1,
          },
          extra: null,
          price: 5.5,
          quantity: 1,
          basePrice: 4.5,
        },
        "5dcf4224b077dbebc8324df213a7b1a069024a6f1a31dd91f9a956e9d4b07199": {
          key: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab",
          name: "Americano",
          category: "hot",
          size: {
            id: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab30578160-04bf-45c6-8098-f2d4c6c06e9f",
            name: "small",
            price: 0,
          },
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
          price: 15,
          quantity: 2,
          basePrice: 4.5,
        },
      })
    );

    expect(screen.getByTestId("itemsArray").innerHTML).toBe(
      JSON.stringify([
        {
          id: "5dcf4224b077dbebc8324df213a7b1a069024a6f1a31dd91f9a956e9d4b07199",
          key: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab",
          name: "Americano",
          category: "hot",
          size: {
            id: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab30578160-04bf-45c6-8098-f2d4c6c06e9f",
            name: "small",
            price: 0,
          },
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
          price: 15,
          quantity: 2,
          basePrice: 4.5,
        },
        {
          id: "3503a0cd0f8f82ebcfc4d57fb146a8df9313062341241e55031e03b30f6ae03a",
          key: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab",
          name: "Americano",
          category: "hot",
          size: {
            id: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab30578160-04bf-45c6-8098-f2d4c6c06e9f",
            name: "small",
            price: 0,
          },
          milk: {
            id: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab6ffffebb-93ea-4616-b3ce-5f59b33e8a63",
            name: "Soy milk",
            price: 1,
          },
          extra: null,
          price: 5.5,
          quantity: 1,
          basePrice: 4.5,
        },
      ])
    );
  });

  //TODO: this is returning 2 quantities, when it should return ONE 
  it("edits the same instance to the same instance and nothing changed", async () => {
    render(
      <OrderInstanceWrapper>
        <CartProviderComponent>
          <ViewCartJsx showItems={true} showItemsArray={true} />
          <CartButton />
          <EditButton cartItem={defaultInstance as ICartItem} />
        </CartProviderComponent>
      </OrderInstanceWrapper>
    );

    const cart = screen.getByText("add to cart");
    const edit = screen.getByText("edit cart item");

    await userEvent.click(cart);

    expect(screen.getByTestId("items").innerHTML).toBe(
      JSON.stringify({
        cd95a6ece74af996094f966b72087d55564fccfd04ba27034231cbcf9ac4d45f: {
          key: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab",
          name: "Americano",
          category: "hot",
          size: {
            id: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab30578160-04bf-45c6-8098-f2d4c6c06e9f",
            name: "small",
            price: 0,
          },
          milk: {
            id: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6abe2b8dde1-18aa-4b55-9c4a-f0ba4f3a2710",
            name: "Fresh milk",
            price: 0,
          },
          extra: null,
          price: 4.5,
          quantity: 1,
          basePrice: 4.5,
        },
      })
    );

    await userEvent.click(edit);

    expect(screen.getByTestId("items").innerHTML).toBe(
      JSON.stringify({
        cd95a6ece74af996094f966b72087d55564fccfd04ba27034231cbcf9ac4d45f: {
          key: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab",
          name: "Americano",
          category: "hot",
          size: {
            id: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab30578160-04bf-45c6-8098-f2d4c6c06e9f",
            name: "small",
            price: 0,
          },
          milk: {
            id: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6abe2b8dde1-18aa-4b55-9c4a-f0ba4f3a2710",
            name: "Fresh milk",
            price: 0,
          },
          extra: null,
          price: 4.5,
          quantity: 1,
          basePrice: 4.5,
        },
      })
    );

    expect(screen.getByTestId("itemsArray").innerHTML).toBe(
      JSON.stringify([
        {
          id: "cd95a6ece74af996094f966b72087d55564fccfd04ba27034231cbcf9ac4d45f",
          key: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab",
          name: "Americano",
          category: "hot",
          size: {
            id: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab30578160-04bf-45c6-8098-f2d4c6c06e9f",
            name: "small",
            price: 0,
          },
          milk: {
            id: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6abe2b8dde1-18aa-4b55-9c4a-f0ba4f3a2710",
            name: "Fresh milk",
            price: 0,
          },
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
        cd95a6ece74af996094f966b72087d55564fccfd04ba27034231cbcf9ac4d45f:
          defaultInstance,
      })
    );

    await userEvent.click(edit);

    expect(screen.getByTestId("items").innerHTML).toBe(
      JSON.stringify({
        cd95a6ece74af996094f966b72087d55564fccfd04ba27034231cbcf9ac4d45f: {
          key: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab",
          name: "Americano",
          category: "hot",
          size: {
            id: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab30578160-04bf-45c6-8098-f2d4c6c06e9f",
            name: "small",
            price: 0,
          },
          milk: {
            id: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6abe2b8dde1-18aa-4b55-9c4a-f0ba4f3a2710",
            name: "Fresh milk",
            price: 0,
          },
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
          id: "cd95a6ece74af996094f966b72087d55564fccfd04ba27034231cbcf9ac4d45f",
          key: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab",
          name: "Americano",
          category: "hot",
          size: {
            id: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab30578160-04bf-45c6-8098-f2d4c6c06e9f",
            name: "small",
            price: 0,
          },
          milk: {
            id: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6abe2b8dde1-18aa-4b55-9c4a-f0ba4f3a2710",
            name: "Fresh milk",
            price: 0,
          },
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
          defaultItemsArray={getItemsArray(defaultItems as ICart)}
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
