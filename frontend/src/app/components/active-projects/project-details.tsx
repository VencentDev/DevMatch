"use client"

import type React from "react"
import { Calendar, DollarSign, FileText } from 'lucide-react'

interface ProjectData {
	id: string
	clientName: string
	title: string
	budget: number
	deadline: string
	status: string
	description: string
	skills: string[]
}

// Mock project data
const MOCK_PROJECTS: Record<string, ProjectData> = {
	"1": {
		id: "1",
		clientName: "Sarah Johnson",
		title: "Dashboard UI Redesign",
		budget: 2500,
		deadline: "2024-12-25",
		status: "In Progress",
		description:
			"Complete redesign of the admin dashboard with modern UI components and improved UX.",
		skills: ["React", "Tailwind CSS", "UI Design", "Figma"],
	},
	"2": {
		id: "2",
		clientName: "Mike Chen",
		title: "API Integration",
		budget: 1800,
		deadline: "2024-12-15",
		status: "Rate/Review",
		description:
			"Integrate third-party payment API and setup webhooks for transaction handling.",
		skills: ["Node.js", "REST API", "Payment Processing"],
	},
	"3": {
		id: "3",
		clientName: "Emma Davis",
		title: "Database Optimization",
		budget: 1500,
		deadline: "2024-12-20",
		status: "Completed",
		description:
			"Optimize database queries and implement caching for better performance.",
		skills: ["SQL", "Database Design", "Performance Tuning"],
	},
	"4": {
		id: "4",
		clientName: "Alex Rodriguez",
		title: "Mobile App Development",
		budget: 5000,
		deadline: "2025-01-15",
		status: "In Progress",
		description:
			"Build a cross-platform mobile app using React Native with backend integration.",
		skills: ["React Native", "Node.js", "Firebase", "Mobile Development"],
	},
}

interface ProjectDetailsProps {
	projectId: string
}

export default function ProjectDetails({
	projectId,
}: ProjectDetailsProps): React.ReactElement {
	const project = MOCK_PROJECTS[projectId]

	if (!project) {
		return <div className="text-white/40 p-6">Project not found</div>
	}

	const formatBudget = (amount: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(amount)
	}

	const formatDeadline = (date: string) => {
		return new Date(date).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		})
	}

	const daysUntilDeadline = Math.ceil(
		(new Date(project.deadline).getTime() - new Date().getTime()) /
			(1000 * 60 * 60 * 24),
	)

	return (
		<div className="flex flex-col h-full overflow-y-auto">
			{/* Header */}
			<div className="p-4 border-b border-violet-500/20 space-y-4">
				<div>
					<h2 className="text-xl font-bold text-white mb-2">{project.title}</h2>
				</div>

				{/* Budget Section */}
				<div className="bg-violet-500/10 border border-violet-500/20 rounded-sm p-2 space-y-3">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<DollarSign
								size={18}
								className="text-violet-400"
							/>
							<span className="text-white/70 text-sm">Budget</span>
						</div>
						<span className="text-lg font-bold text-white">
							{formatBudget(project.budget)}
						</span>
					</div>

					<div className="flex items-center justify-between border-t border-violet-500/20">
						<div className="flex items-center gap-2">
							<Calendar
								size={18}
								className="text-violet-400"
							/>
							<span className="text-white/70 text-sm">Deadline</span>
						</div>
						<div className="text-right">
							<p className="text-white font-semibold text-sm">
								{formatDeadline(project.deadline)}
							</p>
							<p
								className={`text-xs ${
									daysUntilDeadline > 7
										? "text-green-400/70"
										: "text-yellow-400/70"
								}`}
							>
								{daysUntilDeadline} days left
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Content */}
			<div className="flex-1 p-6 space-y-6 overflow-y-auto">
				{/* Status */}
				<div>
					<h3 className="text-sm font-semibold text-white mb-2">Status</h3>
					<span
						className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
							project.status === "In Progress"
								? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
								: project.status === "Rate/Review"
								? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
								: "bg-green-500/20 text-green-300 border border-green-500/30"
						}`}
					>
						{project.status}
					</span>
				</div>

				{/* Description */}
				<div>
					<h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
						<FileText
							size={16}
							className="text-violet-400"
						/>
						Description
					</h3>
					<p className="text-sm text-white/70 leading-relaxed">
						{project.description}
					</p>
				</div>

				{/* Skills */}
				<div>
					<h3 className="text-sm font-semibold text-white mb-3">
						Skills Required
					</h3>
					<div className="flex flex-wrap gap-2">
						{project.skills.map((skill) => (
							<span
								key={skill}
								className="px-3 py-1 rounded-full text-xs bg-white/5 border border-violet-500/30 text-white/80"
							>
								{skill}
							</span>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
