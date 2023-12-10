import { z } from 'zod';

const createPpStrikeOffStatus = z.object({
  body: z
    .object({
      ppStatusComment: z.string({
        required_error: 'PP Status Comment is required',
        invalid_type_error: 'PP Status Comment must be in String',
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

const updatePpStrikeOffStatus = z.object({
  body: z
    .object({
      ppStatusComment: z.string({
        required_error: 'PP Status Comment is required',
        invalid_type_error: 'PP Status Comment must be in String',
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
          'At least one data must be provided in the request body'
        );
      }
      return true;
    }),
});

export const ppStrikeOffStatusValidation = {
  createPpStrikeOffStatus,
  updatePpStrikeOffStatus,
};
