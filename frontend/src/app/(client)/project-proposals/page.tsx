"use client"

import { useState } from "react"
import {
	Search,
	Plus,
	BarChart3,
	TrendingUp,
	Users,
	ArrowUpDown,
	Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts"
import AccountHeader from "@/app/components/account-header"

// Mock data
const userProjects = [
	{ id: 1, name: "Web Redesign", proposals: 12 },
	{ id: 2, name: "Mobile App", proposals: 8 },
	{ id: 3, name: "API Development", proposals: 15 },
	{ id: 4, name: "Cloud Migration", proposals: 6 },
	{ id: 5, name: "UI Kit Design", proposals: 20 },
	{ id: 6, name: "UI Kit Design", proposals: 20 },
	{ id: 7, name: "UI Kit Design", proposals: 20 },
	{ id: 8, name: "UI Kit Design", proposals: 20 },
]

const proposalsData = [
	{
		id: 1,
		fullName: "Sarah Johnson",
		email: "sarah.johnson@email.com",
		proposedBudget: 5000,
		skills: ["React", "Node.js", "Design"],
		rating: 4.8,
		timestamp: "2 hours ago",
	},
	{
		id: 2,
		fullName: "Michael Chen",
		email: "michael.chen@email.com",
		proposedBudget: 4500,
		skills: ["Vue.js", "Python", "DevOps"],
		rating: 4.6,
		timestamp: "5 hours ago",
	},
	{
		id: 3,
		fullName: "Emma Davis",
		email: "emma.davis@email.com",
		proposedBudget: 6000,
		skills: ["React", "TypeScript", "Design System"],
		rating: 4.9,
		timestamp: "1 day ago",
	},
	{
		id: 4,
		fullName: "Alex Rivera",
		email: "alex.rivera@email.com",
		proposedBudget: 4200,
		skills: ["Angular", "Node.js", "Testing"],
		rating: 4.5,
		timestamp: "2 days ago",
	},
]

const chartData = [
	{ date: "Mon", proposals: 2 },
	{ date: "Tue", proposals: 4 },
	{ date: "Wed", proposals: 3 },
	{ date: "Thu", proposals: 6 },
	{ date: "Fri", proposals: 5 },
	{ date: "Sat", proposals: 8 },
	{ date: "Sun", proposals: 3 },
]

export default function ProjectsPage() {
	const [selectedProject, setSelectedProject] = useState(userProjects[0])
	const [searchQuery, setSearchQuery] = useState("")
	const [sortBy, setSortBy] = useState("recent")
	const [budgetSort, setBudgetSort] = useState("asc")
	const [currentPage, setCurrentPage] = useState(1)
	const itemsPerPage = 5

	const filteredProjects = userProjects.filter((project) =>
		project.name.toLowerCase().includes(searchQuery.toLowerCase()),
	)

	const sortedProposals = [...proposalsData].sort((a, b) => {
		if (sortBy === "recent") {
			return 0
		}
		if (sortBy === "budget") {
			return budgetSort === "asc"
				? a.proposedBudget - b.proposedBudget
				: b.proposedBudget - a.proposedBudget
		}
		if (sortBy === "bestMatch") {
			return b.rating - a.rating
		}
		return 0
	})

	const totalPages = Math.ceil(sortedProposals.length / itemsPerPage)
	const startIndex = (currentPage - 1) * itemsPerPage
	const paginatedProposals = sortedProposals.slice(
		startIndex,
		startIndex + itemsPerPage,
	)

	const avgBudget = (
		proposalsData.reduce((sum, p) => sum + p.proposedBudget, 0) /
		proposalsData.length
	).toFixed(0)

	return (
		<main>
			<AccountHeader />
			<div className="pt-20 pb-8 px-4 bg-black min-h-screen">
				<div className="max-w-7xl mx-auto flex gap-4">
					{/* Left Sidebar - Projects */}
					<div className="w-64 shrink-0 flex flex-col">
						<div className="flex flex-col flex-1 min-h-0">
							{/* Search */}
							<div className="relative mb-2">
								<Search
									size={16}
									className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/40"
								/>
								<Input
									placeholder="Search projects..."
									className="pl-8 h-8 text-sm rounded-sm bg-white/5 border-white/10 hover:border-violet-500/30 text-white placeholder:text-white/40"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
								/>
							</div>

							{/* Add Project Button */}
							<Button className="w-full h-8 rounded-sm bg-violet-600 hover:bg-violet-700 text-white text-sm gap-2 mb-2">
								<Plus size={16} />
								<span>Add Project</span>
							</Button>

							<div className="overflow-y-auto space-y-2 min-h-0">
								{filteredProjects.map((project) => (
									<button
										key={project.id}
										onClick={() => setSelectedProject(project)}
										className={`w-full p-3 rounded-sm text-left text-sm transition-all ${
											selectedProject.id === project.id
												? "bg-white/5 border border-violet-500/50 text-white hover:border-violet-500/70"
												: "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:border-violet-500/30"
										}`}
									>
										<p className="font-medium truncate">{project.name}</p>
										<p className="text-xs mt-1 text-white/50">
											{project.proposals} proposals
										</p>
									</button>
								))}
							</div>
						</div>
					</div>

					{/* Right Section */}
					<div className="flex-1 flex flex-col">
						{/* Analytics Cards */}
						<div className="grid grid-cols-3 gap-3 mb-3">
							{/* Average Budget */}
							<div className="p-3 rounded-sm border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
								<div className="flex items-start justify-between">
									<div>
										<p className="text-xs text-white/50">
											Avg. Proposed Budget
										</p>
										<p className="text-lg font-bold text-white mt-1">
											${avgBudget}
										</p>
									</div>
									<BarChart3
										size={20}
										className="text-violet-400"
									/>
								</div>
							</div>

							{/* Number of Proposals */}
							<div className="p-3 rounded-sm border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
								<div className="flex items-start justify-between">
									<div>
										<p className="text-xs text-white/50">Total Proposals</p>
										<p className="text-lg font-bold text-white mt-1">
											{proposalsData.length}
										</p>
									</div>
									<Users
										size={20}
										className="text-violet-400"
									/>
								</div>
							</div>

							{/* Proposals Chart */}
							<div className="p-3 rounded-sm border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
								<div className="flex items-start justify-between mb-2">
									<div>
										<p className="text-xs text-white/50">Weekly Trend</p>
									</div>
									<TrendingUp
										size={20}
										className="text-violet-400"
									/>
								</div>
								<ResponsiveContainer
									width="100%"
									height={60}
								>
									<LineChart data={chartData}>
										<Line
											type="monotone"
											dataKey="proposals"
											stroke="#a855f7"
											dot={false}
											strokeWidth={2}
										/>
										<XAxis
											dataKey="date"
											stroke="#ffffff40"
											style={{ fontSize: "12px" }}
										/>
										<YAxis
											stroke="#ffffff40"
											style={{ fontSize: "12px" }}
										/>
										<CartesianGrid
											strokeDasharray="3 3"
											stroke="#ffffff10"
										/>
										<Tooltip
											contentStyle={{
												backgroundColor: "#1a1a1a",
												border: "1px solid #ffffff20",
												borderRadius: "0.125rem",
											}}
										/>
									</LineChart>
								</ResponsiveContainer>
							</div>
						</div>

						{/* Proposals Section */}
						<div className="flex flex-col gap-2">
							<div className="flex items-center justify-between">
								<h2 className="text-sm font-semibold text-white">
									Proposals for {selectedProject.name}
								</h2>

								{/* Sort Dropdown */}
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button
											variant="outline"
											size="sm"
											className="h-8 rounded-sm gap-1 text-xs bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
										>
											<ArrowUpDown size={14} />
											<span>Sort</span>
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent
										align="end"
										className="w-40 rounded-sm bg-white/5 border-white/10"
									>
										<DropdownMenuItem
											onClick={() => setSortBy("bestMatch")}
											className="text-xs rounded-none text-white/70 hover:text-white hover:bg-white/10"
										>
											Best Matches
										</DropdownMenuItem>
										<DropdownMenuItem
											onClick={() => setSortBy("recent")}
											className="text-xs rounded-none text-white/70 hover:text-white hover:bg-white/10"
										>
											Recent
										</DropdownMenuItem>
										<DropdownMenuSeparator className="bg-white/10" />
										<DropdownMenuItem
											onClick={() => {
												setSortBy("budget")
												setBudgetSort("asc")
											}}
											className="text-xs rounded-none text-white/70 hover:text-white hover:bg-white/10"
										>
											Budget: Low to High
										</DropdownMenuItem>
										<DropdownMenuItem
											onClick={() => {
												setSortBy("budget")
												setBudgetSort("desc")
											}}
											className="text-xs rounded-none text-white/70 hover:text-white hover:bg-white/10"
										>
											Budget: High to Low
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>

							<div className="space-y-2">
								{paginatedProposals.map((proposal) => (
									<div
										key={proposal.id}
										className="p-3 rounded-sm border border-white/10 bg-white/5 hover:bg-white/10 transition-all cursor-pointer group"
									>
										<div className="flex items-start justify-between">
											<div className="flex-1">
												<div className="flex items-center gap-2">
													<p className="font-medium text-sm text-white group-hover:text-violet-300 transition-colors">
														{proposal.fullName}
													</p>
													<Star
														size={14}
														className="fill-violet-400 text-violet-400"
													/>
													<span className="text-xs text-white/60">
														{proposal.rating}
													</span>
													<span>
														<div className="flex flex-wrap gap-1.5">
															{/* Skills */}

															{proposal.skills.map((skill) => (
																<span
																	key={skill}
																	className="px-2 py-0.5 bg-violet-500/20 text-violet-300 text-xs rounded-sm border border-violet-500/30 group-hover:bg-violet-500/30 group-hover:border-violet-500/50 transition-all"
																>
																	{skill}
																</span>
															))}
														</div>
													</span>
												</div>
												<p className="text-xs text-white/50 mt-0.5">
													{proposal.email}
												</p>
											</div>
											<div className="text-right">
												<p className="font-semibold text-sm text-white">
													${proposal.proposedBudget}
												</p>
												<p className="text-xs text-white/40 mt-0.5">
													{proposal.timestamp}
												</p>
											</div>
										</div>
									</div>
								))}
							</div>

							{totalPages > 1 && (
								<div className="flex items-center justify-center gap-2 mt-2">
									<Button
										onClick={() =>
											setCurrentPage((prev) => Math.max(1, prev - 1))
										}
										disabled={currentPage === 1}
										size="sm"
										className="h-7 text-xs rounded-sm bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
									>
										Previous
									</Button>
									<div className="flex items-center gap-1">
										{Array.from({ length: totalPages }).map((_, idx) => (
											<button
												key={idx + 1}
												onClick={() => setCurrentPage(idx + 1)}
												className={`w-7 h-7 text-xs rounded-sm transition-all ${
													currentPage === idx + 1
														? "bg-violet-600 text-white border border-violet-600"
														: "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:border-violet-500/30"
												}`}
											>
												{idx + 1}
											</button>
										))}
									</div>
									<Button
										onClick={() =>
											setCurrentPage((prev) => Math.min(totalPages, prev + 1))
										}
										disabled={currentPage === totalPages}
										size="sm"
										className="h-7 text-xs rounded-sm bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
									>
										Next
									</Button>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}
