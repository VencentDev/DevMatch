"use client"

import { useState, useRef, useEffect } from "react"
import {
	Search,
	Mail,
	Bell,
	User,
	Settings,
	LogOut,
	Moon,
	Sun,
	Briefcase,
} from "lucide-react"
import { logout } from "@/lib/api/logout"

export default function AccountHeader() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const [theme, setTheme] = useState("dark")
	const profileMenuRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				profileMenuRef.current &&
				!profileMenuRef.current.contains(event.target as Node)
			) {
				setMobileMenuOpen(false)
			}
		}

		if (mobileMenuOpen) {
			document.addEventListener("mousedown", handleClickOutside)
			return () => document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [mobileMenuOpen])

	const toggleTheme = () => {
		const newTheme = theme === "dark" ? "light" : "dark"
		setTheme(newTheme)
		if (newTheme === "dark") {
			document.documentElement.classList.add("dark")
		} else {
			document.documentElement.classList.remove("dark")
		}
	}

	return (
		<header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
			<div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
				{/* Left Section - Logo */}
				<div className="flex items-center gap-6 min-w-fit">
					<a href="/feed">
						<div className="flex items-center gap-2 font-bold text-xl text-white">
							<div className="w-8 h-8 bg-linear-to-br from-violet-500 to-violet-700 rounded-lg flex items-center justify-center text-white text-sm font-bold">
								DM
							</div>
							<span className="hidden sm:inline">DevMatch</span>
						</div>
					</a>
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

					{/* Notifications */}
					<button className="p-2 hover:bg-white/10 rounded-lg transition-colors relative">
						<Bell
							size={20}
							className="text-white/70 hover:text-white"
						/>
						<span className="absolute top-1 right-1 w-2 h-2 bg-violet-500 rounded-full"></span>
					</button>

					{/* Profile Picture (Toggle for Mobile Menu) */}
					<div
						ref={profileMenuRef}
						className="relative"
					>
						<button
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							className="w-8 h-8 bg-linear-to-br from-violet-500 to-violet-700 rounded-full flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:ring-2 hover:ring-violet-400 transition-all"
						>
							JD
						</button>

						{/* Mobile Menu */}
						{mobileMenuOpen && (
							<div className="absolute right-0 mt-2 w-56 bg-black/95 border border-white/10 rounded-lg backdrop-blur-md shadow-xl">
								<div className="px-4 py-3 border-b border-white/10">
									<p className="text-white font-semibold text-sm">John Doe</p>
									<p className="text-white/50 text-xs mt-1">
										john.doe@example.com
									</p>
								</div>

								<div className="py-2">
									<a href="/profile">
										<button className="w-full px-4 py-2 flex items-center gap-3 text-white/70 hover:text-white hover:bg-white/5 transition-colors text-sm">
											<User size={16} />
											<span>Profile</span>
										</button>
									</a>

									<a
										href="/active-projects"
										className="w-full px-4 py-2 flex items-center gap-3 text-white/70 hover:text-white hover:bg-white/5 transition-colors text-sm"
									>
										<Briefcase size={16} />
										<span>Active Projects</span>
										<span className="bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded text-xs font-semibold group-hover:bg-violet-500/30 transition-colors">
											5
										</span>
									</a>

									<a
										href="/proposals"
										className="w-full px-4 py-2 flex items-center gap-3 text-white/70 hover:text-white hover:bg-white/5 transition-colors text-sm"
									>
										<Mail size={16} />
										<span>Proposals</span>
									</a>

									<button className="w-full px-4 py-2 flex items-center gap-3 text-white/70 hover:text-white hover:bg-white/5 transition-colors text-sm">
										<Settings size={16} />
										<span>Settings</span>
									</button>

									<div className="px-4 py-2 border-t border-white/10 mt-2">
										<p className="text-white/50 text-xs font-semibold mb-2">
											Theme
										</p>
										<button
											onClick={toggleTheme}
											className="w-full flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/70 hover:text-white hover:bg-white/10 transition-colors text-sm"
										>
											{theme === "dark" ? (
												<Sun size={16} />
											) : (
												<Moon size={16} />
											)}
											<span>
												{theme === "dark" ? "Light Mode" : "Dark Mode"}
											</span>
										</button>
									</div>

									<button
										className="w-full px-4 py-2 flex items-center gap-3 text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-colors text-sm border-t border-white/10 mt-2"
										onClick={logout}
									>
										<LogOut size={16} />
										<span>Logout</span>
									</button>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	)
}
