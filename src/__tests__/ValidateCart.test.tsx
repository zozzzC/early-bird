import invalidCartItem from "@/__tests__/sample/invalidCartItems/invalidCartItem.json";
import invalidCartItemArray from "@/__tests__/sample/invalidCartItems/invalidCartItemArray.json";
import invalidCartItemMilkExtraNotFound from "@/__tests__/sample/invalidCartItems/invalidCartItemMilkExtraNotFound.json";
import sampleOrderItems from "@/__tests__/sample/sampleOrderItems.json";
import CartProviderComponent from "@/components/order/CartProviderComponent";
import InvalidCartButton from "@/components/test/ValidateCartButton";
import ViewCartJsx from "@/components/test/ViewCartJsx";
import { render, screen } from "@/helpers/test-utils";
import { ICart } from "@/types/Cart";
import userEvent from "@testing-library/user-event";
import getItemsArray from "./helpers/getItemsArray";

describe("validate cart function", () => {
  // test("expect hash of invalid cart item to be valid", async () => {
  //   render(
  //     <CartProviderComponent
  //       defaultItems={invalidCartItem}
  //       defaultItemsArray={invalidCartItemArray}
  //     >
  //       <GetItemHashButton
  //         cartItem={
  //           invalidCartItemMilkExtraNotFound[
  //             "69ba3be565469384d44777552b45ed7dbb188a35f7634a0e0d0e56ee2322946c"
  //           ]
  //         }
  //       />
  //       <ViewCartJsx showItems={true} showItemsArray={true} />
  //     </CartProviderComponent>
  //   );

  //   await userEvent.click(screen.getByText("get cart item id"));
  // });

  test("while paying, given an invalid cart with wrong prices for all options and base prices, the cart is updated, the item total is updated, and priceChanged is true and optionsChanged is false.", async () => {
    render(
      <CartProviderComponent
        defaultItems={invalidCartItem}
        defaultItemsArray={invalidCartItemArray}
      >
        <InvalidCartButton orderItems={sampleOrderItems} />
        <ViewCartJsx showItems={true} showItemsArray={true} />
      </CartProviderComponent>
    );

    await userEvent.click(screen.getByText("validate cart"));

    expect(screen.getByTestId("items").innerHTML).toBe(
      JSON.stringify({
        "1981f499b4d9877061a4505024dc7c56895c7d044593c2bc137cf94b43b0cd01": {
          key: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab",
          name: "Americano",
          category: "hot",
          size: {
            id: "30578160-04bf-45c6-8098-f2d4c6c06e9f",
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
          id: "1981f499b4d9877061a4505024dc7c56895c7d044593c2bc137cf94b43b0cd01",
          key: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab",
          name: "Americano",
          category: "hot",
          size: {
            id: "30578160-04bf-45c6-8098-f2d4c6c06e9f",
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
        <InvalidCartButton orderItems={sampleOrderItems} />
        <ViewCartJsx showItems={true} showItemsArray={true} />
      </CartProviderComponent>
    );

    await userEvent.click(screen.getByText("validate cart"));
    expect(screen.getByTestId("items").innerHTML).toBe(
      JSON.stringify({
        ee7ef2c43ef1907fafec178d7faf6d5a50aebbcfadcd36e0ffe1e37b9075bd7f: {
          key: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab",
          name: "Americano",
          category: "hot",
          size: {
            id: "30578160-04bf-45c6-8098-f2d4c6c06e9f",
            name: "small",
            price: 0,
          },
          milk: {
            id: "e2b8dde1-18aa-4b55-9c4a-f0ba4f3a2710",
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

  test.todo(
    "while paying, given an invalid cart where required options are needed (EG: milk and size for americano), the item is updated with the default, priceChanged is true and optionsChanged is true."
  );

  test.todo(
    "while paying, given an invalid cart where there are parameters missing and some that are added, we are not allowed to continue."
  );

  test.todo(
    "while paying, given a valid cart, nothing is changed. (for something that has no add ons.)"
  );

  test.todo(
    "given a valid cart with correct prices for all options and base prices, the cart stays the same, and priceChanged and optionsChanged is false."
  );

  test.todo(
    "given a valid cart with an item that is out of stock, the prices are still updated (validateCart does not manage/check for out of stock items.)"
  );
});
