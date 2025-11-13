"use client"

import { useState, useRef, useEffect } from "react"
import {
	Search,
	Mail,
	Bell,
	User,
	Menu,
	X,
	Settings,
	LogOut,
	Moon,
	Sun,
	Briefcase,
} from "lucide-react"

export default function FeedHeader() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const [profileOpen, setProfileOpen] = useState(false)
	const [theme, setTheme] = useState("dark")
	const profileMenuRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				profileMenuRef.current &&
				!profileMenuRef.current.contains(event.target as Node)
			) {
				setProfileOpen(false)
			}
		}

		if (profileOpen) {
			document.addEventListener("mousedown", handleClickOutside)
			return () => document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [profileOpen])

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
				{/* Left Section - Logo and Icons */}
				<div className="flex items-center gap-6 min-w-fit">
					<div className="flex items-center gap-2 font-bold text-xl text-white">
						<div className="w-8 h-8 bg-linear-to-br from-violet-500 to-violet-700 rounded-lg flex items-center justify-center text-white text-sm font-bold">
							D
						</div>
						<span className="hidden sm:inline">DevMatch</span>
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
						{/* Desktop Icons */}
						<div className="hidden md:flex items-center gap-4">
							<button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
								<Mail
									size={20}
									className="text-white/70 hover:text-white"
								/>
							</button>
						</div>

						<button className="p-2 hover:bg-white/10 rounded-lg transition-colors relative">
							<Bell
								size={20}
								className="text-white/70 hover:text-white"
							/>
							<span className="absolute top-1 right-1 w-2 h-2 bg-violet-500 rounded-full"></span>
						</button>

						<div
							ref={profileMenuRef}
							className="relative"
						>
							<button
								onClick={() => setProfileOpen(!profileOpen)}
								className="w-8 h-8 bg-linear-to-br from-violet-500 to-violet-700 rounded-full flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:ring-2 hover:ring-violet-400 transition-all"
							>
								JD
							</button>

							{profileOpen && (
								<div className="absolute right-0 mt-2 w-56 bg-black/95 border border-white/10 rounded-lg backdrop-blur-md shadow-xl">
									<div className="px-4 py-3 border-b border-white/10">
										<p className="text-white font-semibold text-sm">John Doe</p>
										<p className="text-white/50 text-xs mt-1">
											john.doe@example.com
										</p>
									</div>

									<div className="py-2">
										<button className="w-full px-4 py-2 flex items-center gap-3 text-white/70 hover:text-white hover:bg-white/5 transition-colors text-sm">
											<User size={16} />
											<span>Profile</span>
										</button>

										<button className="w-full px-4 py-2 flex items-center justify-between text-white/70 hover:text-white hover:bg-white/5 transition-colors text-sm group">
											<div className="flex items-center gap-3">
												<Briefcase size={16} />
												<span>Active Projects</span>
											</div>
											<span className="bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded text-xs font-semibold group-hover:bg-violet-500/30 transition-colors">
												5
											</span>
										</button>

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

										<button className="w-full px-4 py-2 flex items-center gap-3 text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-colors text-sm border-t border-white/10 mt-2">
											<LogOut size={16} />
											<span>Logout</span>
										</button>
									</div>
								</div>
							)}
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
