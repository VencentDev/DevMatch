"use client"

import { useState } from "react"
import { Pencil, X } from "lucide-react"
import SkillsModal from "./skills-modal"

interface Skill {
	id: string
	name: string
}

export default function SkillsSection() {
	const [skills, setSkills] = useState<Skill[]>([
		{ id: "1", name: "React" },
		{ id: "2", name: "TypeScript" },
		{ id: "3", name: "Node.js" },
		{ id: "4", name: "Next.js" },
		{ id: "5", name: "Tailwind CSS" },
	])
	const [isModalOpen, setIsModalOpen] = useState(false)

	const removeSkill = (id: string) => {
		setSkills(skills.filter((skill) => skill.id !== id))
	}

	const addSkill = (skillName: string) => {
		const newSkill: Skill = {
			id: Date.now().toString(),
			name: skillName,
		}
		setSkills([...skills, newSkill])
	}

	return (
		<>
			<div className="bg-black/40 border border-violet-500/20 rounded-lg p-6">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-xl font-bold text-white">Skills</h2>
					<button
						onClick={() => setIsModalOpen(true)}
						className="p-2 hover:bg-violet-500/20 rounded-lg transition-colors text-white/60 hover:text-white"
					>
						<Pencil size={18} />
					</button>
				</div>

				<div className="flex flex-wrap gap-2">
					{skills.map((skill) => (
						<div
							key={skill.id}
							className="flex items-center gap-2 bg-violet-600/20 border border-violet-500/50 rounded-full px-4 py-2 hover:bg-violet-600/30 transition-colors group"
						>
							<span className="text-sm font-medium text-white">
								{skill.name}
							</span>
							<button
								onClick={() => removeSkill(skill.id)}
								className="text-white/60 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
							>
								<X size={14} />
							</button>
						</div>
					))}
				</div>
			</div>

			{/* Skills Modal */}
			<SkillsModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onAddSkill={addSkill}
				existingSkills={skills}
			/>
		</>
	)
}
