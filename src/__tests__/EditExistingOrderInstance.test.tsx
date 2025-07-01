import sampleOrderItems from "@/__tests__/sample/sampleOrderItems.json";
import CheckoutList from "@/components/checkout/CheckoutList";
import CartProviderComponent from "@/components/order/CartProviderComponent";
import ViewCartJsx from "@/components/test/ViewCartJsx";
import { render, screen } from "@/helpers/test-utils";
import { OrderModalResponse } from "@/types/OrderModalResponse";
import userEvent from "@testing-library/user-event";
import defaultItems from "./sample/defaultItems.json";
import defaultItemsArray from "./sample/defaultItemsArray.json";
describe("editing an existing order item with ", () => {
  it("edits an existing item to itself (no change) using the modal", async () => {
    render(
      <>
        <CartProviderComponent
          defaultItems={defaultItems}
          defaultItemsArray={defaultItemsArray}
        >
          <CheckoutList orderItems={sampleOrderItems as OrderModalResponse[]} />
          <ViewCartJsx showItems={true} showItemsArray={true} />
        </CartProviderComponent>
      </>
    );

    const editItem = screen.getAllByRole("button", { name: "edit item" })[0];
    await userEvent.click(editItem);
    const edit = screen.getAllByRole("button", { name: "edit" })[0];
    await userEvent.click(edit);

    expect(screen.getByTestId("itemsArray").innerHTML).toBe(
      JSON.stringify(defaultItemsArray)
    );
    expect(screen.getByTestId("items").innerHTML).toBe(
      JSON.stringify(defaultItems)
    );
  });

  it("edits an existing order item to a new non-existent cart order item using the modal", async () => {
    const americano = {
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
    };

    const americanoArray = [
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
    ];

    render(
      <>
        <CartProviderComponent
          defaultItems={americano}
          defaultItemsArray={americanoArray}
        >
          <CheckoutList orderItems={sampleOrderItems as OrderModalResponse[]} />
          <ViewCartJsx showItems={true} showItemsArray={true} />
        </CartProviderComponent>
      </>
    );

    const editItem = screen.getAllByRole("button", { name: "edit item" })[0];
    await userEvent.click(editItem);

    const soyMilkButton = screen.getByText("Soy milk");
    const vanillaSyrupButton = screen.getByText("Vanilla syrup");
    const hazelnutSyrupButton = screen.getByText("Hazelnut syrup");

    await userEvent.click(soyMilkButton);
    await userEvent.click(vanillaSyrupButton);
    await userEvent.click(hazelnutSyrupButton);
    const edit = screen.getAllByRole("button", { name: "edit" })[0];
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
          price: 7.5,
          basePrice: 4.5,
          quantity: 1,
        },
      })
    );
  });

  it.todo(
    "edits an existing order item to an existing order item using the modal"
  );

  it.todo("deletes the order item from the cart");
});
