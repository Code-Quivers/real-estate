'use client';

import { Button, Input, PasswordInput } from '@mantine/core';

import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useCreateUserMutation } from '@/redux/features/authApi';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import { ICreateCategory } from '@/types';
import CategoryImageUpload from './CategoryImageUpload';
import { useAddCategoryMutation } from '@/redux/features/categoryApi';

const AddCategoryForm = () => {
    const [visible, { toggle }] = useDisclosure(false);

    const router = useRouter();

    const [addCategory, { data, isSuccess, isError, isLoading, error, reset }] = useAddCategoryMutation();

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset: formReset,
    } = useForm<ICreateCategory>();

    const handleAddCategory = async (newData: ICreateCategory) => {

        const formData = new FormData();

        if (newData?.categoryImg) {
            formData.append('file', newData?.categoryImg);
        }
        const obj = {
            categoryName: newData.categoryName,
        };

        const categoryData = JSON.stringify(obj);

        formData.append('data', categoryData);

        await addCategory({
            data: formData,
        });
    };

    useEffect(() => {
        if (isSuccess) {
            formReset();
            reset();
            router.push('/dashboard/category/list');
        }
    }, [formReset, isSuccess, reset, router]);

    return (
        <div className="mb-5">
            <form onSubmit={handleSubmit(handleAddCategory)}>
                <div className="mb-5 flex w-full flex-col items-center gap-10 ">
                    <div className="flex w-full  items-center">
                        <Controller
                            name="categoryName"
                            rules={{ required: 'Category Name is Required' }}
                            control={control}
                            render={({ field }) => (
                                <div className="rs-form-control-wrapper w-full">
                                    <Input.Wrapper label="Category Name" withAsterisk size="md" className="w-full">
                                        <Input type="text" autoComplete="false" autoSave="false" {...field} placeholder="Category Name..." />
                                    </Input.Wrapper>
                                </div>
                            )}
                        />
                    </div>
                    <div className="flex w-full">
                        <Controller
                            name="categoryImg"
                            // rules={{ required: 'Image is Required' }}
                            control={control}
                            render={({ field }) => (
                                <div className="rs-form-control-wrapper w-full">
                                    <CategoryImageUpload field={field as any} />
                                </div>
                            )}
                        />
                    </div>
                </div>

                <div>
                    <Button loading={isLoading} type="submit" className="btn btn-primary">
                        Add Category
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddCategoryForm;
