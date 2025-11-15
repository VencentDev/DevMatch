"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, User } from "lucide-react"

export default function Header(): React.ReactElement {
	const [isDevMatchOpen, setIsDevMatchOpen] = useState<boolean>(false)
	const [isAccountOpen, setIsAccountOpen] = useState<boolean>(false)
	const [hoveredDevMatchSection, setHoveredDevMatchSection] = useState<
		string | null
	>(null)
	const [hoveredAccountSection, setHoveredAccountSection] = useState<
		string | null
	>(null)

	const handleDevMatchMouseEnter = (): void => setIsDevMatchOpen(true)
	const handleDevMatchMouseLeave = (): void => setIsDevMatchOpen(false)

	const handleAccountMouseEnter = (): void => setIsAccountOpen(true)
	const handleAccountMouseLeave = (): void => setIsAccountOpen(false)

	return (
		<>
			{/* Floating Header */}
			<header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-2xl">
				<div className="bg-violet-500/10  backdrop-blur-md border border-violet-500/20 rounded-2xl px-8 py-3 flex items-center justify-between">
					{/* Logo */}
					<div className="text-2xl font-bold bg-linear-to-r from-violet-400 to-violet-600 bg-clip-text text-transparent">
						DevMatch
					</div>

					{/* Center Navigation */}
					<div className="flex items-center gap-8">
						{/* What is DevMatch Dropdown */}
						<div
							className="relative"
							onMouseEnter={handleDevMatchMouseEnter}
							onMouseLeave={handleDevMatchMouseLeave}
						>
							<button
								onClick={() => setIsDevMatchOpen(!isDevMatchOpen)}
								className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium"
							>
								What is DevMatch?
								<ChevronDown
									size={16}
									className={`transition-transform ${
										isDevMatchOpen ? "rotate-180" : ""
									}`}
								/>
							</button>

							{/* Dropdown Menu */}
							{isDevMatchOpen && (
								<div className="absolute top-full mt-0 left-1/2 -translate-x-1/2 w-80 pt-2">
									<div className="bg-black/95 backdrop-blur-md border border-violet-500/20 rounded-xl p-6 space-y-6">
										{/* Description */}
										<div
											className="space-y-2 relative pl-4 cursor-pointer transition-all duration-200"
											onMouseEnter={() =>
												setHoveredDevMatchSection("description")
											}
											onMouseLeave={() => setHoveredDevMatchSection(null)}
										>
											<div
												className={`absolute left-0 top-0 bottom-0 w-1 bg-violet-400 rounded-full transition-all duration-300 ${
													hoveredDevMatchSection === "description"
														? "scale-y-100 opacity-100"
														: "scale-y-0 opacity-0"
												}`}
											/>
											<h3 className="text-white font-semibold text-sm">
												Description
											</h3>
											<p className="text-white/80 text-xs leading-relaxed">
												DevMatch connects developers with opportunities that
												match their skills, experience, and career goals.
											</p>
										</div>

										{/* Why DevMatch */}
										<div
											className="space-y-2 relative pl-4 cursor-pointer transition-all duration-200"
											onMouseEnter={() => setHoveredDevMatchSection("why")}
											onMouseLeave={() => setHoveredDevMatchSection(null)}
										>
											<div
												className={`absolute left-0 top-0 bottom-0 w-1 bg-violet-400 rounded-full transition-all duration-300 ${
													hoveredDevMatchSection === "why"
														? "scale-y-100 opacity-100"
														: "scale-y-0 opacity-0"
												}`}
											/>
											<h3 className="text-white font-semibold text-sm">
												Why DevMatch?
											</h3>
											<p className="text-white/80 text-xs leading-relaxed">
												We use intelligent matching algorithms to find the
												perfect fit for your next role or project.
											</p>
										</div>

										{/* How to Use */}
										<div
											className="space-y-2 relative pl-4 cursor-pointer transition-all duration-200"
											onMouseEnter={() => setHoveredDevMatchSection("how")}
											onMouseLeave={() => setHoveredDevMatchSection(null)}
										>
											<div
												className={`absolute left-0 top-0 bottom-0 w-1 bg-violet-400 rounded-full transition-all duration-300 ${
													hoveredDevMatchSection === "how"
														? "scale-y-100 opacity-100"
														: "scale-y-0 opacity-0"
												}`}
											/>
											<h3 className="text-white font-semibold text-sm">
												How to Use DevMatch
											</h3>
											<p className="text-white/80 text-xs leading-relaxed">
												Create a profile, set your preferences, and let our
												system match you with ideal opportunities.
											</p>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>

					{/* Account Icon */}
					<div
						className="relative"
						onMouseEnter={handleAccountMouseEnter}
						onMouseLeave={handleAccountMouseLeave}
					>
						<button
							onClick={() => setIsAccountOpen(!isAccountOpen)}
							className="p-2 hover:bg-violet-500/20 rounded-full transition-colors"
						>
							<User
								size={20}
								className="text-violet-400"
							/>
						</button>

						{/* Account Dropdown */}
						{isAccountOpen && (
							<div className="absolute top-full mt-0 right-0 w-30 pt-2">
								<div className="bg-black/95 backdrop-blur-md border border-violet-500/20 rounded-xl p-1 space-y-2">
									<a href="/signup">
										<button
											className="w-full text-left px-4 py-3 text-white/80 hover:text-white rounded-lg transition-colors text-sm font-medium relative pl-5"
											onMouseEnter={() => setHoveredAccountSection("signup")}
											onMouseLeave={() => setHoveredAccountSection(null)}
										>
											<div
												className={`absolute left-1 top-1/2 -translate-y-1/2 w-1 h-6 bg-violet-400 rounded-full transition-all duration-300 ${
													hoveredAccountSection === "signup"
														? "scale-x-100 opacity-100"
														: "scale-x-0 opacity-0"
												}`}
											/>
											Sign Up
										</button>
									</a>
									<a href="/login">
										<button
											className="w-full text-left px-4 py-3 text-white/80 hover:text-white rounded-lg transition-colors text-sm font-medium relative pl-5"
											onMouseEnter={() => setHoveredAccountSection("login")}
											onMouseLeave={() => setHoveredAccountSection(null)}
										>
											<div
												className={`absolute left-1 top-1/2 -translate-y-1/2 w-1 h-6 bg-violet-400 rounded-full transition-all duration-300 ${
													hoveredAccountSection === "login"
														? "scale-x-100 opacity-100"
														: "scale-x-0 opacity-0"
												}`}
											/>
											Log In
										</button>
									</a>
								</div>
							</div>
						)}
					</div>
				</div>
			</header>

			{/* Overlay for better visibility */}
			<div className="fixed inset-0 bg-linear-to-b from-black via-black/90 to-violet-950/20 pointer-events-none" />
		</>
	)
}
