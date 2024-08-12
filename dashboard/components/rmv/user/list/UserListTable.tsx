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
import { singleCategoryType } from '@/types';

const UserTableList = () => {
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

    const { data: getAllUser } = useGetUserQuery({ ...query });

    console.log("getAllUser", getAllUser)

    const [userEdit, setUserEdit] = useState<any>({});

    const [deleteUser] = useDeleteUserMutation();

    const handleDeleteUser = async (userId: string) => {
        await deleteUser(userId);
    };

    return (
        <div>
            <div className="flex items-center justify-between gap-5">
                <div className="w-[400px]">
                    <Input variant="filled" radius="xl" placeholder="Search By Email" onChange={(e: any) => setSearchTerm(e.target.value)} />
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
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>

                            <th>Type</th>

                            <th>Assign Category</th>
                            <th>Status</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getAllUser?.data?.data?.map((user: any) => {
                            return (
                                <tr key={user.userId}>
                                    <td>
                                        <div className="whitespace-nowrap">{`${user?.profile?.firstName} ${user?.profile?.lastName}`}</div>
                                    </td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>{user.userType}</td>
                                    <td>
                                        {user?.userCategoryPermissions?.length > 0
                                            ? user?.userCategoryPermissions?.map((singleCategory: singleCategoryType) => singleCategory.categoryName).join(', ')
                                            : '-'}
                                    </td>

                                    <td>
                                        {user?.userCategoryPermissions?.length > 0
                                            ? user?.userCategoryPermissions?.map((singleCategory: singleCategoryType) => singleCategory.categoryName).join(', ')
                                            : '-'}
                                    </td>

                                    <td>
                                        <div
                                            className={`whitespace-nowrap ${
                                                user.userStatus === 'ACTIVE'
                                                    ? 'text-success'
                                                    : user.userStatus === 'PAUSED'
                                                    ? 'text-secondary'
                                                    : user.userStatus === 'SUSPENDED'
                                                    ? 'text-info'
                                                    : 'text-success'
                                            }`}
                                        >
                                            {user.userStatus}
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <Tippy content="Delete">
                                            <Button onClick={() => handleDeleteUser(user.userId)} type="button">
                                                <IconTrashLines className="m-auto" />
                                            </Button>
                                        </Tippy>
                                        <Tippy content="Edit">
                                            <Button
                                                onClick={() => {
                                                    setNoTransitionOpened(true);
                                                    setUserEdit(user);
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
                <UserEditModal noTransitionOpened={noTransitionOpened} setNoTransitionOpened={setNoTransitionOpened} userEdit={userEdit} />
            </div>
            <div className="flex items-center justify-center">
                <Pagination radius="lg" onChange={(limitChange) => setPage(limitChange)} total={getAllUser?.data?.meta?.totalPage} />
            </div>
        </div>
    );
};

export default UserTableList;
