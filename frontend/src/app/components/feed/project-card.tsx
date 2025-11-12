"use client"

import { Briefcase, Calendar } from "lucide-react"

interface ProjectCardProps {
	id: string
	title: string
	description: string
	budget: string
	skills: string[]
	deadline: string
	postedBy?: string
}

export default function ProjectCard({
	title,
	description,
	budget,
	skills,
	deadline,
	postedBy,
}: ProjectCardProps) {
	return (
		<div className="group relative bg-white/5 border border-white/10 rounded-lg p-5 hover:bg-white/10 hover:border-violet-500/30 transition-all duration-300 cursor-pointer">
			{/* Hover Glow Effect */}
			<div className="absolute inset-0 bg-linear-to-br from-violet-500/0 to-violet-500/0 group-hover:from-violet-500/5 group-hover:to-violet-500/10 rounded-lg transition-all duration-300"></div>

			<div className="relative z-10">
				{/* Header */}
				<div className="flex items-start justify-between gap-3 mb-3">
					<div className="flex-1">
						<h3 className="text-base font-semibold text-white line-clamp-2 group-hover:text-violet-300 transition-colors">
							{title}
						</h3>
					</div>
					<div className="text-right shrink-0">
						<div className="text-sm font-bold text-violet-400">{budget}</div>
						<div className="text-xs text-white/40">Budget</div>
					</div>
				</div>

				{/* Description */}
				<p className="text-sm text-white/60 line-clamp-2 mb-4 group-hover:text-white/70 transition-colors">
					{description}
				</p>

				{/* Skills */}
				<div className="flex flex-wrap gap-2 mb-4">
					{skills.slice(0, 3).map((skill, idx) => (
						<span
							key={idx}
							className="inline-block px-2.5 py-1 text-xs font-medium bg-violet-500/20 text-violet-300 rounded border border-violet-500/30 group-hover:bg-violet-500/30 group-hover:border-violet-500/50 transition-all"
						>
							{skill}
						</span>
					))}
					{skills.length > 3 && (
						<span className="inline-block px-2.5 py-1 text-xs font-medium text-white/40">
							+{skills.length - 3} more
						</span>
					)}
				</div>

				{/* Footer */}
				<div className="flex items-center justify-between pt-3 border-t border-white/5">
					<div className="flex items-center gap-4 text-xs text-white/50">
						<div className="flex items-center gap-1">
							<Calendar
								size={14}
								className="text-violet-400/70"
							/>
							<span>{deadline}</span>
						</div>
						<div className="flex items-center gap-1">
							<Briefcase
								size={14}
								className="text-violet-400/70"
							/>
							<span className="line-clamp-1">{postedBy || "Project"}</span>
						</div>
					</div>
					<button className="px-3 py-1 bg-violet-500/20 text-violet-300 rounded text-xs font-medium border border-violet-500/30 hover:bg-violet-500/30 hover:border-violet-500/50 transition-all">
						View
					</button>
				</div>
			</div>
		</div>
	)
}
