import * as yup from "yup";

export const customerDetailsSchema = yup
  .object()
  .shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
    pickupDate: yup.string().datetime().required(),
    createdDate: yup.string().datetime().required(),
  })
  .noUnknown(true);

const cartAddOnSchema = yup.object().shape({
  id: yup.string().required(),
  name: yup.string().required(),
  price: yup.number().required(),
});

export const cartItemWithIdSchema = yup
  .object()
  .shape({
    id: yup.string().required(),
    name: yup.string().required(),
    category: yup.string().nullable(),
    milk: cartAddOnSchema.nullable(),
    extra: yup.array().of(cartAddOnSchema).nullable(),
    size: cartAddOnSchema.nullable(),
    price: yup.number().positive().required(),
    basePrice: yup.number().positive().required(),
    quantity: yup.number().positive().required(),
  })
  .noUnknown(true);

export const cartItemWithIdArraySchema = yup
  .array()
  .of(cartItemWithIdSchema)
  .required();
