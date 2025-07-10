import defaultItems from "@/__tests__/sample/defaultItems.json";
import invalidCartItem from "@/__tests__/sample/invalidCartItems/invalidCartItem.json";
import invalidCartItemArray from "@/__tests__/sample/invalidCartItems/invalidCartItemArray.json";
import invalidCartItemMilkExtraNotFound from "@/__tests__/sample/invalidCartItems/invalidCartItemMilkExtraNotFound.json";
import invalidCartOptionsNeeded from "@/__tests__/sample/invalidCartItems/invalidCartOptionsNeeded.json";
import sampleOrderItems from "@/__tests__/sample/sampleOrderItems.json";
import sampleOrderItemsAmericanoOutOfStock from "@/__tests__/sample/sampleOrderItemsAmericanoOutOfStock.json";
import CartProviderComponent from "@/components/order/CartProviderComponent";
import GetItemHashButton from "@/components/test/GetItemHashButton";
import ValidateCartButton from "@/components/test/ValidateCartButton";
import ViewCartJsx from "@/components/test/ViewCartJsx";
import { render, screen } from "@/helpers/test-utils";
import { ICart } from "@/types/Cart";
import userEvent from "@testing-library/user-event";
import getItemsArray from "./helpers/getItemsArray";

describe("validate cart function", () => {
  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(jest.fn());
  });
  test("expect hash of invalid cart item to be valid", async () => {
    render(
      <CartProviderComponent
        defaultItems={invalidCartItem}
        defaultItemsArray={invalidCartItemArray}
      >
        <GetItemHashButton
          cartItem={{
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
            basePrice: 4.5,
            quantity: 1,
          }}
        />
        <ViewCartJsx showItems={true} showItemsArray={true} />
      </CartProviderComponent>
    );

    await userEvent.click(screen.getByText("get cart item id"));
  });

  test("while paying, given an invalid cart with wrong prices for all options and base prices, the cart is updated, the item total is updated, and priceChanged is true and optionsChanged is false.", async () => {
    render(
      <CartProviderComponent
        defaultItems={invalidCartItem}
        defaultItemsArray={invalidCartItemArray}
      >
        <ValidateCartButton orderItems={sampleOrderItems} pay={true} />
        <ViewCartJsx showItems={true} showItemsArray={true} />
      </CartProviderComponent>
    );

    await userEvent.click(screen.getByText("validate cart"));

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
          basePrice: 4.5,
          quantity: 1,
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
          price: 7.5,
          basePrice: 4.5,
          quantity: 1,
        },
      ])
    );

    expect(screen.getByTestId("price-changed").innerHTML).toBe("true");
    expect(screen.getByTestId("options-changed").innerHTML).toBe("false");
  });

  test("while paying, given an invalid cart with a milk option that cannot be found, and an extra option that cannot be found, the cart is updated with the default milk option, the extra option is removed, the item total is updated, and priceChanged and optionsChanged is true.", async () => {
    render(
      <CartProviderComponent
        defaultItems={invalidCartItemMilkExtraNotFound}
        defaultItemsArray={getItemsArray(
          invalidCartItemMilkExtraNotFound as ICart
        )}
      >
        <ValidateCartButton orderItems={sampleOrderItems} pay={true} />
        <ViewCartJsx showItems={true} showItemsArray={true} />
      </CartProviderComponent>
    );

    await userEvent.click(screen.getByText("validate cart"));
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
  });

  test("while paying, given an invalid cart where invalid key is passed in, the item is updated with the default, priceChanged is true and optionsChanged is true.", async () => {
    render(
      <CartProviderComponent
        defaultItems={invalidCartOptionsNeeded}
        defaultItemsArray={getItemsArray(invalidCartOptionsNeeded as ICart)}
      >
        <ValidateCartButton orderItems={sampleOrderItems} pay={true} />
        <ViewCartJsx showItems={true} showItemsArray={true} />
      </CartProviderComponent>
    );

    await userEvent.click(screen.getByText("validate cart"));
    expect(screen.getByTestId("items").innerHTML).toBe("{}");

    expect(screen.getByTestId("price-changed").innerHTML).toBe("true");
    expect(screen.getByTestId("options-changed").innerHTML).toBe("true");
  });

  test("while paying, given a valid cart, nothing is changed. (for something that has no add ons.)", async () => {
    render(
      <CartProviderComponent
        defaultItems={defaultItems}
        defaultItemsArray={getItemsArray(defaultItems as ICart)}
      >
        <ValidateCartButton orderItems={sampleOrderItems} pay={true} />
        <ViewCartJsx showItems={true} showItemsArray={true} />
      </CartProviderComponent>
    );

    await userEvent.click(screen.getByText("validate cart"));
    expect(screen.getByTestId("items").innerHTML).toBe(
      JSON.stringify(defaultItems)
    );

    expect(screen.getByTestId("price-changed").innerHTML).toBe("false");
    expect(screen.getByTestId("options-changed").innerHTML).toBe("false");
  });

  test("given a valid cart with an item that is out of stock, the prices are still updated (validateCart does not manage/check for out of stock items.)", async () => {
    render(
      <CartProviderComponent
        defaultItems={defaultItems}
        defaultItemsArray={getItemsArray(defaultItems as ICart)}
      >
        <ValidateCartButton
          orderItems={sampleOrderItemsAmericanoOutOfStock}
          pay={true}
        />
        <ViewCartJsx showItems={true} showItemsArray={true} />
      </CartProviderComponent>
    );

    await userEvent.click(screen.getByText("validate cart"));
    expect(screen.getByTestId("items").innerHTML).toBe(
      JSON.stringify(defaultItems)
    );

    expect(screen.getByTestId("price-changed").innerHTML).toBe("false");
    expect(screen.getByTestId("options-changed").innerHTML).toBe("false");
  });

  test("initializing cart, given an invalid cart with wrong prices for all options and base prices, the cart is updated, the item total is updated, and priceChanged is true and optionsChanged is false", async () => {
    render(
      <CartProviderComponent
        defaultItems={invalidCartItem}
        defaultItemsArray={invalidCartItemArray}
      >
        <ValidateCartButton orderItems={sampleOrderItems} pay={false} />
        <ViewCartJsx showItems={true} showItemsArray={true} />
      </CartProviderComponent>
    );

    await userEvent.click(screen.getByText("validate cart"));

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
          basePrice: 4.5,
          quantity: 1,
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
          price: 7.5,
          basePrice: 4.5,
          quantity: 1,
        },
      ])
    );

    expect(screen.getByTestId("price-changed").innerHTML).toBe("true");
    expect(screen.getByTestId("options-changed").innerHTML).toBe("false");
  });

  test("initializing cart, given an invalid cart with a milk option that cannot be found, and an extra option that cannot be found, the cart is updated with the default milk option, the extra option is removed, the item total is updated, and priceChanged and optionsChanged is true.", async () => {
    render(
      <CartProviderComponent
        defaultItems={invalidCartItemMilkExtraNotFound}
        defaultItemsArray={getItemsArray(
          invalidCartItemMilkExtraNotFound as ICart
        )}
      >
        <ValidateCartButton orderItems={sampleOrderItems} pay={false} />
        <ViewCartJsx showItems={true} showItemsArray={true} />
      </CartProviderComponent>
    );

    await userEvent.click(screen.getByText("validate cart"));
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
  });

  test("initializing cart, given an invalid cart where invalid key is passed in, the item is updated with the default, priceChanged is true and optionsChanged is true.", async () => {
    render(
      <CartProviderComponent
        defaultItems={invalidCartOptionsNeeded}
        defaultItemsArray={getItemsArray(invalidCartOptionsNeeded as ICart)}
      >
        <ValidateCartButton orderItems={sampleOrderItems} pay={false} />
        <ViewCartJsx showItems={true} showItemsArray={true} />
      </CartProviderComponent>
    );

    await userEvent.click(screen.getByText("validate cart"));
    expect(screen.getByTestId("items").innerHTML).toBe("{}");

    expect(screen.getByTestId("price-changed").innerHTML).toBe("true");
    expect(screen.getByTestId("options-changed").innerHTML).toBe("true");
  });

  test("initializing cart, given a valid cart, nothing is changed. (for something that has no add ons.)", async () => {
    render(
      <CartProviderComponent
        defaultItems={defaultItems}
        defaultItemsArray={getItemsArray(defaultItems as ICart)}
      >
        <ValidateCartButton orderItems={sampleOrderItems} pay={false} />
        <ViewCartJsx showItems={true} showItemsArray={true} />
      </CartProviderComponent>
    );

    await userEvent.click(screen.getByText("validate cart"));
    expect(screen.getByTestId("items").innerHTML).toBe(
      JSON.stringify(defaultItems)
    );

    expect(screen.getByTestId("price-changed").innerHTML).toBe("false");
    expect(screen.getByTestId("options-changed").innerHTML).toBe("false");
  });
});
