import httpStatus from 'http-status';
import { z } from 'zod';
import ApiError from '../../../errors/ApiError';

const createPort = z.object({
  body: z
    .object({
      portName: z.string({
        required_error: 'Port Name is required',
        invalid_type_error: 'Port Name must be in String',
      }),
      portAddress: z.string({
        required_error: 'Port Address is required',
        invalid_type_error: 'Port Address must be in String',
      }),
    })
    .refine(data => {
      const keys = Object.keys(data);

      if (keys.length === 0) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          'All Required Data must be provided in the request body'
        );
      }
      return true;
    }),
});

const updatePort = z.object({
  body: z
    .object({
      portName: z
        .string({
          invalid_type_error: 'Port Name must be in String',
        })
        .optional()
        .refine(value => {
          if (typeof value === 'string') {
            if (value.trim() === '') {
              throw new ApiError(
                httpStatus.BAD_REQUEST,
                'Port Name must not be empty or contain only whitespace'
              );
            }
          }
          return true;
        }),

      portAddress: z
        .string({
          invalid_type_error: 'Port Address must be in String',
        })
        .optional()
        .refine(value => {
          if (typeof value === 'string') {
            if (value.trim() === '') {
              throw new ApiError(
                httpStatus.BAD_REQUEST,
                'Port Address must not be empty or contain only whitespace'
              );
            }
          }
          return true;
        }),
    })
    .refine(data => {
      const keys = Object.keys(data);

      if (keys.length === 0) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          'At least one data must be provided in the request body'
        );
      }
      return true;
    }),
});

export const PortValidation = {
  createPort,
  updatePort,
};
