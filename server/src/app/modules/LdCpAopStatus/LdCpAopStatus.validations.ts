import { z } from 'zod';

const createLdCpAopStatus = z.object({
  body: z
    .object({
      ldCpAopStatusComment: z.string({
        required_error: 'ldCpAopStatusComment is required',
        invalid_type_error: 'ldCpAopStatusComment must be in String',
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

export const LdCpAopStatusValidation = {
  createLdCpAopStatus,
};
