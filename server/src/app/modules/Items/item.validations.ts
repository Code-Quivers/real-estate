import httpStatus from 'http-status';
import { z } from 'zod';
import ApiError from '../../../errors/ApiError';

const createItem = z.object({
  body: z
    .object({
      itemName: z.string({
        required_error: 'Item Name is required',
        invalid_type_error: 'Item Name must be in String',
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

const updateItem = z.object({
  body: z
    .object({
      itemName: z
        .string({
          invalid_type_error: 'Item Name must be in String',
        })
        .optional()
        .refine(value => {
          if (typeof value === 'string') {
            if (value.trim() === '') {
              throw new ApiError(
                httpStatus.BAD_REQUEST,
                'Item Name must not be empty or contain only whitespace'
              );
            }
          }
          return true;
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

export const ItemValidation = {
  createItem,
  updateItem,
};
