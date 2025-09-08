import {
  createPreorderProcessing,
  setPreorderProcessing,
} from "@/services/preorderProcessing";
import { ICartItemWithId } from "@/types/Cart";
import { CustomerDetails } from "@/types/CustomerDetails";

describe("test preorder processing function", () => {
  let preorderProcessingId = "";
  it("creates a new preorder processing in notion", async () => {
    preorderProcessingId = await createPreorderProcessing(
      {
        name: "name",
        email: "email@email.com",
        phone: "+64 (203) 121-2312",
        pickupDate: "2025-09-05T08:09:15.001Z",
        createdDate: "2025-09-01T08:09:15.001Z",
      } as CustomerDetails,
      [
        {
          id: "bc0afb3a2e73f56abe9f7f1c2337a7062d417b6a16043b5b3e5eb6e501a4dd55",
          key: "1c1f97ca-4876-8123-bd9a-c854ae49ed03",
          name: "Long black",
          category: "hot",
          size: {
            id: "1c1f97ca-4876-8123-bd9a-c854ae49ed0330578160-04bf-45c6-8098-f2d4c6c06e9f",
            name: "small",
            price: 0,
          },
          milk: {
            id: "1c1f97ca-4876-8123-bd9a-c854ae49ed03e2b8dde1-18aa-4b55-9c4a-f0ba4f3a2710",
            name: "Fresh milk",
            price: 0,
          },
          extra: null,
          price: 4.5,
          quantity: 1,
          basePrice: 4.5,
        },
      ] as ICartItemWithId[],
    );
  });
  it("updates a preorder processing", async () => {
    await setPreorderProcessing(preorderProcessingId, "unpaid");
  });
});
