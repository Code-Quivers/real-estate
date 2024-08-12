import AddOrderForm from '@/components/orders/add-order/AddOrderForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add Order | Orders',
};
const AddOrderPage = () => {
  return (
    <div className="mx-auto max-w-7xl">
      <AddOrderForm />
    </div>
  );
};

export default AddOrderPage;
