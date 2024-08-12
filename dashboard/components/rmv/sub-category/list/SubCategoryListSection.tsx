import Link from 'next/link';
import React from 'react';
import SubCategoryListTable from './SubCategoryListTable';

const SubCategoryListSection = () => {
    return (
        <div>
            <div>
                <ul className="flex space-x-2 rtl:space-x-reverse">
                    <li>
                        <Link href="/" className="text-primary hover:underline">
                            Dashboard
                        </Link>
                    </li>
                    <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                        <span>User</span>
                    </li>
                    <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                        <span>List</span>
                    </li>
                </ul>
            </div>
            <div className="my-5">
                <SubCategoryListTable />
            </div>
        </div>
    );
};

export default SubCategoryListSection;
