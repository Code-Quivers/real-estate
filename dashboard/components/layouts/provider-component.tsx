'use client';
import App from '@/App';
import { Provider } from 'react-redux';
import React, { ReactNode, Suspense } from 'react';
import Loading from '@/components/layouts/loading';
import store from '@/redux/store';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';

interface IProps {
  children?: ReactNode;
}

const ProviderComponent = ({ children }: IProps) => {
  return (
    <Provider store={store}>
      <MantineProvider>
        <Suspense fallback={<Loading />}>
          <App>{children} </App>
        </Suspense>
      </MantineProvider>
    </Provider>
  );
};

export default ProviderComponent;
