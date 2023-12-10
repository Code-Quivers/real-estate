import { z } from 'zod';
import { isValidISOString } from '../../../shared/utils';

const createPPSubmission = z.object({
  body: z
    .object({
      styleNo: z.string({
        required_error: 'Style No is required',
        invalid_type_error: 'Style No must be in String',
      }),
      factorySubmissionDate: z
        .string({
          required_error: 'Factory submission Date is required',
          invalid_type_error:
            'Factory Submission Date must be a valid date string',
        })
        .refine(value => isValidISOString(value as string)),
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

const updatePPSubmission = z.object({
  body: z
    .object({
      styleNo: z.string({
        required_error: 'Style No is required',
        invalid_type_error: 'Style No must be in String',
      }),
      factorySubmittedDate: z
        .string({
          required_error: 'Factory submission Date is required',
          invalid_type_error:
            'Factory Submission Date must be a valid date string',
        })
        .refine(value => isValidISOString(value)),
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

export const PPSubmissionValidation = {
  createPPSubmission,
  updatePPSubmission,
};
