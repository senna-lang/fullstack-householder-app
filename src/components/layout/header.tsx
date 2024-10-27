import { Bell, CreditCard, Home, PieChart, User } from "lucide-react"
import Link from "next/link"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

import { Button } from "../common/shadcn/button"

export default function Header() {
  return (
    <header className="flex items-center justify-between px-12 py-4 bg-background border-b">
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-2xl font-bold text-primary">
          Budget App
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard">
              <Home className="w-4 h-4 mr-2" />
              Dashboard
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/transactions">
              <CreditCard className="w-4 h-4 mr-2" />
              Transactions
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/reports">
              <PieChart className="w-4 h-4 mr-2" />
              Reports
            </Link>
          </Button>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Bell className="w-5 h-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <SignedIn>
          <Button variant="ghost" size="icon">
            <UserButton />
            <span className="sr-only">Profile</span>
          </Button>
        </SignedIn>
        <SignedOut>
          <Button variant="ghost" size="icon">
            <SignInButton />
            <span className="sr-only">Sign In</span>
          </Button>
        </SignedOut>
      </div>
    </header>
  )
}
