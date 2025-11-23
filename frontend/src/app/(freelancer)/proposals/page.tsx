"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import AccountHeader from "../../components/account-header"
import ProposalsFilters from "@/app/components/(freelancer)/proposal/proposals-filters"
import ProposalsList from "@/app/components/(freelancer)/proposal/proposals-list"

export default function ProposalsPage() {
	const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
	const [sidebarOpen, setSidebarOpen] = useState(false)

	return (
		<div className="min-h-screen bg-black">
			<AccountHeader />

			<main className="pt-20 pb-12">
				<div className="max-w-7xl mx-auto px-4">
					<div className="mb-8">
						<h1 className="text-3xl font-bold text-white mb-2">My Proposals</h1>
						<p className="text-white/60">
							Track and manage all your submitted proposals
						</p>
					</div>

					<div className="flex gap-8 relative">
						<div className="flex-1 min-w-0">
							<ProposalsList selectedStatuses={selectedStatuses} />
						</div>

						<button
							onClick={() => setSidebarOpen(!sidebarOpen)}
							className="md:hidden fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full bg-violet-500 hover:bg-violet-600 text-white flex items-center justify-center transition-all"
							aria-label="Toggle filters menu"
						>
							{sidebarOpen ? <X size={24} /> : <Menu size={24} />}
						</button>

						<div
							className={`fixed md:relative bottom-0 right-0 md:bottom-auto md:right-auto w-full md:w-72 h-screen md:h-auto max-h-screen md:max-h-none overflow-y-auto md:overflow-y-visible z-30 md:z-auto transition-transform duration-300 ${
								sidebarOpen
									? "translate-x-0"
									: "translate-x-full md:translate-x-0"
							} md:translate-x-0 bg-black md:bg-transparent`}
						>
							<div className="pt-16 md:pt-0 p-4 md:p-0">
								<ProposalsFilters
									selectedStatuses={selectedStatuses}
									onStatusChange={setSelectedStatuses}
								/>
							</div>
						</div>

						{sidebarOpen && (
							<div
								onClick={() => setSidebarOpen(false)}
								className="md:hidden fixed inset-0 bg-black/50 z-20 backdrop-blur-sm"
								aria-hidden="true"
							/>
						)}
					</div>
				</div>
			</main>
		</div>
	)
}
