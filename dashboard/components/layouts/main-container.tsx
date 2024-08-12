'use client';
import { RootState } from '@/redux/store';
import React from 'react';
import { useSelector } from 'react-redux';

const MainContainer = ({ children }: { children: React.ReactNode }) => {
    const themeConfig = useSelector((state: RootState) => state.themeConfig);
    return <div className={`${themeConfig.navbar} main-container min-h-screen text-black dark:text-white-dark`}> {children}</div>;
};

export default MainContainer;
