import { ClerkProvider } from "@clerk/nextjs"

interface AppProviderProps {
	children: React.ReactNode
}

const AppProvider = ({ children }: AppProviderProps) => {
	return <ClerkProvider>{children}</ClerkProvider>
}

export default AppProvider
