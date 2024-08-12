'use client';
import { NumberInput, Popover } from '@mantine/core';
import { useField } from '@mantine/form';
import { IconCurrencyTaka, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';

const AdvancePayment = ({ form }: any) => {
  const [opened, setOpened] = useState<boolean>(false);

  const advancedField = useField({
    initialValue: '',
    validate: (value) => (value ? null : 'Advance payment is required'),
  });

  const applyAdvancePayment = () => {
    advancedField.validate();
    const advancePayment = advancedField.getValue();
    if (advancePayment) {
      form.setFieldValue('paymentInfo.advancePayment', advancePayment);
      setOpened(!opened);
    }
  };

  return (
    <>
      <div className="grid  grid-cols-8 items-center ">
        <div className="col-span-5 grid grid-cols-6  gap-5 ">
          <div className="col-span-3">
            {opened ? (
              <NumberInput
                {...advancedField.getInputProps()}
                //   key={form.key('advancePayment')}
                //   {...form.getInputProps('advancePayment')}
                placeholder="0.00"
                size="xs"
                leftSection={<IconCurrencyTaka stroke={1.5} size={15} />}
                min={1}
              />
            ) : (
              <h4 onClick={() => setOpened(!opened)} className="cursor-pointer text-blue-600 hover:underline">
                Advance payment
              </h4>
            )}
          </div>
          <div className="col-span-3">
            {opened ? (
              <button
                onClick={applyAdvancePayment}
                type="button"
                className="rounded-md border border-[#ffff] bg-[#fff] px-4 py-1 text-sm font-semibold shadow-inner ring-1 ring-[#e7e7e7] hover:bg-[#e7e7e7]"
              >
                Done
              </button>
            ) : (
              <div className="flex items-center justify-between text-sm">
                <p>—</p>
              </div>
            )}
          </div>
        </div>
        <div className="col-span-3 flex justify-end">
          {opened ? (
            <IconTrash onClick={() => setOpened(!opened)} className="flex cursor-pointer justify-end text-[#a7a7a7] hover:text-red-600" size={18} />
          ) : (
            <div className="w-full text-end">
              <h4 className="">-৳{form.getValues().paymentInfo.advancePayment}</h4>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdvancePayment;
