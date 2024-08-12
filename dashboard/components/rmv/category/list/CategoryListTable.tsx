'use client';
import IconTrashLines from '@/components/icon/icon-trash-lines';
import IconEditLines from '@/components/icon/icon-edit';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import React, { useState } from 'react';
import { useDeleteUserMutation, useGetUserQuery } from '@/redux/features/userApi';
import { useRouter } from 'next/navigation';
import { useDebounced } from '@/redux/hook';
import { Button, Input, Pagination, Select } from '@mantine/core';
import CategoryEditModal from './CategoryEditModal';
import { useDeleteSingleCategoryMutation, useGetCategoriesQuery } from '@/redux/features/categoryApi';
import moment from 'moment';
import Image from 'next/image';
import { fileUrlKey } from '@/helpers/envConfig';

const CategoryListTable = () => {
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

    const { data: getAllCategories } = useGetCategoriesQuery({ ...query });

    const [categoryEdit, setCategoryEdit] = useState<any>({});

    const [deleteCategory] = useDeleteSingleCategoryMutation();

    const handleDeleteUser = async (categoryId: string) => {
        await deleteCategory(categoryId);
    };

    return (
        <div>
            <div className="flex items-center justify-between gap-5">
                <div className="w-[400px]">
                    <Input variant="filled" radius="xl" placeholder="Search By Category Name" onChange={(e: any) => setSearchTerm(e.target.value)} />
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
                            <th>Category Image</th>
                            <th>Category Name</th>
                            <th>Created</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getAllCategories?.data?.map((category: any) => {
                            return (
                                <tr key={category.categoryId}>
                                    <td>
                                        <Image src={`${fileUrlKey()}/${category?.categoryImg}`} alt="Category Image" className="h-20 w-20" width={200} height={200} />
                                    </td>
                                    <td>{category.categoryName}</td>
                                    <td>{moment(category.createdAt).format('YYYY-MM-DD')}</td>
                                    <td className="text-center">
                                        <Tippy content="Delete">
                                            <Button onClick={() => handleDeleteUser(category.categoryId)} type="button">
                                                <IconTrashLines className="m-auto" />
                                            </Button>
                                        </Tippy>
                                        <Tippy content="Edit">
                                            <Button
                                                onClick={() => {
                                                    setNoTransitionOpened(true);
                                                    setCategoryEdit(category);
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
                <CategoryEditModal noTransitionOpened={noTransitionOpened} setNoTransitionOpened={setNoTransitionOpened} categoryEdit={categoryEdit} />
            </div>
            <div className="flex items-center justify-center">
                <Pagination radius="lg" onChange={(limitChange: any) => setPage(limitChange)} total={getAllCategories?.meta?.totalPage} />
            </div>
        </div>
    );
};

export default CategoryListTable;
