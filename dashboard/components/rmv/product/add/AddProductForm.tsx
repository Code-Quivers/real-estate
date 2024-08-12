'use client';

import { Button, Input, Select } from '@mantine/core';

import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useCreateUserMutation } from '@/redux/features/authApi';
import { ICreateProduct, ICreateUser } from '@/types';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import CategoryImageUpload from '../../category/add/CategoryImageUpload';
import { useGetCategoriesQuery } from '@/redux/features/categoryApi';
import { useAddProductMutation } from '@/redux/features/productApi';
import { useGetSubCategoriesQuery } from '@/redux/features/subCategoryApi';

const AddProductForm = () => {
    const [visible, { toggle }] = useDisclosure(false);

    //Category Fetch

    const { data: allSubCategories } = useGetSubCategoriesQuery('');

    const [createProduct, { isLoading, isSuccess, reset }] = useAddProductMutation();

    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset: formReset,
    } = useForm<ICreateProduct>();

    const handleCreateProduct = async (data: any) => {
        const formData = new FormData();

        if (data?.productImage) {
            formData.append('file', data?.productImage);
        }

        const objData = {
            productName: data.productName,
            productPrice: Number(data.productPrice),
            subCategoryId: data.subCategoryId,
        };

        const productData = JSON.stringify(objData);

        formData.append('data', productData);

        await createProduct({ data: formData });
    };

    useEffect(() => {
        if (isSuccess) {
            formReset();
            reset();
            router.push('/dashboard/product/list');
        }
    }, [formReset, isSuccess, reset, router]);

    return (
        <div className="mb-5">
            <form onSubmit={handleSubmit(handleCreateProduct)}>
                <div className="grid grid-cols-1 items-center justify-center gap-3 lg:grid-cols-2">
                    <div className="mb-5 grid grid-cols-1 items-center justify-center gap-10 ">
                        <div className="w-full ">
                            <Controller
                                name="productName"
                                rules={{ required: 'Product Name is Required' }}
                                control={control}
                                render={({ field }) => (
                                    <div className="rs-form-control-wrapper w-full">
                                        <Input.Wrapper label="Product Name" withAsterisk size="md" className="w-full">
                                            <Input type="text" autoComplete="false" autoSave="false" {...field} placeholder="Product Name" />
                                        </Input.Wrapper>
                                    </div>
                                )}
                            />
                        </div>
                        <div className="w-full">
                            <Controller
                                name="productPrice"
                                rules={{ required: 'Price is Required' }}
                                control={control}
                                render={({ field }) => (
                                    <div className="rs-form-control-wrapper w-full">
                                        <Input.Wrapper label="Product Price" withAsterisk size="md" className="w-full">
                                            <Input type="number" autoComplete="false" autoSave="false" {...field} placeholder="Product Price" />
                                        </Input.Wrapper>
                                    </div>
                                )}
                            />
                        </div>

                        <div className="flex w-full  items-center">
                            <Controller
                                name="subCategoryId"
                                rules={{ required: 'Category Name is Required' }}
                                control={control}
                                render={({ field }) => (
                                    <div className="rs-form-control-wrapper w-full">
                                        <Select
                                            withAsterisk
                                            label="Category Name"
                                            placeholder="Select Category"
                                            data={allSubCategories?.data?.map((subCategory: any) => {
                                                return {
                                                    value: subCategory.subCategoryId,
                                                    label: subCategory.subCategoryName,
                                                };
                                            })}
                                            {...field}
                                            variant="default"
                                            radius="sm"
                                            // onChange={(value: any) => {
                                            //     setSize(value);
                                            // }}
                                        />
                                    </div>
                                )}
                            />
                        </div>
                    </div>

                    <div className=" flex items-center justify-center gap-10 ">
                        <div className="flex w-full">
                            <Controller
                                name="productImage"
                                rules={{ required: 'Product Image is Required' }}
                                control={control}
                                render={({ field }) => (
                                    <div className="rs-form-control-wrapper w-full">
                                        <CategoryImageUpload field={field as any} />
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <Button loading={isLoading} loaderProps={{ type: 'dots' }} type="submit" className="btn btn-primary">
                        Add Product
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddProductForm;
