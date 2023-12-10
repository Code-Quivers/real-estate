import { z } from 'zod';
import { isValidISOString } from '../../../shared/utils';

const createOrder = z.object({
  body: z
    .object({
      orderNo: z.string({
        required_error: 'Order No is required',
        invalid_type_error: 'Order No must be in String',
      }),
      styleNo: z.string({
        required_error: 'Style No is required',
        invalid_type_error: 'Style No must be in String',
      }),
      noOfPack: z
        .number({
          required_error: 'No Of Pack is Required',
          invalid_type_error: 'Number Of Pack must be in Integer',
        })
        .refine(
          value => {
            if (value === undefined) return true;
            return value >= 1 && value <= 20;
          },
          {
            message: 'Number Of Pack must be between 1 and 20',
          }
        ),
      totalPack: z.number({
        required_error: 'Total Pack is required',
        invalid_type_error: 'Total Pack must be in Integer',
      }),
      portId: z.string({
        required_error: 'Port ID is Required',
        invalid_type_error: 'Port ID must be in String',
      }),
      buyerEtd: z
        .string({
          required_error: 'Buyer Etd is required',
          invalid_type_error: 'Buyer ETD must be in Date String',
        })
        .refine(value => isValidISOString(value)),
      factoryEtd: z
        .string({
          required_error: 'Factory Etd is required',
          invalid_type_error: 'Factory ETD must be in Date String',
        })
        .refine(value => isValidISOString(value)),
      friDate: z
        .string({
          required_error: 'FRI Date is required',
          invalid_type_error: 'FRI Date must be in Date String',
        })
        .refine(value => isValidISOString(value)),
    })
    .refine(data => {
      const keys = Object.keys(data);
      if (keys.length === 0) {
        throw new Error('All Order field must be provided in the request body');
      }
      return true;
    }),
});

const updateOrder = z.object({
  body: z
    .object({
      orderNo: z
        .string({
          invalid_type_error: 'Order Number must be in String',
        })
        .optional(),
      styleNo: z
        .string({
          invalid_type_error: 'Style Number must be in String',
        })
        .optional(),
      noOfPack: z
        .number({
          invalid_type_error: 'Number Of Pack must be in Integer',
        })
        .optional()
        .refine(
          value => {
            if (value === undefined) return true;
            return value >= 1 && value <= 20;
          },
          {
            message: 'Number Of Pack must be between 1 and 20',
          }
        ),
      totalPack: z
        .number({
          invalid_type_error: 'Total Pack must be in Integer',
        })
        .optional(),
      portId: z
        .string({
          invalid_type_error: 'PortId must be in String',
        })
        .optional(),
      buyerEtd: z
        .string({
          invalid_type_error: 'Buyer ETD must be in String',
        })
        .refine(value => isValidISOString(value))
        .optional(),
      factoryEtd: z
        .string({
          invalid_type_error: 'Factory ETD must be in String',
        })
        .refine(value => isValidISOString(value))
        .optional(),
      friDate: z
        .string({
          required_error: 'FRI Date is required',
          invalid_type_error: 'FRI Date must be in Date String',
        })
        .refine(value => isValidISOString(value))
        .optional(),
    })
    .refine(data => {
      const keys = Object.keys(data);
      if (keys.length === 0) {
        throw new Error(
          'At least one field must be provided in the request body'
        );
      }
      return true;
    }),
});

export const OrdersValidation = {
  createOrder,
  updateOrder,
};
