"use client"

import type React from "react"

import { useState } from "react"
import {
	Mail,
	Calendar,
	DollarSign,
	Tag,
	Send,
	ChartNoAxesCombined,
} from "lucide-react"
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ProjectData {
	id: string
	ownerEmail: string
	title: string
	description: string
	budget: number
	skillsNeeded: string[]
	deadline: string
	proposalsCount: number
}

interface ProjectProposalModalProps {
	project: ProjectData
	trigger: React.ReactNode
}

export function ProjectProposalModal({
	project,
	trigger,
}: ProjectProposalModalProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [submitted, setSubmitted] = useState(false)

	const handleSubmitProposal = () => {
		setSubmitted(true)
		setTimeout(() => {
			setIsOpen(false)
			setSubmitted(false)
		}, 2000)
	}

	return (
		<Dialog
			open={isOpen}
			onOpenChange={setIsOpen}
		>
			<DialogTrigger asChild>{trigger}</DialogTrigger>

			<DialogContent className="w-full max-w-[80vw] sm:max-w-[50vw] p-0 gap-0 border-violet-500/30 overflow-hidden">
				<DialogTitle className="sr-only">Project Details</DialogTitle>

				<div className="flex rounded-sm overflow-hidden h-[70vh] bg-black/50">
					{/* Left section - Project details with scrolling */}
					<div className="w-2/3 p-6 border-r border-violet-500/20 overflow-y-auto bg-black">
						<div className="space-y-5">
							<div>
								<div className="flex items-center gap-1.5 text-violet-400/60 text-xs mb-1">
									<Mail size={12} />
									<span className="uppercase tracking-wide font-semibold">
										Owner Email
									</span>
								</div>
								<p className="text-xs font-medium text-white/80">
									{project.ownerEmail}
								</p>
							</div>

							<div>
								<h2 className="text-lg font-bold text-white leading-tight">
									{project.title}
								</h2>
							</div>

							<div>
								<h3 className="text-xs font-semibold text-white/80 uppercase tracking-wide mb-2">
									Description
								</h3>
								<p className="text-xs text-white/60 leading-relaxed">
									{project.description}
								</p>
							</div>

							<div>
								<div className="flex items-center gap-1.5 text-xs font-semibold text-white/80 mb-2">
									<DollarSign
										size={12}
										className="text-violet-400"
									/>
									<span>Budget</span>
								</div>
								<p className="text-sm font-bold text-violet-400">
									${project.budget.toLocaleString()}
								</p>
							</div>

							<div>
								<div className="flex items-center gap-1.5 text-xs font-semibold text-white/80 mb-2">
									<Tag
										size={12}
										className="text-violet-400"
									/>
									<span>Skills Needed</span>
								</div>
								<div className="flex flex-wrap gap-2">
									{project.skillsNeeded.map((skill) => (
										<span
											key={skill}
											className="px-2.5 py-1 bg-violet-500/15 text-violet-300 text-xs font-medium rounded-sm border border-violet-500/30 hover:bg-violet-500/25 transition-colors"
										>
											{skill}
										</span>
									))}
								</div>
							</div>

							<div>
								<div className="flex items-center gap-1.5 text-xs font-semibold text-white/80 mb-2">
									<Calendar
										size={12}
										className="text-violet-400"
									/>
									<span>Deadline</span>
								</div>
								<p className="text-xs font-medium text-white/80">
									{new Date(project.deadline).toLocaleDateString("en-US", {
										year: "numeric",
										month: "short",
										day: "numeric",
									})}
								</p>
							</div>
						</div>
					</div>

					{/* Right section - Submit button and activity */}
					<div className="w-1/3 p-5 bg-black/80 border-l border-violet-500/20 flex flex-col items-start justify-start gap-8">
						<Button
							onClick={handleSubmitProposal}
							className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium text-xs py-4 rounded-sm flex items-center justify-center gap-2 transition-colors mt-8"
							disabled={submitted}
						>
							{" "}
							{submitted ? "✓ Sent" : "Send Proposal"}{" "}
							{!submitted && <Send size={14} />}
						</Button>

						<div className="w-full">
							<h3 className="text-xs font-semibold text-white/80 uppercase tracking-wide mb-3">
								Proposals Submitted
							</h3>
							<div className="flex items-center justify-between gap-3 bg-violet-600/20 px-3 py-2 rounded-sm border border-violet-500/30">
								<ChartNoAxesCombined
									size={14}
									className="text-violet-400 shrink-0"
								/>
								<span className="text-sm font-bold text-violet-400 ml-auto">
									{project.proposalsCount}
								</span>
							</div>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
