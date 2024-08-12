'use client';
import { RootState } from '@/redux/store';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ContentAnimation = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const themeConfig = useSelector((state: RootState) => state.themeConfig);
    const [animation, setAnimation] = useState(themeConfig.animation);

    useEffect(() => {
        setAnimation(themeConfig.animation);
    }, [themeConfig.animation]);

    useEffect(() => {
        setAnimation(themeConfig.animation);
        setTimeout(() => {
            setAnimation('');
        }, 1100);
    }, [pathname, themeConfig.animation]);
    return (
        <>
            {/* BEGIN CONTENT AREA */}
            <div className={`${animation} animate__animated p-6`}>{children}</div>
            {/* END CONTENT AREA */}
        </>
    );
};

export default ContentAnimation;
