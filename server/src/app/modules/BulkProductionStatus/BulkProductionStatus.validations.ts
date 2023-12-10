import { z } from 'zod';

const createBulkProductionStatus = z.object({
  body: z
    .object({
      bulkProductionComment: z.string({
        required_error: 'Bulk Production Status Comment  is required',
        invalid_type_error: 'Bulk Production  Status Comment must be in String',
      }),
      styleNo: z.string({
        required_error: 'Style No is required',
        invalid_type_error: 'Style No must be in String',
      }),
    })
    .refine(data => {
      const keys = Object.keys(data);

      if (keys.length === 0) {
        throw new Error(
          'All Required Data must be provided in the request body'
        );
      }
      return true;
    }),
});

const updateBulkProductionStatus = z.object({
  body: z
    .object({
      bulkProductionComment: z
        .string({
          invalid_type_error:
            'Bulk Production  Status Comment must be in String',
        })
        .optional(),
      styleNo: z
        .string({
          invalid_type_error: 'Style No must be in String',
        })
        .optional(),
    })
    .refine(data => {
      const keys = Object.keys(data);

      if (keys.length === 0) {
        throw new Error(
          'At least one data must be provided in the request body'
        );
      }
      return true;
    }),
});

export const BulkProductionStatusValidation = {
  createBulkProductionStatus,
  updateBulkProductionStatus,
};
