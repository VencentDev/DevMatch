"use client"

import { useState } from "react"
import { User, Award, Wallet, Settings, FileText, LogOut } from 'lucide-react'

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
		<div className="fixed left-0 top-20 w-64 h-[calc(100vh-80px)] bg-black/40 border-r border-violet-500/20 px-6 py-8 overflow-y-auto">
			{/* User Info Card */}
			<div className="mb-8 pb-6 border-b border-violet-500/20">
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
							className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
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

			{/* Logout Button */}
			<div className="absolute bottom-6 left-6 right-6">
				<button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400/70 hover:bg-red-500/10 hover:text-red-400 transition-all font-medium text-sm border border-red-500/20">
					<LogOut size={18} />
					<span>Logout</span>
				</button>
			</div>
		</div>
	)
}
