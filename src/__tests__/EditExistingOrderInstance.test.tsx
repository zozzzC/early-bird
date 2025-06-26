import CheckoutList from "@/components/checkout/CheckoutList";
import CheckoutListItems from "@/components/checkout/CheckoutListItems";
import { mantineTheme } from "@/components/MantineTheme";
import CartProviderComponent from "@/components/order/CartProviderComponent";
import { getOrderItems } from "@/lib/orderItems";
import { ICart, ICartItem } from "@/types/Cart";
import { MantineProvider } from "@mantine/core";
import { render } from "@testing-library/react";

describe("", () => {
  const instance = {
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
  } as ICartItem;

  const defaultItems = {
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
  } as ICart;
  //TODO
  it("edits and existing item to itself (no change) using a modal", async () => {
    const orderItems = await getOrderItems();

    render(
      <>
        <MantineProvider theme={mantineTheme}>
          <CartProviderComponent>
            <CheckoutList orderItems={orderItems} />
          </CartProviderComponent>
        </MantineProvider>
      </>


    );
  });
});
