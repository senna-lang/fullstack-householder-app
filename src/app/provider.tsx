"use client"
import { ClerkProvider } from "@clerk/nextjs"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

interface AppProviderProps {
	children: React.ReactNode
}

const queryClient = new QueryClient()

const AppProvider = ({ children }: AppProviderProps) => {
	return (
		<ClerkProvider afterSignOutUrl="/sign-in">
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</ClerkProvider>
	)
}

export default AppProvider
