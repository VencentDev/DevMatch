"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import {
	Code2,
	Globe,
	Palette,
	Server,
	Zap,
	Smartphone,
	Settings,
	Pencil,
	Briefcase,
	BarChart3,
} from "lucide-react"

export default function RolesCarousel(): React.ReactElement {
	const sectionRef = useRef<HTMLDivElement>(null)
	const [isVisible, setIsVisible] = useState(false)
	const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set())

	const roles = [
		{ title: "Software Developer", icon: Code2 },
		{ title: "Web Developer", icon: Globe },
		{ title: "Frontend Developer", icon: Palette },
		{ title: "Backend Developer", icon: Server },
		{ title: "Full Stack Developer", icon: Zap },
		{ title: "Mobile Developer", icon: Smartphone },
		{ title: "DevOps Engineer", icon: Settings },
		{ title: "UI/UX Designer", icon: Pencil },
		{ title: "Product Manager", icon: Briefcase },
		{ title: "Data Scientist", icon: BarChart3 },
	]

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true)
					observer.unobserve(entry.target)
				}
			},
			{ threshold: 0.2 },
		)

		if (sectionRef.current) {
			observer.observe(sectionRef.current)
		}

		return () => observer.disconnect()
	}, [])

	useEffect(() => {
		const cardObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					setVisibleCards((prev) => {
						const newSet = new Set(prev)
						if (entry.isIntersecting) {
							newSet.add(entry.target.id)
						} else {
							newSet.delete(entry.target.id)
						}
						return newSet
					})
				})
			},
			{ threshold: 0.1 },
		)

		const cards = document.querySelectorAll("[data-card-id]")
		cards.forEach((card) => cardObserver.observe(card))

		return () => cardObserver.disconnect()
	}, [])

	return (
		<section
			ref={sectionRef}
			className="relative w-full py-16 px-4 md:px-6 bg-black overflow-hidden"
		>
			{/* Animated background elements */}
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute top-20 left-10 w-72 h-72 bg-violet-600/5 rounded-full blur-3xl"></div>
				<div className="absolute bottom-20 right-10 w-72 h-72 bg-violet-600/5 rounded-full blur-3xl"></div>
			</div>

			<div className="relative z-10 max-w-7xl mx-auto">
				{/* Section Header */}
				<div
					className={`text-center mb-16 transition-all duration-1000 ${
						isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
					}`}
				>
					<h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
						Connect with thousands of freelancers
					</h2>
					<p className="text-lg text-gray-400">
						Find the perfect talent for your next project across all
						specializations
					</p>
				</div>

				{/* Carousel Container */}
				<div className="relative">
					{/* Cards Grid with Scroll Animation */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
						{roles.map(({ title, icon: Icon }, index) => {
							const cardId = `card-${index}`
							const isCardVisible = visibleCards.has(cardId)

							return (
								<div
									key={title}
									id={cardId}
									data-card-id={cardId}
									className={`transition-all duration-500 ease-out ${
										isCardVisible
											? "opacity-100 scale-100"
											: "opacity-0 scale-75"
									}`}
								>
									<div className="group relative h-48 bg-linear-to-br from-violet-900/20 to-black border border-violet-500/30 rounded-lg p-6 hover:border-violet-500/60 transition-all duration-300 cursor-pointer overflow-hidden">
										<div className="absolute inset-0 bg-linear-to-br from-violet-600/0 to-violet-600/0 group-hover:from-violet-600/10 group-hover:to-violet-600/5 transition-all duration-500"></div>

										<div className="absolute left-0 top-0 h-full w-1 bg-linear-to-b from-violet-500 to-transparent scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></div>

										<div className="relative z-10 flex flex-col h-full justify-between">
											<div>
												<div className="w-12 h-12 bg-violet-500/20 rounded-lg mb-4 group-hover:bg-violet-500/40 transition-colors duration-300 flex items-center justify-center">
													<Icon className="w-6 h-6 text-violet-400 group-hover:text-violet-300 transition-colors duration-300" />
												</div>
												<h3 className="text-xl font-semibold text-white group-hover:text-violet-300 transition-colors duration-300">
													{title}
												</h3>
											</div>

											<div className="flex items-center gap-2 text-violet-400 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300">
												<span className="text-sm font-medium">Explore</span>
												<svg
													className="w-4 h-4"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M9 5l7 7-7 7"
													/>
												</svg>
											</div>
										</div>
									</div>
								</div>
							)
						})}
					</div>

					<div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-black to-transparent pointer-events-none md:hidden"></div>
					<div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-black to-transparent pointer-events-none md:hidden"></div>
				</div>

				{/* Call to Action */}
				<div
					className={`text-center mt-16 transition-all duration-1000 delay-500 ${
						isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
					}`}
				></div>
			</div>
		</section>
	)
}
