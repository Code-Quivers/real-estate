'use client';
import IconTrashLines from '@/components/icon/icon-trash-lines';
import IconEditLines from '@/components/icon/icon-edit';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import React, { useState } from 'react';
import { useDeleteUserMutation, useGetUserQuery } from '@/redux/features/userApi';
import { useRouter } from 'next/navigation';
import { useDebounced } from '@/redux/hook';
import UserEditModal from './UserEditModal';
import { Button, Input, Pagination, Select } from '@mantine/core';
import ProductEditModal from './ProductEditModal';
import { useDeleteSingleProductMutation, useGetProductsQuery } from '@/redux/features/productApi';
import Image from 'next/image';
import { fileUrlKey } from '@/helpers/envConfig';

const ProductListTable = () => {
    const [noTransitionOpened, setNoTransitionOpened] = useState(false);

    const query: Record<string, any> = {};
    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(5);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const router = useRouter();
    query['limit'] = size;
    query['page'] = page;
    const debouncedTerm = useDebounced({
        searchQuery: searchTerm,
        delay: 300,
    });

    if (!!debouncedTerm) {
        query['searchTerm'] = debouncedTerm;
    }

    const { data: getAllProducts } = useGetProductsQuery({ ...query });

    const [userEdit, setUserEdit] = useState<any>({});

    const [deleteProduct, { isLoading }] = useDeleteSingleProductMutation();

    const handleDeleteProduct = async (productId: string) => {
        await deleteProduct(productId);
    };

    return (
        <div>
            <div className="flex items-center justify-between gap-5">
                <div className="w-[400px]">
                    <Input variant="filled" radius="xl" placeholder="Search By Product Name" onChange={(e: any) => setSearchTerm(e.target.value)} />
                </div>
                <div>
                    <Select
                        label="Show"
                        placeholder="Pick value"
                        data={['5', '10', '20', '50', '100']}
                        defaultValue="5"
                        allowDeselect={false}
                        variant="filled"
                        radius="xl"
                        onChange={(value: any) => {
                            setSize(value);
                        }}
                    />
                </div>
            </div>
            <div className="table-responsive mb-5">
                <table>
                    <thead>
                        <tr>
                            <th>Product Image</th>
                            <th>Product Name</th>
                            <th>Product Price</th>
                            <th>Category Name</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getAllProducts?.data?.map((product: any) => {
                            return (
                                <tr key={product.productId}>
                                    <td>
                                        <Image src={`${fileUrlKey()}/${product?.productImage}`} alt="Product Image" className="h-20 w-20" width={200} height={200} />
                                    </td>
                                    <td>{product.productName}</td>
                                    <td>{product.productPrice}</td>
                                    <td>{product.subCategory?.subCategoryName}</td>
                                    <td className="text-center">
                                        <Tippy content="Delete">
                                            <Button onClick={() => handleDeleteProduct(product.productId)} type="button">
                                                <IconTrashLines className="m-auto" />
                                            </Button>
                                        </Tippy>
                                        <Tippy content="Edit">
                                            <Button
                                                onClick={() => {
                                                    setNoTransitionOpened(true);
                                                    // setUserEdit(user);
                                                }}
                                                variant="default"
                                                type="button"
                                            >
                                                <IconEditLines className="m-auto" />
                                            </Button>
                                        </Tippy>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div>
                <ProductEditModal noTransitionOpened={noTransitionOpened} setNoTransitionOpened={setNoTransitionOpened} userEdit={userEdit} />
            </div>
            <div className="flex items-center justify-center">
                <Pagination radius="lg" onChange={(limitChange: any) => setPage(limitChange)} total={getAllProducts?.data?.meta?.totalPage} />
            </div>
        </div>
    );
};

export default ProductListTable;
