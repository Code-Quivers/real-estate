import { useGetCategoriesQuery } from '@/redux/features/categoryApi';
import { useUpdateSingleSubCategoryMutation } from '@/redux/features/subCategoryApi';
import { useUpdateUserMutation } from '@/redux/features/userApi';
import { IUpdateSubCategory, IUpdateUser } from '@/types';
import { Button, Input, Modal, PasswordInput, Select } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import CategoryImageUpload from '../../category/add/CategoryImageUpload';

const SubCategoryEditModal = ({ categoryEdit, noTransitionOpened, setNoTransitionOpened }: any) => {
    const router = useRouter();

    const [visible, { toggle }] = useDisclosure(false);
    const [updateSubCategory, { isLoading, isSuccess, reset }] = useUpdateSingleSubCategoryMutation();

    const { data: allCategories } = useGetCategoriesQuery('');

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset: formReset,
    } = useForm<IUpdateSubCategory>();

    const handleEditSubCategory = async (data: IUpdateSubCategory) => {
        const formData = new FormData();
        if (data?.subCategoryImg) {
            formData.append('file', data?.subCategoryImg);
        }
        const objData = {
            subCategoryName: data.subCategoryName,
            categoryId: data.categoryId,
        };

        const subCategoryData = JSON.stringify(objData);

        formData.append('data', subCategoryData);

        await updateSubCategory({ id: categoryEdit.subCategoryId, data: formData });
    };

    useEffect(() => {
        if (isSuccess) {
            setNoTransitionOpened(false);
            formReset();
            reset();
            router.push('/dashboard/sub-category/list');
        }
    }, [formReset, isSuccess, reset, router, setNoTransitionOpened]);

    return (
        <Modal opened={noTransitionOpened} onClose={() => setNoTransitionOpened(false)} title="Edit User:" transitionProps={{ transition: 'fade', duration: 300, timingFunction: 'linear' }}>
            <div className="mb-5">
                <form onSubmit={handleSubmit(handleEditSubCategory)}>
                    <div className="mb-5 flex w-full items-center gap-10 ">
                        <div className="flex w-full">
                            <Controller
                                name="subCategoryName"
                                control={control}
                                render={({ field }) => (
                                    <div className="rs-form-control-wrapper w-full">
                                        <Input.Wrapper label="First Name" size="md" className="w-full">
                                            <Input defaultValue={categoryEdit.subCategoryName} type="text" autoComplete="false" autoSave="false" {...field} placeholder="First Name" />
                                        </Input.Wrapper>
                                    </div>
                                )}
                            />
                        </div>
                        <div className="flex w-full  items-center">
                            <Controller
                                name="categoryId"
                                control={control}
                                render={({ field }) => (
                                    <div className="rs-form-control-wrapper w-full">
                                        <Select
                                            label="Category Name"
                                            placeholder="Select Category"
                                            data={allCategories?.data?.map((category: any) => {
                                                return { value: category.categoryId, label: category.categoryName };
                                            })}
                                            defaultValue={categoryEdit.categoryId}
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
                    <div className="my-5 flex w-full">
                        <Controller
                            name="subCategoryImg"
                            control={control}
                            render={({ field }) => (
                                <div className="rs-form-control-wrapper w-full">
                                    <CategoryImageUpload field={field as any} />
                                </div>
                            )}
                        />
                    </div>
                    <div>
                        <Button loading={isLoading} type="submit" className="btn btn-primary">
                            Edit Sub Category
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default SubCategoryEditModal;
