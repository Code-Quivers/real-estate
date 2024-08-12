import AddProduct from '@/components/Products/add-product/AddProduct';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add Product',
};

const ProductAddPage = () => {
  return (
    <div className="mx-auto max-w-7xl">
      <AddProduct />
      {/* <ProductAddSection/> */}
    </div>
  );
};

export default ProductAddPage;
