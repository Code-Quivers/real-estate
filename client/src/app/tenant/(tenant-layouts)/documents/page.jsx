import PrimaryButtonForTenant from '@/components/tenant/PrimaryButtonForTenant';
import TenantDocuments from '@/components/tenant/TenantDocuments/TenantDocuments';
import React from 'react';
import { Uploader } from 'rsuite';

const page = () => {
    return (
        <div>
            <div className='text-center'>
                <h2 className='text-2xl mb-3'>Document</h2>
                <Uploader listType="picture-text" action="//jsonplaceholder.typicode.com/posts/">
                <PrimaryButtonForTenant title="Upload Document"/>
                </Uploader>
            </div>
            <TenantDocuments/>
        </div>
    );
};

export default page;