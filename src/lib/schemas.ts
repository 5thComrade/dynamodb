import {
  string,
  object,
  optional,
  type Output,
  record,
  picklist,
} from "valibot";

// *** Customer Schema and Type ***

export const CustomerSchema = object({
  firstName: string(),
  lastName: string(),
  phone: string(),
  email: string(),
  zipcode: string(),
  shippingAddresses: optional(
    record(
      picklist(["home", "business"]),
      object({
        streetAddress: string(),
        postalCode: string(),
        country: string(),
      })
    )
  ),
});

export type CustomerSchemaType = Output<typeof CustomerSchema>;
