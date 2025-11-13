"use client"

import { Calendar, DollarSign, Eye, Mail, MessageSquare } from "lucide-react"
import type { ProposalData } from "./proposals-modal"

interface ProposalCardProps {
  proposal: ProposalData
  onClick: () => void
}

const STATUS_CONFIG = {
  submitted: { label: "Submitted", icon: Mail, color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
  viewed: { label: "Viewed", icon: Eye, color: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
  reachout: { label: "Reached Out", icon: MessageSquare, color: "bg-green-500/20 text-green-300 border-green-500/30" },
}

export function ProposalCard({ proposal, onClick }: ProposalCardProps) {
  const statusConfig = STATUS_CONFIG[proposal.status]
  const StatusIcon = statusConfig.icon

  return (
    <div
      onClick={onClick}
      className="group relative bg-white/5 border border-white/10 rounded-lg p-5 hover:bg-white/10 hover:border-violet-500/30 transition-all duration-300 cursor-pointer"
    >
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-linear-to-br from-violet-500/0 to-violet-500/0 group-hover:from-violet-500/5 group-hover:to-violet-500/10 rounded-lg transition-all duration-300"></div>

      <div className="relative z-10">
        {/* Header with Title and Status */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1">
            <h3 className="text-base font-semibold text-white line-clamp-2 group-hover:text-violet-300 transition-colors">
              {proposal.title}
            </h3>
          </div>
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded border text-xs font-medium whitespace-nowrap shrink-0 ${statusConfig.color}`}
          >
            <StatusIcon size={14} />
            <span>{statusConfig.label}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-white/60 line-clamp-2 mb-4 group-hover:text-white/70 transition-colors">
          {proposal.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {proposal.skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="inline-block px-2.5 py-1 text-xs font-medium bg-violet-500/20 text-violet-300 rounded border border-violet-500/30 group-hover:bg-violet-500/30 group-hover:border-violet-500/50 transition-all"
            >
              {skill}
            </span>
          ))}
          {proposal.skills.length > 3 && (
            <span className="inline-block px-2.5 py-1 text-xs font-medium text-white/40">
              +{proposal.skills.length - 3} more
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <div className="flex items-center gap-4 text-xs text-white/50">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-violet-400/70" />
              <span>{proposal.deadline}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <DollarSign size={14} className="text-violet-400/70" />
              <span>{proposal.budget}</span>
            </div>
          </div>
          <span className="text-xs text-violet-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            View Details
          </span>
        </div>
      </div>
    </div>
  )
}
