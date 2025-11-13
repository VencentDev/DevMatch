"use client"

import { Mail, Eye, MessageSquare, ChevronDown, Check } from "lucide-react"
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

interface ProposalsFiltersProps {
	selectedStatuses: string[]
	onStatusChange: (statuses: string[]) => void
}

const FILTER_OPTIONS = [
	{
		id: "submitted",
		label: "Submitted",
		icon: Mail,
	},
	{
		id: "viewed",
		label: "Viewed",
		icon: Eye,
	},
	{
		id: "reachout",
		label: "Reached Out",
		icon: MessageSquare,
	},
]

export default function ProposalsFilters({
	selectedStatuses,
	onStatusChange,
}: ProposalsFiltersProps) {
	const toggleStatus = (statusId: string) => {
		onStatusChange(
			selectedStatuses.includes(statusId)
				? selectedStatuses.filter((id) => id !== statusId)
				: [...selectedStatuses, statusId],
		)
	}

	return (
		<div className="sticky top-24 md:sticky md:top-24 space-y-4">
			<div className="bg-white/5 border border-white/10 rounded-lg p-6 backdrop-blur-sm">
				<div className="flex items-center mb-6">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button className="px-3 py-1 bg-violet-600/20 hover:bg-violet-600/40 border border-violet-500/50 rounded-sm text-violet-400 text-sm font-medium transition-all flex items-center gap-2">
								<h2 className="text-md font-semibold text-white/60">Filters</h2>
								<ChevronDown className="w-4 h-4" />
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align="end"
							className="w-48 bg-gray-900 border border-violet-500/30"
						>
							{FILTER_OPTIONS.map((option) => {
								const Icon = option.icon
								const isSelected = selectedStatuses.includes(option.id)

								return (
									<DropdownMenuItem
										key={option.id}
										onClick={() => toggleStatus(option.id)}
										className="cursor-pointer hover:bg-violet-600/40! flex items-center gap-3"
									>
										<div className="w-4 h-4 rounded border border-violet-500/50 flex items-center justify-center bg-transparent hover:bg-white/10">
											{isSelected && (
												<Check className="w-3 h-3 text-violet-400" />
											)}
										</div>
										<Icon className="w-4 h-4 text-violet-400" />
										<span className="text-violet-300">{option.label}</span>
									</DropdownMenuItem>
								)
							})}

							{selectedStatuses.length > 0 && (
								<>
									<DropdownMenuSeparator className="bg-violet-500/20" />
									<DropdownMenuItem
										onClick={() => onStatusChange([])}
										className="cursor-pointer hover:bg-white/10 text-violet-300 text-xs"
									>
										Clear Filters
									</DropdownMenuItem>
								</>
							)}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				{/* Quick Stats Section */}
				<div className="space-y-3">
					<h3 className="text-xs font-semibold text-white/70 uppercase tracking-wider">
						Quick Stats
					</h3>
					<div className="space-y-3">
						<div className="flex justify-between items-center">
							<span className="text-xs text-white/60">Total Proposals</span>
							<span className="text-lg font-bold text-violet-400">5</span>
						</div>
						<div className="flex justify-between items-center">
							<span className="text-xs text-white/60">Response Rate</span>
							<span className="text-lg font-bold text-violet-400">60%</span>
						</div>
						<div className="flex justify-between items-center">
							<span className="text-xs text-white/60">Avg. Response Time</span>
							<span className="text-lg font-bold text-violet-400">2 days</span>
						</div>
					</div>
				</div>
			</div>

			{/* Browse Projects Link */}
			<a
				href="/feed"
				className="block w-full px-4 py-3 text-center text-sm font-medium text-white bg-violet-500 hover:bg-violet-600 transition-all rounded-md"
			>
				Browse Projects
			</a>
		</div>
	)
}
