"use client"

import { useState } from "react"
import { ProposalCard } from "./proposal-card"
import { ProposalDetailModal } from "./proposals-modal"
import type { ProposalData } from "./proposals-modal"

interface ProposalsListProps {
  selectedStatuses: string[]
}

export default function ProposalsList({ selectedStatuses }: ProposalsListProps) {
  const [selectedProposal, setSelectedProposal] = useState<ProposalData | null>(null)

  // Mock data - Replace with actual API call
  const mockProposals: ProposalData[] = [
    {
      id: "1",
      title: "E-Commerce Platform Development",
      description: "Build a modern e-commerce platform with React and Node.js",
      budget: "$5,000 - $10,000",
      skills: ["React", "Node.js", "MongoDB", "Stripe"],
      deadline: "2025-03-15",
      postedBy: "TechStart Inc.",
      proposalDescription: "I can build this platform with my 5+ years of experience in full-stack development.",
      proposedBudget: "$8,500",
      status: "submitted" as const,
    },
    {
      id: "2",
      title: "Mobile App UI/UX Design",
      description: "Design a mobile app for fitness tracking",
      budget: "$2,000 - $4,000",
      skills: ["Figma", "UI/UX", "Mobile Design"],
      deadline: "2025-02-28",
      postedBy: "FitLife Co.",
      proposalDescription: "I specialize in mobile app design with a focus on user experience.",
      proposedBudget: "$3,200",
      status: "viewed" as const,
    },
    {
      id: "3",
      title: "WordPress Theme Customization",
      description: "Customize an existing WordPress theme for a marketing agency",
      budget: "$1,500 - $3,000",
      skills: ["WordPress", "PHP", "CSS"],
      deadline: "2025-02-15",
      postedBy: "MarketPro Agency",
      proposalDescription: "I have extensive WordPress experience and can deliver quality customizations.",
      proposedBudget: "$2,000",
      status: "reachout" as const,
    },
    {
      id: "4",
      title: "API Development for SaaS",
      description: "Build RESTful API for a SaaS application",
      budget: "$4,000 - $8,000",
      skills: ["Node.js", "Express", "PostgreSQL", "REST API"],
      deadline: "2025-03-30",
      postedBy: "CloudSync Labs",
      proposalDescription: "I can develop a robust API following best practices and clean code principles.",
      proposedBudget: "$6,500",
      status: "submitted" as const,
    },
    {
      id: "5",
      title: "Data Analytics Dashboard",
      description: "Create a dashboard to visualize business metrics",
      budget: "$3,000 - $6,000",
      skills: ["React", "Chart.js", "Python", "PostgreSQL"],
      deadline: "2025-03-20",
      postedBy: "DataViz Corp",
      proposalDescription: "Experienced in building interactive dashboards with real-time data updates.",
      proposedBudget: "$4,800",
      status: "viewed" as const,
    },
  ]

  const filteredProposals = selectedStatuses.length
    ? mockProposals.filter((p) => selectedStatuses.includes(p.status))
    : mockProposals

  return (
    <div className="space-y-4">
      {filteredProposals.length > 0 ? (
        filteredProposals.map((proposal) => (
          <ProposalCard key={proposal.id} proposal={proposal} onClick={() => setSelectedProposal(proposal)} />
        ))
      ) : (
        <div className="text-center py-12">
          <p className="text-white/60 text-lg">No proposals found for selected filters</p>
        </div>
      )}

      {selectedProposal && (
        <ProposalDetailModal proposal={selectedProposal} onClose={() => setSelectedProposal(null)} />
      )}
    </div>
  )
}
