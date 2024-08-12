'use client';

import { Button, Input, PasswordInput, Select } from '@mantine/core';

import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useCreateUserMutation } from '@/redux/features/authApi';
import { ICreateUser } from '@/types';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/navigation';

const UserForm = () => {
    const [visible, { toggle }] = useDisclosure(false);
    const [createUser, { isLoading, isSuccess, reset }] = useCreateUserMutation();

    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset: formReset,
    } = useForm<ICreateUser>();

    const handleCreateUser = async (data: any) => {
        const objData = {
            email: data.email,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
            role: 'USER',
            userType: data.userType,
        };
        await createUser({ data: objData });
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
            <form onSubmit={handleSubmit(handleCreateUser)}>
                <div className="mb-5 flex w-full items-center gap-10 ">
                    <div className="flex w-full">
                        <Controller
                            name="firstName"
                            rules={{ required: 'First Name is Required' }}
                            control={control}
                            render={({ field }) => (
                                <div className="rs-form-control-wrapper w-full">
                                    <Input.Wrapper label="First Name" withAsterisk size="md" className="w-full">
                                        <Input type="text" autoComplete="false" autoSave="false" {...field} placeholder="First Name" />
                                    </Input.Wrapper>
                                </div>
                            )}
                        />
                    </div>
                    <div className="flex w-full">
                        <Controller
                            name="lastName"
                            rules={{ required: 'Last Name is Required' }}
                            control={control}
                            render={({ field }) => (
                                <div className="rs-form-control-wrapper w-full">
                                    <Input.Wrapper label="Last Name" withAsterisk size="md" className="w-full">
                                        <Input type="text" autoComplete="false" autoSave="false" {...field} placeholder="Last Name" />
                                    </Input.Wrapper>
                                </div>
                            )}
                        />
                    </div>
                </div>
                <div className="mb-5 ">
                    <Controller
                        name="email"
                        rules={{ required: 'email is Required' }}
                        control={control}
                        render={({ field }) => (
                            <div className="rs-form-control-wrapper w-full">
                                <Input.Wrapper label="Email" withAsterisk size="md" className="w-full">
                                    <Input type="email" autoComplete="false" autoSave="false" {...field} placeholder="Email" />
                                </Input.Wrapper>
                            </div>
                        )}
                    />
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-10'>
                <div className="mb-5 ">
                    <Controller
                        name="password"
                        rules={{ required: 'password is Required' }}
                        control={control}
                        render={({ field }) => (
                            <div className="rs-form-control-wrapper w-full">
                                <Input.Wrapper label="Password" withAsterisk size="md" className="w-full">
                                    <PasswordInput visible={visible} onVisibilityChange={toggle} type="password" autoComplete="false" autoSave="false" {...field} placeholder="*********" />
                                </Input.Wrapper>
                            </div>
                        )}
                    />
                </div>
                <div className="mb-5 ">
                    <Controller
                        name="userType"
                        rules={{ required: 'User Type is Required' }}
                        control={control}
                        render={({ field }) => (
                            <div className="rs-form-control-wrapper w-full">
                               <Select
                                    label="User Type"
                                    {...field}
                                    placeholder="Select a User Type"
                                 data={['EVENT_PLANNERS', 'PRESS_ACCESS', 'EXTERNAL_USER']}
                                    searchable
                                />
                            </div>
                        )}
                    />
                </div>
            </div>

                <div>
                    <Button loading={isLoading} type="submit" className="btn btn-primary">
                        Add User
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default UserForm;
