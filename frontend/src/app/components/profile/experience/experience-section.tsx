"use client"

import { useState } from "react"
import { Pencil, Plus, X, Star } from 'lucide-react'
import ExperienceModal from "./experience-modal"

interface Experience {
	id: string
	title: string
	company: string
	duration: string
	description: string
}

export default function ExperienceSection() {
	const [experiences, setExperiences] = useState<Experience[]>([
		{
			id: "1",
			title: "Senior Frontend Developer",
			company: "Tech Corp",
			duration: "2022 - Present",
			description: "Leading frontend development team and building scalable applications.",
		},
		{
			id: "2",
			title: "Frontend Developer",
			company: "Design Studio",
			duration: "2020 - 2022",
			description: "Developed responsive web applications using React and TypeScript.",
		},
	])
	const [isModalOpen, setIsModalOpen] = useState(false)
	const averageRating = 4.7

	const removeExperience = (id: string) => {
		setExperiences(experiences.filter((exp) => exp.id !== id))
	}

	const addExperience = (newExperience: Omit<Experience, "id">) => {
		const experience: Experience = {
			id: Date.now().toString(),
			...newExperience,
		}
		setExperiences([...experiences, experience])
	}

	return (
		<>
			<div className="bg-gradient-to-br from-violet-600/10 to-violet-600/5 rounded-lg p-6">
				<div className="flex items-center justify-between mb-6">
					<div className="flex items-center gap-2">
						<h2 className="text-xl font-bold text-white">Experience</h2>
						<div className="flex items-center gap-1 bg-violet-600/20 rounded-full px-2 py-1">
							<Star size={14} className="text-yellow-400 fill-yellow-400" />
							<span className="text-xs font-semibold text-white">{averageRating}</span>
						</div>
					</div>
					<button
						onClick={() => setIsModalOpen(true)}
						className="flex items-center gap-2 p-2 hover:bg-violet-500/20 rounded-lg transition-colors text-white/60 hover:text-white"
					>
						<Plus size={18} />
					</button>
				</div>

				<div className="space-y-4">
					{experiences.map((exp) => (
						<div
							key={exp.id}
							className="pb-4 bg-black/20 rounded-lg p-4 last:pb-4 flex justify-between items-start"
						>
							<div className="flex-1">
								<h3 className="font-semibold text-white">{exp.title}</h3>
								<p className="text-sm text-white/60 mb-1">{exp.company}</p>
								<p className="text-xs text-white/40 mb-2">{exp.duration}</p>
								<p className="text-sm text-white/70">{exp.description}</p>
							</div>
							<button
								onClick={() => removeExperience(exp.id)}
								className="ml-4 p-2 hover:bg-violet-500/20 rounded-lg transition-colors text-white/60 hover:text-white"
							>
								<X size={16} />
							</button>
						</div>
					))}
				</div>
			</div>

			{/* Experience Modal */}
			<ExperienceModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onAddExperience={addExperience}
			/>
		</>
	)
}
