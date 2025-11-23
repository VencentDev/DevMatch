"use client"

import {
	Mail,
	Calendar,
	DollarSign,
	Tag,
	Eye,
	MessageSquare,
} from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

export interface ProposalData {
	id: string
	title: string
	description: string
	budget: string
	skills: string[]
	deadline: string
	postedBy: string
	proposalDescription: string
	proposedBudget: string
	status: "submitted" | "viewed" | "reachout"
}

interface ProposalDetailModalProps {
	proposal: ProposalData
	onClose: () => void
}

const STATUS_STAGES = [
	{ key: "submitted", label: "Proposal Sent", icon: Mail },
	{ key: "viewed", label: "Viewed", icon: Eye },
	{ key: "reachout", label: "Reach Out", icon: MessageSquare },
]

export function ProposalDetailModal({
	proposal,
	onClose,
}: ProposalDetailModalProps) {
	const currentStatusIndex = STATUS_STAGES.findIndex(
		(s) => s.key === proposal.status,
	)

	return (
		<Dialog
			open={true}
			onOpenChange={onClose}
		>
			<DialogContent className="w-full max-w-[80vw] sm:max-w-[60vw] p-0 gap-0 border-violet-500/30 overflow-hidden">
				<DialogTitle className="sr-only">Proposal Details</DialogTitle>

				<div className="flex rounded-sm overflow-hidden h-[70vh] bg-black/50">
					{/* Left section - Project details */}
					<div className="w-2/3 p-6 border-r border-violet-500/20 overflow-y-auto bg-black">
						<div className="space-y-5">
							<div>
								<div className="flex items-center gap-1.5 text-violet-400/60 text-xs mb-1">
									<Mail size={12} />
									<span className="uppercase tracking-wide font-semibold">
										Posted By
									</span>
								</div>
								<p className="text-xs font-medium text-white/80">
									{proposal.postedBy}
								</p>
							</div>

							<div>
								<h2 className="text-lg font-bold text-white leading-tight">
									{proposal.title}
								</h2>
							</div>

							<div>
								<h3 className="text-xs font-semibold text-white/80 uppercase tracking-wide mb-2">
									Description
								</h3>
								<p className="text-xs text-white/60 leading-relaxed">
									{proposal.description}
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
									{proposal.budget}
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
									{proposal.skills.map((skill) => (
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
									{proposal.deadline}
								</p>
							</div>
						</div>
					</div>

					{/* Right section - Proposal Info and Status */}
					<div className="w-1/3 p-5 bg-black/80 border-l border-violet-500/20 flex flex-col overflow-y-auto">
						{/* Proposal Details */}
						<div className="mb-6 pb-6 border-b border-violet-500/20">
							<h3 className="text-xs font-semibold text-white/80 uppercase tracking-wide mb-3">
								Your Proposal
							</h3>
							<p className="text-xs text-white/60 leading-relaxed mb-3">
								{proposal.proposalDescription}
							</p>
							<div>
								<p className="text-xs text-white/60 mb-1">Proposed Budget</p>
								<p className="text-sm font-bold text-violet-400">
									{proposal.proposedBudget}
								</p>
							</div>
						</div>

						{/* Status Timeline */}
						<div className="flex-1">
							<h3 className="text-xs font-semibold text-white/80 uppercase tracking-wide mb-4">
								Status Timeline
							</h3>
							<div className="space-y-4">
								{STATUS_STAGES.map((stage, index) => {
									const isActive = index <= currentStatusIndex
									const isCurrent = stage.key === proposal.status
									const IconComponent = stage.icon

									return (
										<div
											key={stage.key}
											className="flex items-start gap-3"
										>
											{/* Icon */}
											<div
												className={`mt-0.5 p-1.5 rounded-sm transition-colors ${
													isActive
														? "bg-violet-500/30 text-violet-400"
														: "bg-white/5 text-white/40"
												}`}
											>
												<IconComponent size={14} />
											</div>

											{/* Label */}
											<div className="flex-1 min-w-0">
												<p
													className={`text-xs font-semibold transition-colors ${
														isActive ? "text-white" : "text-white/40"
													}`}
												>
													{stage.label}
												</p>
											</div>

											{/* Connector Line */}
											{index < STATUS_STAGES.length - 1 && (
												<div
													className={`absolute left-5 mt-6 w-0.5 h-6 transition-colors ${
														isActive ? "bg-violet-500/30" : "bg-white/10"
													}`}
												></div>
											)}
										</div>
									)
								})}
							</div>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
