"use client"

import { useState } from "react"
import { Pencil, Plus, X, Star } from 'lucide-react'
import EducationModal from "./education-modal"

interface Education {
	id: string
	school: string
	degree: string
	field: string
	graduationYear: string
}

export default function EducationSection() {
	const [educations, setEducations] = useState<Education[]>([
		{
			id: "1",
			school: "State University",
			degree: "Bachelor's",
			field: "Computer Science",
			graduationYear: "2020",
		},
	])
	const [isModalOpen, setIsModalOpen] = useState(false)
	const averageRating = 4.9

	const removeEducation = (id: string) => {
		setEducations(educations.filter((edu) => edu.id !== id))
	}

	const addEducation = (newEducation: Omit<Education, "id">) => {
		const education: Education = {
			id: Date.now().toString(),
			...newEducation,
		}
		setEducations([...educations, education])
	}

	return (
		<>
			<div className="bg-gradient-to-br from-violet-600/10 to-violet-600/5 rounded-lg p-6">
				<div className="flex items-center justify-between mb-6">
					<div className="flex items-center gap-2">
						<h2 className="text-xl font-bold text-white">Education</h2>
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
					{educations.map((edu) => (
						<div
							key={edu.id}
							className="pb-4 bg-black/20 rounded-lg p-4 last:pb-4 flex justify-between items-start"
						>
							<div className="flex-1">
								<h3 className="font-semibold text-white">{edu.school}</h3>
								<p className="text-sm text-white/60 mb-1">
									{edu.degree} in {edu.field}
								</p>
								<p className="text-xs text-white/40">
									Graduated: {edu.graduationYear}
								</p>
							</div>
							<button
								onClick={() => removeEducation(edu.id)}
								className="ml-4 p-2 hover:bg-violet-500/20 rounded-lg transition-colors text-white/60 hover:text-white"
							>
								<X size={16} />
							</button>
						</div>
					))}
				</div>
			</div>

			{/* Education Modal */}
			<EducationModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onAddEducation={addEducation}
			/>
		</>
	)
}
