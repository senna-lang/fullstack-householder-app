import { SignIn } from "@clerk/nextjs"
import Image from "next/image"

export default function SignInPage() {
	return (
		<div className="flex min-h-screen">
			{/* Left section with image */}
			<div className="hidden lg:flex lg:w-2/5 relative">
				<Image
					src="/images/bridger-tower-VEjBbVtDgCM-unsplash.jpg"
					width={1280}
					height={300}
					alt=""
					priority
					className=" absolute left-0 top-0 h-full w-full object-cover"
				/>
				<div className="absolute inset-0 bg-blue-500 bg-opacity-20" />
				<div className="absolute inset-0 flex items-center justify-center">
					<h1 className="text-4xl font-bold text-white text-center">
						Welcome to Householder App
					</h1>
				</div>
			</div>

			{/* Right section with login form */}
			<div className="w-full lg:w-3/5 flex items-center justify-center bg-gray-100 p-8">
				<SignIn
					path="/sign-in"
					routing="path"
					signUpUrl="/sign-up"
					appearance={{
						elements: {
							card: "bg-white shadow-xl rounded-lg p-8 w-full max-w-md",
							headerTitle: "text-2xl font-bold text-center text-gray-800 mb-2",
							headerSubtitle: "text-center text-gray-600 mb-6",
							formButtonPrimary: "bg-blue-500 hover:bg-blue-600 text-white",
							socialButtonsBlockButton:
								"border-2 border-gray-300 hover:bg-gray-100",
							formFieldLabel: "text-gray-700",
							formFieldInput:
								"border-gray-300 focus:ring-blue-500 focus:border-blue-500",
							footerActionLink: "text-blue-600 hover:text-blue-800",
							identityPreviewEditButton: "text-blue-600 hover:text-blue-800",
						},
						layout: {
							socialButtonsPlacement: "bottom",
							privacyPageUrl: "https://clerk.dev/privacy",
							termsPageUrl: "https://clerk.dev/terms",
						},
					}}
				/>
			</div>
		</div>
	)
}
