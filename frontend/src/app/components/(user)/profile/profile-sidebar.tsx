"use client"

import { useState } from "react"
import { User, Award, Wallet, Settings, FileText} from 'lucide-react'

export default function ProfileSidebar() {
	const [activeTab, setActiveTab] = useState("profile")

	const navItems = [
		{ id: "profile", label: "Profile", icon: User },
		{ id: "projects", label: "Projects Done", icon: FileText },
		{ id: "awards", label: "Achievements", icon: Award },
		{ id: "wallet", label: "Wallet", icon: Wallet },
		{ id: "settings", label: "Settings", icon: Settings },
	]

	return (
		<div className="fixed left-0 top-20 w-64 h-[calc(100vh-80px)] px-6 py-8 overflow-y-auto">
			<div className="sticky md:sticky bg-violet-500/20 backdrop-blur-xl border border-violet-500/20 rounded-sm p-6 space-y-6">
				{/* User Info Card */}
				<div className="pb-6 border-b border-white/10">
					<div className="w-12 h-12 bg-linear-to-br from-violet-500 to-violet-700 rounded-full flex items-center justify-center text-white font-bold mb-3">
						JD
					</div>
					<h3 className="font-semibold text-white">John Doe</h3>
					<p className="text-sm text-white/60">Senior Developer</p>
				</div>

				{/* Navigation */}
				<nav className="space-y-1">
					{navItems.map((item) => {
						const Icon = item.icon
						const isActive = activeTab === item.id

						return (
							<button
								key={item.id}
								onClick={() => setActiveTab(item.id)}
								className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm transition-all ${
									isActive
										? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
										: "text-white/60 hover:bg-white/5"
								}`}
							>
								<Icon size={18} />
								<span className="text-sm font-medium">{item.label}</span>
							</button>
						)
					})}
				</nav>
			</div>
		</div>
	)
}
