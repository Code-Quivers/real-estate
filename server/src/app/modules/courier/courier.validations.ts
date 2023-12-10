import { z } from 'zod';

//     courierName: data.courierName,
//     awbNo: data.awbNo,
//     courierDate: data.courierDate,
//     courierDetails: data.courierDetails,
//     courierWeight: data.courierWeight,
//     styleNo

const createCourier = z.object({
  body: z
    .object({
      courierName: z.string({
        required_error: 'Courier Name is required',
        invalid_type_error: 'Courier Name must be in String',
      }),
      awbNo: z.string({
        required_error: 'Awb No. is required',
        invalid_type_error: 'Awb No. must be in String',
      }),
      courierDate: z
        .string({
          required_error: 'Courier Date is required',
          invalid_type_error: 'Courier Date must be in Date String',
        })
        .optional(),
      courierDetails: z.string({
        required_error: 'Courier Details is required',
        invalid_type_error: 'Courier Details must be in String',
      }),
      courierWeight: z.string({
        required_error: 'Courier Weight is required',
        invalid_type_error: 'Courier Weight must be in String',
      }),
      styleNo: z.string({
        required_error: 'Style Number is required',
        invalid_type_error: 'Style Number must be in String',
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

const updateCourier = z.object({
  body: z
    .object({
      styleNo: z
        .string({
          invalid_type_error: 'Style No must be in String',
        })
        .optional(),
      courierName: z
        .string({
          invalid_type_error: 'Courier Name must be in String',
        })
        .optional(),
      awbNo: z
        .string({
          invalid_type_error: 'Awb No. must be in String',
        })
        .optional(),
      courierDate: z
        .string({
          invalid_type_error: 'Courier Date must be in Date String',
        })
        .optional(),
      courierDetails: z
        .string({
          invalid_type_error: 'Courier Details must be in String',
        })
        .optional(),
      courierWeight: z
        .string({
          invalid_type_error: 'Courier Weight must be in String',
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

export const CourierValidation = {
  createCourier,
  updateCourier,
};
