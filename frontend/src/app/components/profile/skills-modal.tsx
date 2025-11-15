"use client"

import { useState } from "react"
import { Plus, X } from 'lucide-react'

interface Skill {
	id: string
	name: string
}

interface SkillsModalProps {
	isOpen: boolean
	onClose: () => void
	onAddSkill: (skillName: string) => void
	existingSkills: Skill[]
}

export default function SkillsModal({
	isOpen,
	onClose,
	onAddSkill,
	existingSkills,
}: SkillsModalProps) {
	const [skillInput, setSkillInput] = useState("")
	const [tempSkills, setTempSkills] = useState<string[]>([])

	const addSkill = () => {
		if (
			skillInput.trim() &&
			!tempSkills.includes(skillInput.trim()) &&
			!existingSkills.some((s) => s.name === skillInput.trim())
		) {
			setTempSkills([...tempSkills, skillInput.trim()])
			setSkillInput("")
		}
	}

	const removeSkill = (index: number) => {
		setTempSkills(tempSkills.filter((_, i) => i !== index))
	}

	const handleSave = () => {
		tempSkills.forEach((skill) => onAddSkill(skill))
		setTempSkills([])
		setSkillInput("")
		onClose()
	}

	if (!isOpen) return null

	return (
		<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
			<div className="bg-black/95 border border-violet-500/20 rounded-lg p-8 max-w-md w-full mx-4">
				<div className="flex items-center justify-between mb-6">
					<h3 className="text-2xl font-bold text-white">Add Skills</h3>
					<button
						onClick={onClose}
						className="p-2 hover:bg-violet-500/20 rounded-lg transition-colors"
					>
						<X size={20} className="text-white/60" />
					</button>
				</div>

				<div className="space-y-4">
					{/* Skill Input */}
					<div className="flex gap-2">
						<input
							type="text"
							value={skillInput}
							onChange={(e) => setSkillInput(e.target.value)}
							onKeyPress={(e) => e.key === "Enter" && addSkill()}
							placeholder="Enter a skill and press Enter"
							className="flex-1 px-4 py-2 bg-black/60 border border-violet-500/20 rounded-lg focus:border-violet-500/50 focus:outline-none transition-colors text-white placeholder-white/40"
						/>
						<button
							onClick={addSkill}
							className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors flex items-center gap-2 font-medium"
						>
							<Plus size={16} />
						</button>
					</div>

					{/* Skills List */}
					{tempSkills.length > 0 && (
						<div className="space-y-2">
							<p className="text-sm text-white/60">Skills to add:</p>
							<div className="flex flex-wrap gap-2">
								{tempSkills.map((skill, index) => (
									<div
										key={index}
										className="flex items-center gap-2 bg-violet-600/20 border border-violet-500/50 rounded-full px-3 py-1.5"
									>
										<span className="text-sm text-white">{skill}</span>
										<button
											onClick={() => removeSkill(index)}
											className="hover:text-violet-400 transition-colors text-white/60"
										>
											<X size={14} />
										</button>
									</div>
								))}
							</div>
						</div>
					)}
				</div>

				{/* Action Buttons */}
				<div className="flex gap-3 mt-6 pt-6 border-t border-violet-500/20">
					<button
						onClick={handleSave}
						disabled={tempSkills.length === 0}
						className="flex-1 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
					>
						Add Skills
					</button>
					<button
						onClick={onClose}
						className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 border border-violet-500/20 rounded-lg transition-colors font-medium text-white/80"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	)
}
