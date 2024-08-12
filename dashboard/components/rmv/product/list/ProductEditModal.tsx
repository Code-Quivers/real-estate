import { useUpdateUserMutation } from '@/redux/features/userApi';
import { IUpdateUser } from '@/types';
import { Button, Input, Modal, PasswordInput, Select } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

const ProductEditModal = ({ userEdit, noTransitionOpened, setNoTransitionOpened }: any) => {
    const [visible, { toggle }] = useDisclosure(false);
    const [updateUser, { isLoading, isSuccess, reset }] = useUpdateUserMutation();

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset: formReset,
    } = useForm<IUpdateUser>();

    const handleEditUser = async (data: any) => {
        const objData = {
            email: data.email,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
            role: data.role,
            userStatus: data.userStatus,
        };

        await updateUser({ id: userEdit.userId, payload: objData });
    };

    useEffect(() => {
        if (isSuccess) {
            formReset();
            reset();
        }
    }, [formReset, isSuccess, reset]);

    return (
        <Modal opened={noTransitionOpened} onClose={() => setNoTransitionOpened(false)} title="Edit User:" transitionProps={{ transition: 'fade', duration: 300, timingFunction: 'linear' }}>
            <div className="mb-5">
                <form onSubmit={handleSubmit(handleEditUser)}>
                    <div className="mb-5 flex w-full items-center gap-10 ">
                        <div className="flex w-full">
                            <Controller
                                name="firstName"
                                control={control}
                                render={({ field }) => (
                                    <div className="rs-form-control-wrapper w-full">
                                        <Input.Wrapper label="First Name" withAsterisk size="md" className="w-full">
                                            <Input defaultValue={userEdit.profile.firstName} type="text" autoComplete="false" autoSave="false" {...field} placeholder="First Name" />
                                        </Input.Wrapper>
                                    </div>
                                )}
                            />
                        </div>
                        <div className="flex w-full">
                            <Controller
                                name="lastName"
                                control={control}
                                render={({ field }) => (
                                    <div className="rs-form-control-wrapper w-full">
                                        <Input.Wrapper label="Last Name" withAsterisk size="md" className="w-full">
                                            <Input defaultValue={userEdit.profile.lastName} type="text" autoComplete="false" autoSave="false" {...field} placeholder="Last Name" />
                                        </Input.Wrapper>
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                    <div className="mb-5 ">
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <div className="rs-form-control-wrapper w-full">
                                    <Input.Wrapper label="Email" withAsterisk size="md" className="w-full">
                                        <Input defaultValue={userEdit.email} type="email" autoComplete="false" autoSave="false" {...field} placeholder="Email" />
                                    </Input.Wrapper>
                                </div>
                            )}
                        />
                    </div>
                    <div className="mb-5 ">
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <div className="rs-form-control-wrapper w-full">
                                    <Input.Wrapper label="Password" withAsterisk size="md" className="w-full">
                                        <PasswordInput
                                            defaultValue={userEdit.password}
                                            visible={visible}
                                            onVisibilityChange={toggle}
                                            type="password"
                                            autoComplete="false"
                                            autoSave="false"
                                            {...field}
                                            placeholder="*********"
                                        />
                                    </Input.Wrapper>
                                </div>
                            )}
                        />
                    </div>

                    <div className="mb-5 ">
                        <Controller
                            name="role"
                            control={control}
                            render={({ field }) => (
                                <div className="rs-form-control-wrapper w-full">
                                    <Select placeholder="Role" data={['USER', 'SUPER_ADMIN']} defaultValue={userEdit.role} allowDeselect={false} {...field} variant="filled" radius="xl" />
                                </div>
                            )}
                        />
                    </div>

                    <div className="mb-5 ">
                        <Controller
                            name="role"
                            control={control}
                            render={({ field }) => (
                                <div className="rs-form-control-wrapper w-full">
                                    <Select
                                        placeholder="User Status"
                                        data={['ACTIVE', 'PAUSED', 'SUSPENDED']}
                                        defaultValue={userEdit.userStatus}
                                        allowDeselect={false}
                                        {...field}
                                        variant="filled"
                                        radius="xl"
                                    />
                                </div>
                            )}
                        />
                    </div>

                    <div>
                        <Button loading={isLoading} type="submit" className="btn btn-primary">
                            Edit User
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default ProductEditModal;
