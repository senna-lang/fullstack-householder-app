import { Bell, CreditCard, Home, PieChart, User } from "lucide-react"
import Link from "next/link"

import { Button } from "./ui/button"

export default function Header() {
	return (
		<header className="flex items-center justify-between px-12 py-4 bg-background border-b">
			<div className="flex items-center space-x-4">
				<Link href="/" className="text-2xl font-bold text-primary">
					家計簿アプリ
				</Link>
				<nav className="hidden md:flex space-x-4">
					<Button variant="ghost" size="sm" asChild>
						<Link href="/">
							<Home className="w-4 h-4 mr-2" />
							ダッシュボード
						</Link>
					</Button>
					<Button variant="ghost" size="sm" asChild>
						<Link href="/transactions">
							<CreditCard className="w-4 h-4 mr-2" />
							収支入力
						</Link>
					</Button>
					<Button variant="ghost" size="sm" asChild>
						<Link href="/reports">
							<PieChart className="w-4 h-4 mr-2" />
							レポート
						</Link>
					</Button>
				</nav>
			</div>
			<div className="flex items-center space-x-4">
				<Button variant="ghost" size="icon">
					<Bell className="w-5 h-5" />
					<span className="sr-only">通知</span>
				</Button>
				<Button variant="ghost" size="icon">
					<User className="w-5 h-5" />
					<span className="sr-only">プロフィール</span>
				</Button>
			</div>
		</header>
	)
}
