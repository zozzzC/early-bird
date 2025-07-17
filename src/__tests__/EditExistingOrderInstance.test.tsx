import sampleOrderItems from "@/__tests__/sample/sampleOrderItems.json";
import CheckoutList from "@/components/checkout/CheckoutList";
import ViewCartJsx from "@/components/test/ViewCartJsx";
import CartProviderComponent from "@/components/wrappers/CartProviderComponent";
import { render, screen } from "@/helpers/test-utils";
import { ICart } from "@/types/Cart";
import { OrderModalResponse } from "@/types/OrderModalResponse";
import userEvent from "@testing-library/user-event";
import getItemsArray from "./helpers/getItemsArray";
import defaultItems from "./sample/defaultItems.json";
describe("editing an existing order item with modal", () => {
  it("edits an existing item to itself (no change) using the modal", async () => {
    render(
      <>
        <CartProviderComponent
          defaultItems={defaultItems}
          defaultItemsArray={getItemsArray(defaultItems)}
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
      JSON.stringify(getItemsArray(defaultItems))
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

  it("edits an existing order item to an existing order item using the modal", async () => {
    render(
      <CartProviderComponent
        defaultItems={defaultItems as ICart}
        defaultItemsArray={getItemsArray(defaultItems)}
      >
        <CheckoutList orderItems={sampleOrderItems as OrderModalResponse[]} />
        <ViewCartJsx showItems={true} showItemsArray={true} />
      </CartProviderComponent>
    );

    const editItem = screen.getAllByRole("button", { name: "edit item" })[1];
    await userEvent.click(editItem);

    const soyMilkButton = screen.getByTestId(
      "single-select-1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab6ffffebb-93ea-4616-b3ce-5f59b33e8a63"
    );
    const vanillaSyrupButton = screen.getByTestId(
      "mutli-select-1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab9bff625c-9f08-4e1e-b40c-e4241d132071"
    );
    const hazelnutSyrupButton = screen.getByTestId(
      "mutli-select-1c1f97ca-4876-81bc-bd7d-ef471bc0a6abe2a9faad-9f79-4397-bf0b-73f0dd9b1901"
    );

    await userEvent.click(soyMilkButton);
    await userEvent.click(vanillaSyrupButton);
    await userEvent.click(hazelnutSyrupButton);
    const edit = screen.getAllByRole("button", { name: "edit" })[0];
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

  it("edits an existing order item's quantity", async () => {
    render(
      <CartProviderComponent
        defaultItems={defaultItems as ICart}
        defaultItemsArray={getItemsArray(defaultItems)}
      >
        <CheckoutList orderItems={sampleOrderItems as OrderModalResponse[]} />
        <ViewCartJsx showItems={true} showItemsArray={true} />
      </CartProviderComponent>
    );

    const editItem = screen.getAllByRole("button", { name: "edit item" })[0];
    await userEvent.click(editItem);
    const quantityButton = screen.getAllByRole("textbox")[0];
    await userEvent.clear(quantityButton);
    await userEvent.type(quantityButton, "2");
    const edit = screen.getByText("edit");
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
          quantity: 1,
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

  it("deletes the order item from the cart", async () => {
    render(
      <CartProviderComponent
        defaultItems={defaultItems as ICart}
        defaultItemsArray={getItemsArray(defaultItems)}
      >
        <CheckoutList orderItems={sampleOrderItems as OrderModalResponse[]} />
        <ViewCartJsx showItems={true} showItemsArray={true} />
      </CartProviderComponent>
    );

    const deleteButton = screen.getAllByTestId("delete order item")[0];
    await userEvent.click(deleteButton);

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
      })
    );
  });
});
