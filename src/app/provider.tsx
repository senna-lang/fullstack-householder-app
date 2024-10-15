import { ClerkProvider } from "@clerk/nextjs"

interface AppProviderProps {
	children: React.ReactNode
}

const AppProvider = ({ children }: AppProviderProps) => {
	return <ClerkProvider afterSignOutUrl="/sign-in">{children}</ClerkProvider>
}

export default AppProvider
