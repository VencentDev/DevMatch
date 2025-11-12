"use client"

import { useState } from "react"
import { Search, Mail, Bell, User, Menu, X } from "lucide-react"

export default function FeedHeader() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	return (
		<header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
			<div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
				{/* Left Section - Logo and Icons */}
				<div className="flex items-center gap-6 min-w-fit">
					<div className="flex items-center gap-2 font-bold text-xl text-white">
						<div className="w-8 h-8 bg-linear-to-br from-violet-500 to-violet-700 rounded-lg flex items-center justify-center text-white text-sm font-bold">
							D
						</div>
						<span className="hidden sm:inline">DevMatch</span>
					</div>

					{/* Desktop Icons */}
					<div className="hidden md:flex items-center gap-4">
						<button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
							<Mail
								size={20}
								className="text-white/70 hover:text-white"
							/>
						</button>
					</div>
				</div>

				{/* Center Section - Search */}
				<div className="hidden sm:flex flex-1 max-w-md">
					<div className="relative w-full">
						<Search
							size={18}
							className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
						/>
						<input
							type="text"
							placeholder="Search projects..."
							className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white text-sm placeholder-white/40 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all"
						/>
					</div>
				</div>

				{/* Right Section - Icons and Profile */}
				<div className="flex items-center gap-3 md:gap-4">
					{/* Mobile Search */}
					<button className="sm:hidden p-2 hover:bg-white/10 rounded-lg transition-colors">
						<Search
							size={20}
							className="text-white/70"
						/>
					</button>

					{/* Desktop Icons */}
					<div className="hidden md:flex items-center gap-3">
						<button className="p-2 hover:bg-white/10 rounded-lg transition-colors relative">
							<Bell
								size={20}
								className="text-white/70 hover:text-white"
							/>
							<span className="absolute top-1 right-1 w-2 h-2 bg-violet-500 rounded-full"></span>
						</button>

						<div className="w-8 h-8 bg-linear-to-br from-violet-500 to-violet-700 rounded-full flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:ring-2 hover:ring-violet-400 transition-all">
							JD
						</div>
					</div>

					{/* Mobile Menu Button */}
					<button
						className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					>
						{mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
					</button>
				</div>
			</div>

			{/* Mobile Menu */}
			{mobileMenuOpen && (
				<div className="md:hidden border-t border-white/10 bg-black/95 p-4">
					<div className="flex flex-col gap-4">
						<button className="p-2 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-3 text-white/70 hover:text-white">
							<Bell size={20} />
							<span>Notifications</span>
						</button>
						<button className="p-2 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-3 text-white/70 hover:text-white">
							<User size={20} />
							<span>Profile</span>
						</button>
					</div>
				</div>
			)}
		</header>
	)
}
