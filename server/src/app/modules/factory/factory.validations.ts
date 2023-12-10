import httpStatus from 'http-status';
import { z } from 'zod';
import ApiError from '../../../errors/ApiError';

const createFactory = z.object({
  body: z
    .object({
      factoryName: z.string({
        required_error: 'Factory Name is required',
        invalid_type_error: 'Factory Name must be in String',
      }),
      factoryAddress: z.string({
        required_error: 'Factory Address is required',
        invalid_type_error: 'Factory Address must be in String',
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

const updateFactory = z.object({
  body: z
    .object({
      factoryName: z
        .string({
          invalid_type_error: 'Factory Name must be in String',
        })
        .refine(value => {
          if (typeof value === 'string') {
            if (value.trim() === '') {
              throw new ApiError(
                httpStatus.BAD_REQUEST,
                'Factory Name must not be empty or contain only whitespace'
              );
            }
          }
          return true;
        })
        .optional(),
      factoryAddress: z
        .string({
          invalid_type_error: 'Factory Address must be in String',
        })
        .refine(value => {
          if (typeof value === 'string') {
            if (value.trim() === '') {
              throw new ApiError(
                httpStatus.BAD_REQUEST,
                'Factory Address must not be empty or contain only whitespace'
              );
            }
          }
          return true;
        })
        .optional(),
    })
    .refine(data => {
      if (data?.factoryName === '' || data?.factoryAddress === '') {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          'At least one data must be provided'
        );
      }
      const keys = Object.keys(data);
      if (keys.length === 0) {
        throw new Error('At least one must be provided');
      }
      return true;
    }),
});

export const FactoryValidation = {
  createFactory,
  updateFactory,
};
