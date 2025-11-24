import { obligatoryFieldsSchema, obligatoryRequredFields } from "../core.schema";

export const loginSchema = {
    type: "object",
    properties: {
        ...obligatoryFieldsSchema,
    },
    required: [...obligatoryRequredFields],
};