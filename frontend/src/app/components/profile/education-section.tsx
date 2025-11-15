"use client"

import { useState } from "react"
import { Pencil, Plus, X } from "lucide-react"
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
			<div className="bg-black/40 border border-violet-500/20 rounded-lg p-6">
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-xl font-bold text-white">Education</h2>
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
							className="pb-4 border-b border-violet-500/20 last:border-b-0 last:pb-0 flex justify-between items-start"
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
