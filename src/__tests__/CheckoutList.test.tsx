import defaultItems from "@/__tests__/sample/defaultItems.json";
import defaultItemsArray from "@/__tests__/sample/defaultItemsArray.json";
import sampleOrderItemsAmericanoOutOfStock from "@/__tests__/sample/sampleOrderItemsAmericanoOutOfStock.json";
import CheckoutList from "@/components/checkout/CheckoutList";
import CartProviderComponent from "@/components/order/CartProviderComponent";
import { render, screen } from "@/helpers/test-utils";
import userEvent from "@testing-library/user-event";

describe("out of stock tests", () => {
  it("if an item in the cart is out of stock, the out of stock text appears", async () => {
    render(
      <CartProviderComponent
        defaultItems={defaultItems}
        defaultItemsArray={defaultItemsArray}
      >
        <CheckoutList orderItems={sampleOrderItemsAmericanoOutOfStock} />
      </CartProviderComponent>
    );

    expect(screen.getAllByRole("paragraph")[0].innerHTML).toBe(
      "this item is currently unavailable."
    );
  });

  it("if an item in cart is out of stock, clicking the pay now button pulls up the warning modal", async () => {
    render(
      <CartProviderComponent
        defaultItems={defaultItems}
        defaultItemsArray={defaultItemsArray}
      >
        <CheckoutList orderItems={sampleOrderItemsAmericanoOutOfStock} />
      </CartProviderComponent>
    );

    const payNow = screen.getByRole("button", { name: "pay now" });
    await userEvent.click(payNow);

    expect(
      screen.findByText(
        "you have unavailable items in your cart. please remove them from your cart to continue."
      )
    ).toBeDefined;
  });

  it.todo(
    "when only 1 of 2 out of stock items are removed from the cart, the pay now button still pulls up the warning modal"
  );

  it.todo(
    "if all out of stock items are removed from the cart, the pay now button does not pull up the warning modal"
  );
});
