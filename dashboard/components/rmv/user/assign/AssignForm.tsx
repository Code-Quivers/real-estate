'use client';

import { Button, Input, PasswordInput, Select, TagsInput } from '@mantine/core';

import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useCreateUserMutation } from '@/redux/features/authApi';
import { IAssignUserWithCategory, ICreateUser } from '@/types';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import { useCategoryAssignMutation, useGetCategoriesQuery } from '@/redux/features/categoryApi';
import { useGetUserQuery } from '@/redux/features/userApi';

const AssignForm = () => {
    const [visible, { toggle }] = useDisclosure(false);
    const [assignCategory, { isLoading, isSuccess, reset }] = useCategoryAssignMutation();

    const router = useRouter();

    const { data: allCategories } = useGetCategoriesQuery('');

    const { data: allUsers } = useGetUserQuery('');

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset: formReset,
    } = useForm<IAssignUserWithCategory>();

    const handleCategoryAssign = async (data: IAssignUserWithCategory) => {
        const categoriesFilter = allCategories?.data?.filter((category: any) => data.categoryId.includes(category.categoryName));

        const objData = {
            userId: data.userId,
            categoryIds: categoriesFilter?.map((category: any) => category.categoryId),
        };
        console.log('objData', objData);
        await assignCategory({ data: objData });
    };

    useEffect(() => {
        if (isSuccess) {
            formReset();
            reset();
            router.push('/dashboard/user/list');
        }
    }, [formReset, isSuccess, reset, router]);

    return (
        <div className="mb-5">
            <form onSubmit={handleSubmit(handleCategoryAssign)}>
                <div className="mb-5 flex w-full items-center gap-10 ">
                    <div className="flex w-full">
                        <Controller
                            name="userId"
                            rules={{ required: 'email is required' }}
                            control={control}
                            render={({ field }) => (
                                <div className="rs-form-control-wrapper w-full">
                                    <Select
                                        withAsterisk
                                        searchable={true}
                                        label="User List"
                                        placeholder="Select User"
                                        data={allUsers?.data?.data?.map((user: any) => {
                                            return {
                                                value: user.userId,
                                                label: `${user.profile?.firstName} ${user.profile?.lastName} - ${user.email}`,
                                            };
                                        })}
                                        variant="default"
                                        radius="sm"
                                        {...field}
                                        // onChange={(value: any) => {
                                        //     setSize(value);
                                        // }}
                                    />
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
                                    <TagsInput
                                        withAsterisk
                                        label="Category Name"
                                        placeholder="Select Category"
                                        data={allCategories?.data?.map((category: any) => category.categoryName)}
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

                <div>
                    <Button loading={isLoading} type="submit" className="btn btn-primary">
                        Assign Category
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AssignForm;
