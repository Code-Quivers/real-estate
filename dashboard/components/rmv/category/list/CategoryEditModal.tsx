import { useUpdateSingleCategoryMutation } from '@/redux/features/categoryApi';
import { IUpdateCategory } from '@/types';
import { Button, Input, Modal, PasswordInput, Select } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import CategoryImageUpload from '../add/CategoryImageUpload';
import { useRouter } from 'next/navigation';

const CategoryEditModal = ({ categoryEdit, noTransitionOpened, setNoTransitionOpened }: any) => {
    const router = useRouter();

    const [visible, { toggle }] = useDisclosure(false);
    const [updateCategory, { isLoading, isSuccess, reset }] = useUpdateSingleCategoryMutation();

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset: formReset,
    } = useForm<IUpdateCategory>();

    const handleEditCategory = async (data: IUpdateCategory) => {
        const formData = new FormData();
        if (data?.categoryImg) {
            console.log('data?.categoryImage', data?.categoryImg);
            formData.append('file', data?.categoryImg);
        }
        const objData = {
            categoryName: data.categoryName,
        };
        const categoryData = JSON.stringify(objData);

        formData.append('data', categoryData);

        console.log('formData', formData);

        await updateCategory({ categoryId: categoryEdit.categoryId, data: formData });
    };

    useEffect(() => {
        if (isSuccess) {
            formReset();
            reset();
            router.push('/dashboard/category/list');
        }
    }, [formReset, isSuccess, reset, router]);

    return (
        <Modal opened={noTransitionOpened} onClose={() => setNoTransitionOpened(false)} title="Edit Category:" transitionProps={{ transition: 'fade', duration: 300, timingFunction: 'linear' }}>
            <div className="mb-5">
                <form onSubmit={handleSubmit(handleEditCategory)}>
                    <div className="mb-5 flex w-full flex-col items-center gap-10 ">
                        <div className="flex w-full flex-col">
                            <Controller
                                name="categoryName"
                                control={control}
                                render={({ field }) => (
                                    <div className="rs-form-control-wrapper w-full">
                                        <Input.Wrapper label="Category Name" withAsterisk size="md" className="w-full">
                                            <Input defaultValue={categoryEdit.categoryName} type="text" autoComplete="false" autoSave="false" {...field} placeholder="Category Name" />
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
                            Edit Category
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default CategoryEditModal;
