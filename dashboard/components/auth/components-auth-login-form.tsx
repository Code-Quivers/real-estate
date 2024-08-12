'use client';

import { isLoggedIn, storeUserInfo } from '@/helpers/hooks/auth.helper';
import { useDashboardLoginMutation } from '@/redux/features/authApi';
import { IDashboardLogin } from '@/types';
import { Button } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

const ComponentsAuthLoginForm = () => {
    // const toaster = useToaster();
    const router = useRouter();
    const [dashboardLogin, { isLoading, data, isError, isSuccess, error, reset }] = useDashboardLoginMutation();
    const userLoggedIn = isLoggedIn();

    console.log('userLoggedIn', userLoggedIn);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset: formReset,
    } = useForm<IDashboardLogin>();

    const handleLogin = async (loginData: any) => {
        const res: any = await dashboardLogin(loginData).unwrap();

        if (res?.data?.accessToken) {
            storeUserInfo({ accessToken: res?.data?.accessToken });
        }
    };

    useEffect(() => {
        if (userLoggedIn) {
            (router.back() as any) || router.push('/');
        }
    }, [router, userLoggedIn]);

    // useEffect(() => {
    //     if (userLoggedIn) {
    //         (router.back() as any) || router.push('/');
    //     }

    //     if (isSuccess && !isLoading && !isError && !error && data) {
    //         toaster.push(
    //             <Message bordered centered showIcon type="success" closable>
    //                 <h4 className="font-semibold xl:text-2xl"> Logged in success</h4>
    //             </Message>,
    //             { placement: 'topEnd', duration: 2000 }
    //         );
    //         formReset();
    //     }
    //     if (!isSuccess && !isLoading && isError && error) {
    //         toaster.push(
    //             <Message bordered showIcon type="error" closable>
    //                 <h4 className="font-semibold xl:text-2xl">
    //                     {
    //                         // @ts-ignore
    //                         error?.message ?? 'Login Failed. try again !'
    //                     }
    //                 </h4>
    //             </Message>,
    //             { placement: 'topEnd', duration: 2000 }
    //         );
    //         reset();
    //     }
    // }, [isSuccess, isLoading, isError, data, toaster, formReset, error, reset, userLoggedIn, router]);

    return (
        <form className="space-y-5 dark:text-white" onSubmit={handleSubmit(handleLogin)}>
            <div>
                <label htmlFor="Email">Email</label>
                <div className="relative text-white-dark">
                    <Controller
                        name="email"
                        rules={{ required: 'Email is Required' }}
                        control={control}
                        render={({ field }) => (
                            <div className="rs-form-control-wrapper">
                                <input autoComplete="false" autoSave="false" {...field} placeholder="Enter your email..." className="!w-full !py-3 " />
                            </div>
                        )}
                    />
                </div>
            </div>
            <div>
                <label htmlFor="Password">Password</label>
                <div className="relative text-white-dark">
                    <Controller
                        name="password"
                        rules={{ required: 'Password is Required' }}
                        control={control}
                        render={({ field }) => (
                            <div className="rs-form-control-wrapper">
                                <input type="password" autoComplete="false" autoSave="false" {...field} placeholder="*************" className="!w-full !py-3 " />
                            </div>
                        )}
                    />
                </div>
            </div>
            <Button loading={isLoading} loaderProps={{ type: 'dots' }} type="submit" className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                Sign in
            </Button>
        </form>
    );
};

export default ComponentsAuthLoginForm;
