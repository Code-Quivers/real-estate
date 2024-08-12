'use clicent';
import { Button, NumberInput, Popover, Select } from '@mantine/core';
import { useField } from '@mantine/form';
import { IconCurrencyTaka, IconPercentage, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';

const AddDiscount = ({ form }: any) => {
  const [discountOpen, setDiscountOpen] = useState<boolean>(false);

  const discountTypeField = useField({
    initialValue: '',
    validate: (value) => (value ? null : 'Discount type is required'),
  });

  const discountValueField = useField({
    initialValue: '',
    validate: (value) => (value ? null : 'Discount value is required'),
  });

  // console.log('Discount type:', discountValueField.getValue());
  const applyDiscount = () => {
    discountTypeField.validate();
    discountValueField.validate();
    if (discountTypeField.getValue() && discountValueField.getValue()) {
      const subtotal = form.getValues().paymentInfo.subtotal;
      console.log(typeof discountValueField.getValue());
      const discountValue = discountValueField.getValue() as any;
      console.log(discountValue, 'Discount value');
      const discount = discountTypeField.getValue() === 'Fixed amount' ? discountValue : (subtotal * discountValue) / 100;
      console.log('Discount:', discount);

      const afterDiscount = discountTypeField.getValue() === 'Fixed amount' ? subtotal - discount : subtotal - discount;
      form.setFieldValue('paymentInfo.discount', discount);
      console.log('Discount applied:', discountValueField.getValue());

      setDiscountOpen(!discountOpen);
    }
    // setDiscountOpen(false);
  };

  return (
    <>
      <div className="grid grid-cols-8 items-center ">
        <div className="col-span-5 grid grid-cols-6  gap-5 ">
          {discountOpen ? (
            <Select
              {...discountTypeField.getInputProps()}
              className="col-span-3 w-40"
              data={['Fixed amount', 'Percentage']}
              placeholder="Select discount type"
              size="xs"
              comboboxProps={{ withinPortal: false }}
              allowDeselect={false}
            />
          ) : (
            <h4 className="col-span-3 cursor-pointer text-blue-600 hover:underline" onClick={() => setDiscountOpen(!discountOpen)}>
              Discount
            </h4>
          )}
          {discountOpen ? (
            <NumberInput
              {...discountValueField.getInputProps()}
              className="col-span-3"
              leftSection={
                discountTypeField.getValue() === 'Fixed amount' ? (
                  <IconCurrencyTaka stroke={1.5} size={15} />
                ) : discountTypeField.getValue() === 'Percentage' ? (
                  <IconPercentage stroke={1.5} size={15} />
                ) : null
              }
              placeholder="0.00"
              size="xs"
            />
          ) : (
            <div className="col-span-3">
              <h4 className="">—</h4>
            </div>
          )}
        </div>
        {discountOpen ? (
          <div className="col-span-3 ml-4 flex justify-between">
            <button onClick={applyDiscount} type="button" className="rounded-md border border-[#ffff] bg-[#fff] px-4 py-1 text-sm font-semibold shadow-inner ring-1 ring-[#e7e7e7] hover:bg-[#e7e7e7]">
              Apply
            </button>
            <IconTrash onClick={() => setDiscountOpen(!discountOpen)} className="cursor-pointer text-end text-[#a7a7a7] hover:text-red-600" size={18} />
          </div>
        ) : (
          <div className="col-span-3 w-full text-end">
            <h4 className="">-৳{form.getValues().paymentInfo.discount}</h4>
          </div>
        )}
      </div>
    </>
  );
};

export default AddDiscount;
