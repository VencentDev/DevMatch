"use client"

import { useState, useEffect } from "react"

import { ArrowUpDown, TrendingUp, Clock, DollarSign } from "lucide-react"
import FeedHeader from "../components/account-header"
import ProjectCard from "../components/feed/project-card"
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubTrigger,
	DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"

const MOCK_PROJECTS = [
	{
		id: "1",
		title: "Build a React Dashboard with Real-time Analytics",
		description:
			"Need a modern dashboard component with real-time data visualization and interactive charts.",
		budget: "$1,500 - $2,500",
		skills: ["React", "TypeScript", "Chart.js", "Tailwind CSS"],
		deadline: "Due in 2 weeks",
		postedBy: "TechStartup Inc.",
	},
	{
		id: "2",
		title: "Mobile App UI/UX Design",
		description:
			"Looking for a talented designer to create beautiful and intuitive mobile app designs.",
		budget: "$800 - $1,200",
		skills: ["Figma", "UI Design", "UX Research", "Mobile Design"],
		deadline: "Due in 3 weeks",
		postedBy: "Digital Agency",
	},
	{
		id: "3",
		title: "Backend API Development with Node.js",
		description:
			"Develop a scalable REST API for our e-commerce platform with authentication and payment integration.",
		budget: "$2,000 - $3,500",
		skills: ["Node.js", "Express", "MongoDB", "AWS"],
		deadline: "Due in 1 month",
		postedBy: "E-commerce Co.",
	},
	{
		id: "4",
		title: "Next.js Website Redesign",
		description:
			"Redesign our company website with modern best practices and improved SEO optimization.",
		budget: "$1,200 - $2,000",
		skills: ["Next.js", "React", "SEO", "Performance Optimization"],
		deadline: "Due in 2 weeks",
		postedBy: "Consulting Firm",
	},
	{
		id: "5",
		title: "Database Optimization and Migration",
		description:
			"Optimize and migrate our legacy database system to a modern cloud-based solution.",
		budget: "$3,000 - $5,000",
		skills: ["PostgreSQL", "AWS", "Database Design", "DevOps"],
		deadline: "Due in 1 month",
		postedBy: "Enterprise Solutions",
	},
	{
		id: "6",
		title: "Full Stack Chat Application",
		description:
			"Create a real-time chat application with user authentication and message storage.",
		budget: "$2,500 - $4,000",
		skills: ["React", "Node.js", "Socket.io", "MongoDB"],
		deadline: "Due in 3 weeks",
		postedBy: "SaaS Startup",
	},
]

export default function FeedPage() {
	const [projects, setProjects] = useState(MOCK_PROJECTS)
	const [isVisible, setIsVisible] = useState(false)
	const [sortBy, setSortBy] = useState<string>("recent")

	useEffect(() => {
		const raf = requestAnimationFrame(() => setIsVisible(true))
		return () => cancelAnimationFrame(raf)
	}, [])

	const getSortedProjects = () => {
		const sorted = [...projects]

		if (sortBy === "best-matches") {
			return sorted.sort((a, b) => a.title.localeCompare(b.title))
		} else if (sortBy === "recent") {
			return sorted
		} else if (sortBy === "budget-low") {
			return sorted.sort((a, b) => {
				const aMin = Number.parseInt(a.budget.match(/\d+/)?.[0] || "0")
				const bMin = Number.parseInt(b.budget.match(/\d+/)?.[0] || "0")
				return aMin - bMin
			})
		} else if (sortBy === "budget-high") {
			return sorted.sort((a, b) => {
				const aMin = Number.parseInt(a.budget.match(/\d+/)?.[0] || "0")
				const bMin = Number.parseInt(b.budget.match(/\d+/)?.[0] || "0")
				return bMin - aMin
			})
		}
		return sorted
	}

	const sortedProjects = getSortedProjects()

	return (
		<main className="bg-black text-white min-h-screen">
			<FeedHeader />

			{/* Main Content */}
			<div className="pt-20 pb-12">
				<div className="max-w-7xl mx-auto px-4">
					{/* Page Header with Sort Button */}
					<div className="mb-8 animate-fade-in flex items-center">
						<div>
							<h1 className="text-3xl font-bold text-white mb-2 mr-4">
								Available Projects
							</h1>
						</div>

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<button className="px-3 py-1 bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/50 rounded-sm text-violet-400 text-sm font-medium transition-all flex items-center gap-2">
									<ArrowUpDown className="w-4 h-4" />
									Sort
								</button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								align="end"
								className="w-48 bg-gray-900 border border-violet-500/30 text-violet-300"
							>
								<DropdownMenuItem
									onClick={() => setSortBy("best-matches")}
									className="cursor-pointer hover:bg-violet-600/20 flex items-center gap-2"
								>
									<TrendingUp className="w-4 h-4" />
									Best Matches
								</DropdownMenuItem>

								<DropdownMenuItem
									onClick={() => setSortBy("recent")}
									className="cursor-pointer hover:bg-violet-600/20 flex items-center gap-2"
								>
									<Clock className="w-4 h-4" />
									Recent
								</DropdownMenuItem>

								<DropdownMenuSeparator className="bg-violet-500/20" />

								<DropdownMenuSub>
									<DropdownMenuSubTrigger className="cursor-pointer hover:bg-violet-600/20 flex items-center gap-2">
										<DollarSign className="w-4 h-4" />
										Budget
									</DropdownMenuSubTrigger>
									<DropdownMenuSubContent className="bg-gray-900 border border-violet-500/30 text-violet-300">
										<DropdownMenuItem
											onClick={() => setSortBy("budget-low")}
											className="cursor-pointer hover:bg-violet-600/20"
										>
											Lower to Higher
										</DropdownMenuItem>
										<DropdownMenuItem
											onClick={() => setSortBy("budget-high")}
											className="cursor-pointer hover:bg-violet-600/20"
										>
											Higher to Lower
										</DropdownMenuItem>
									</DropdownMenuSubContent>
								</DropdownMenuSub>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>

					{/* Projects Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
						{sortedProjects.map((project, idx) => (
							<div
								key={project.id}
								style={{
									animation: isVisible
										? `fadeInUp 0.5s ease-out ${idx * 0.1}s forwards`
										: "none",
									opacity: 0,
								}}
							>
								<ProjectCard {...project} />
							</div>
						))}
					</div>

					{/* Empty State */}
					{sortedProjects.length === 0 && (
						<div className="text-center py-12">
							<p className="text-white/60">
								No projects found. Try adjusting your filters.
							</p>
						</div>
					)}
				</div>
			</div>

			<style jsx>{`
				@keyframes fadeInUp {
					from {
						opacity: 0;
						transform: translateY(20px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				:global(.animate-fade-in) {
					animation: fadeInUp 0.5s ease-out forwards;
				}
			`}</style>
		</main>
	)
}
