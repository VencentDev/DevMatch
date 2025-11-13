"use client"

import { useState, useEffect } from "react"
import AccountHeader from "../components/account-header"
import {
	ProposalData,
	ProposalDetailModal,
} from "../components/proposal/proposals-modal"

const MOCK_PROPOSALS: ProposalData[] = [
	{
		id: "1",
		title: "Build a React Dashboard with Real-time Analytics",
		description:
			"Need a modern dashboard component with real-time data visualization and interactive charts.",
		budget: "$1,500 - $2,500",
		skills: ["React", "TypeScript", "Chart.js", "Tailwind CSS"],
		deadline: "Due in 2 weeks",
		postedBy: "TechStartup Inc.",
		proposalDescription:
			"I can create a comprehensive React dashboard with real-time updates using Chart.js for beautiful visualizations.",
		proposedBudget: "$2,200",
		status: "submitted", // Matches the union type
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
		proposalDescription:
			"Expert in mobile UI/UX with 5+ years of experience creating beautiful interfaces.",
		proposedBudget: "$1,000",
		status: "viewed", // Matches the union type
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
		proposalDescription:
			"Full-stack developer with expertise in building scalable Node.js APIs.",
		proposedBudget: "$3,200",
		status: "reachout", // Matches the union type
	},
]

export default function ProposalsPage() {
	const [proposals, setProposals] = useState(MOCK_PROPOSALS)
	const [isVisible, setIsVisible] = useState(false)
	const [selectedProposal, setSelectedProposal] = useState<
		(typeof MOCK_PROPOSALS)[0] | null
	>(null)

	useEffect(() => {
		// schedule visibility change on next animation frame to avoid synchronous state update in effect
		const rafId = requestAnimationFrame(() => setIsVisible(true))
		return () => cancelAnimationFrame(rafId)
	}, [])

	return (
		<main className="bg-black text-white min-h-screen">
			<AccountHeader />

			{/* Main Content */}
			<div className="pt-20 pb-12">
				<div className="max-w-7xl mx-auto px-4">
					{/* Page Header */}
					<div className="mb-8 animate-fade-in">
						<h1 className="text-3xl font-bold text-white mb-2">My Proposals</h1>
						<p className="text-white/60 text-sm">
							Track the status of all proposals you&apos;ve submitted
						</p>
					</div>

					{/* Proposals Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
						{proposals.map((proposal, idx) => (
							<div
								key={proposal.id}
								style={{
									animation: isVisible
										? `fadeInUp 0.5s ease-out ${idx * 0.1}s forwards`
										: "none",
									opacity: 0,
								}}
							>
								<div
									onClick={() => setSelectedProposal(proposal)}
									className="group relative bg-white/5 border border-white/10 rounded-lg p-5 hover:bg-white/10 hover:border-violet-500/30 transition-all duration-300 cursor-pointer"
								>
									{/* Hover Glow Effect */}
									<div className="absolute inset-0 bg-linear-to-br from-violet-500/0 to-violet-500/0 group-hover:from-violet-500/5 group-hover:to-violet-500/10 rounded-lg transition-all duration-300"></div>

									<div className="relative z-10">
										{/* Status Badge */}
										<div className="mb-3 flex items-center justify-between">
											<span
												className={`px-2.5 py-1 rounded text-xs font-semibold border ${
													proposal.status === "reachout"
														? "bg-blue-500/20 text-blue-300 border-blue-500/30"
														: proposal.status === "viewed"
														? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
														: "bg-violet-500/20 text-violet-300 border-violet-500/30"
												}`}
											>
												{proposal.status.charAt(0).toUpperCase() +
													proposal.status.slice(1)}
											</span>
										</div>

										{/* Title and Budget */}
										<div className="mb-3">
											<h3 className="text-base font-semibold text-white line-clamp-2 group-hover:text-violet-300 transition-colors">
												{proposal.title}
											</h3>
											<div className="text-sm font-bold text-violet-400 mt-1">
												{proposal.proposedBudget}
											</div>
										</div>

										{/* View Button */}
										<button className="w-full px-3 py-2 bg-violet-500/20 text-violet-300 rounded text-xs font-medium border border-violet-500/30 hover:bg-violet-500/30 transition-all">
											View Proposal
										</button>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Empty State */}
					{proposals.length === 0 && (
						<div className="text-center py-12">
							<p className="text-white/60">
								You haven&apos;t submitted any proposals yet.
							</p>
						</div>
					)}
				</div>
			</div>

			{/* Proposal Detail Modal */}
			{selectedProposal && (
				<ProposalDetailModal
					proposal={selectedProposal}
					onClose={() => setSelectedProposal(null)}
				/>
			)}

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
