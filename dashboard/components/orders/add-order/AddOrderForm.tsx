'use client';
import AddOrderFormPaymentDetails from './AddOrderFormPaymentDetails';
import SelectFromAllProductsModal from './SelectFromAllProductsModal';
import SelectedOrderList from './SelectedOrderList';
import AddNotesModal from './AddNotesModal';
import AddCustomer from './AddCustomer';
import { useForm } from '@mantine/form';
import { Select } from '@mantine/core';

const AddOrderForm = () => {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      paymentInfo: {
        advancePayment: 0,
        subtotal: 1000,
        discount: 0,
      },
    },
  });

  return (
    <section>
      {/* form */}
      <div>
        <form onSubmit={form.onSubmit((values) => console.log(values))} className="grid grid-cols-10 items-start gap-4">
          <div className="col-span-7 rounded-md ">
            {/*   products */}
            <div className="rounded-lg border bg-white shadow-sm">
              <div className="px-4">
                <div className="py-3">
                  <h1 className="font-semibold">Products</h1>
                </div>
                <div className="grid  grid-cols-10 items-center gap-2  ">
                  <div className="col-span-7 w-full">
                    <SelectFromAllProductsModal />
                  </div>
                  <div className="col-span-3 w-full  ">
                    <button type="button" className="w-full rounded-lg border  py-2 text-sm font-semibold transition-all   active:translate-y-[2px] active:shadow-inner active:shadow-black/50">
                      Browse Products
                    </button>
                  </div>
                </div>
              </div>
              {/* product list ---------- */}
              <div>
                <SelectedOrderList />
              </div>
            </div>

            {/*  Payment */}
            <div>
              <AddOrderFormPaymentDetails form={form} />
            </div>
          </div>
          {/* right side contents */}
          <div className="col-span-3 space-y-3">
            {/* order type */}
            <div className="rounded-lg border bg-white p-4 pt-2 shadow-sm">
              <div className="flex w-full">
                <Select className="w-full" label="Order Type" placeholder="Select order type" data={['Regular order', 'Pre order']} allowDeselect={false} />
              </div>
            </div>
            {/* customer */}
            <div className=" rounded-lg border  bg-white p-4 pt-2 shadow-sm">
              <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold">Customer information</h1>
              </div>
              <div>
                <AddCustomer />
              </div>
            </div>
            {/* notes */}
            <div className=" rounded-lg border  bg-white p-4 pt-2 shadow-sm">
              <div className="flex items-center justify-between">
                <h1 className="text-md font-semibold">Notes</h1>
                <AddNotesModal />
              </div>
              <div>
                <p className="text-[#5c5b5b]">No notes</p>
              </div>
            </div>
          </div>{' '}
        </form>
      </div>
      {/* time line */}
      <div className="mt-5 grid grid-cols-7">
        <div className="col-span-5">
          <h2 className="font-semibold">Timeline</h2>
          <div className="rounded-lg border bg-white p-3">list of timeline where notes, chats etc will shown</div>
        </div>
      </div>
    </section>
  );
};

export default AddOrderForm;
