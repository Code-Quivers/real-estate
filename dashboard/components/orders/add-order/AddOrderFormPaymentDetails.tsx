import { Button, Checkbox, Menu, NumberInput, Popover, Select, TextInput } from '@mantine/core';
import { useState } from 'react';
import classes from '@/styles/checkbox-styles/checkbox-cursor-pointer.module.css';
import { IconCurrencyTaka } from '@tabler/icons-react';
import AdvancePayment from '../payment/AdvancePayment';
import AddDiscount from '../payment/AddDiscount';
const AddOrderFormPaymentDetails = ({ form }: any) => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="mt-5  rounded-xl border bg-white px-4 py-3">
      <div>
        <h3 className="text-lg font-semibold">Payment</h3>
      </div>
      {/* calculation */}
      <div className=" space-y-5 rounded-lg border p-2.5">
        {/* subtotal  */}
        <div className="grid  grid-cols-8 items-center ">
          <div className="col-span-5 grid grid-cols-6 items-center gap-5 ">
            <div className="col-span-3">
              <h4 className="">Subtotal</h4>
            </div>
            <div className="col-span-3">
              <h4 className="">500000 items</h4>
            </div>
          </div>
          <div className="col-span-3 text-end">
            <div className="w-full text-end">
              <h4 className="">৳{form.getValues().paymentInfo.subtotal}</h4>
            </div>
          </div>
        </div>
        {/* Add discount  */}
        <AddDiscount form={form} />
        {/* Add shipping or delivery  */}
        <div className="grid  grid-cols-8 items-center ">
          <div className="col-span-5 grid grid-cols-6 items-center gap-5 ">
            <div className="col-span-3">
              <h4>Delivery fee</h4>
            </div>
            <div className="col-span-3">
              <h4 className="">—</h4>
            </div>
          </div>
          <div className="col-span-3 text-end">
            <div className="w-full text-end">
              <h4 className="">$0</h4>
            </div>
          </div>
        </div>
        {/* AdvancePayment  */}
        <AdvancePayment form={form} />
        {/* Total  */}
        <div className="grid  grid-cols-8  items-center border-t pt-2 ">
          <div className="col-span-5 grid grid-cols-6 items-center gap-5 ">
            <div className="col-span-3">
              <h4 className="text-base font-semibold">Total</h4>
            </div>
          </div>
          <div className="col-span-3 text-end">
            <div className="w-full text-end">
              <h4 className="text-base font-semibold">$167.50</h4>
            </div>
          </div>
        </div>
        {/*  */}
      </div>
      {/*  */}
      <div>
        <div className="mt-5 rounded-lg border p-3">
          <Checkbox
            color="rgba(0, 0, 0, 1)"
            classNames={classes}
            radius="lg"
            label="Payment due later"
            checked={checked}
            onChange={(event) => setChecked(event.currentTarget.checked)}
            wrapperProps={{
              onClick: () => setChecked((c) => !c),
            }}
          />
        </div>
        {/* payment collection */}
        <div className="mt-5">
          <div className="flex items-center justify-end gap-4">
            <button type="button" className="rounded-md border border-[#ffff] bg-[#fff] px-3 py-0.5 font-semibold shadow-inner ring-1 ring-[#e7e7e7] hover:bg-[#e7e7e7]">
              Send Invoice
            </button>

            <Menu width={150} withArrow position="bottom-end" shadow="xl">
              <Menu.Target>
                <button type="button" className="rounded-md border border-[#ffffff3b] bg-[#3b3b3b] px-3 py-0.5 font-semibold text-white shadow-inner ring-1 ring-[#3a3a3a] hover:bg-[#303030]">
                  Collect payment
                </button>
              </Menu.Target>

              <Menu.Dropdown className="rounded-lg">
                <Menu.Item component="button" className="rounded-lg font-semibold text-[#323232] hover:bg-[#bcc1c54d] hover:text-black">
                  Enter credit card
                </Menu.Item>
                <Menu.Item component="button" className="rounded-lg font-semibold text-[#323232] hover:bg-[#bcc1c54d] hover:text-black">
                  Mark as paid
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOrderFormPaymentDetails;
