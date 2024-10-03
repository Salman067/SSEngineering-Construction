import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from './contexts/AuthContext'

import PageRoutes from './routes/routes'
import LoadingOverlay from './components/loader/loadingOverlay';
import Toastify from './components/shared/Toastify';
import { BlogProvider } from './contexts/BlogContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000 * 60 * 60 * 24,
      cacheTime: 1000 * 60 * 60 * 24,
    },
  },
});

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>

        <AuthProvider>
          <BlogProvider>
            <PageRoutes />
          </BlogProvider>
        </AuthProvider>

        <LoadingOverlay />

        <Toastify />

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}

export default App
