'use client';

import { Button, Input, PasswordInput, Select } from '@mantine/core';

import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useCreateUserMutation } from '@/redux/features/authApi';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import { ICreateSubCategory } from '@/types';
import { useAddCategoryMutation, useGetCategoriesQuery } from '@/redux/features/categoryApi';
import SubCategoryImageUpload from './SubCategoryImageUpload';
import { useAddSubCategoryMutation } from '@/redux/features/subCategoryApi';

const SubCategoryAddForm = () => {
    const [visible, { toggle }] = useDisclosure(false);

    const router = useRouter();

    const { data: allCategories } = useGetCategoriesQuery('');

    const [addSubCategory, { data, isSuccess, isError, isLoading, error, reset }] = useAddSubCategoryMutation();

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset: formReset,
    } = useForm<ICreateSubCategory>();

    const handleAddSubCategory = async (newData: ICreateSubCategory) => {
        const formData = new FormData();

        if (newData?.subCategoryImg) {
            formData.append('file', newData?.subCategoryImg);
        }
        const obj = {
            subCategoryName: newData.subCategoryName,
            categoryId: newData.categoryId,
        };

        const categoryData = JSON.stringify(obj);

        formData.append('data', categoryData);

        console.log('formData', formData);

        await addSubCategory({
            data: formData,
        });
    };

    useEffect(() => {
        if (isSuccess) {
            formReset();
            reset();
            router.push('/dashboard/sub-category/list');
        }
    }, [formReset, isSuccess, reset, router]);

    return (
        <div className="mb-5">
            <form onSubmit={handleSubmit(handleAddSubCategory)}>
                <div className="mb-5 flex w-full flex-col items-center gap-10 ">
                    <div className="flex w-full items-center gap-5">
                        <div className="flex w-full  items-center">
                            <Controller
                                name="subCategoryName"
                                rules={{ required: 'Sub Category Name is Required' }}
                                control={control}
                                render={({ field }) => (
                                    <div className="rs-form-control-wrapper w-full">
                                        <Input.Wrapper label="Sub Category Name" withAsterisk size="md" className="w-full">
                                            <Input type="text" autoComplete="false" autoSave="false" {...field} placeholder="Sub Category Name..." />
                                        </Input.Wrapper>
                                    </div>
                                )}
                            />
                        </div>
                        <div className="flex w-full  items-center">
                            <Controller
                                name="categoryId"
                                rules={{ required: 'Category Name is Required' }}
                                control={control}
                                render={({ field }) => (
                                    <div className="rs-form-control-wrapper w-full">
                                        <Select
                                            withAsterisk
                                            label="Category Name"
                                            placeholder="Select Category"
                                            data={allCategories?.data?.map((category: any) => {
                                                return { value: category.categoryId, label: category.categoryName };
                                            })}
                                            allowDeselect={true}
                                            variant="default"
                                            radius="sm"
                                            {...field}
                                        />
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                    <div className="flex w-full">
                        <Controller
                            name="subCategoryImg"
                            // rules={{ required: 'Image is Required' }}
                            control={control}
                            render={({ field }) => (
                                <div className="rs-form-control-wrapper w-full">
                                    <SubCategoryImageUpload field={field as any} />
                                </div>
                            )}
                        />
                    </div>
                </div>

                <div>
                    <Button loading={isLoading} type="submit" className="btn btn-primary">

                        Add Sub Category

                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SubCategoryAddForm;
