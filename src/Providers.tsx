import { FC, ReactNode } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './lib/router';
import { ThemeProvider } from './lib/context/ThemeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

interface ProvidersProps {

}

const queryClient = new QueryClient()

const Providers: FC<ProvidersProps> = () => {
    return (
        <ThemeProvider>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </ThemeProvider>
    )
}

export default Providers