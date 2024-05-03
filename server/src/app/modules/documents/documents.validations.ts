import { z } from "zod";

const addTemplate = z.object({
    title: z
        .string({
            invalid_type_error: "Title must be in String",
        })
});

const sendDocument = z.object({
    title: z.string({ invalid_type_error: "Title should be string~" }),
    propertyId: z.string({ invalid_type_error: "Property id should be a string" }),
    tenantId: z.string({ invalid_type_error: "Tenant ID should be string!" })
})

const updateDocument = z.object({
    documentId: z.string({ invalid_type_error: "Document id should be string!" })
})
// update
// const updateExtraCost = z.object({
//     body: z.object({
//         cost: z.number().nonnegative(),
//     }),
// });

export const DocumentValidations = {
    addTemplate,
    sendDocument,
    updateDocument,
};
