"use client"

import { useState } from "react"
import { X } from 'lucide-react'

interface ExperienceModalProps {
	isOpen: boolean
	onClose: () => void
	onAddExperience: (experience: {
		title: string
		company: string
		duration: string
		description: string
	}) => void
}

export default function ExperienceModal({
	isOpen,
	onClose,
	onAddExperience,
}: ExperienceModalProps) {
	const [formData, setFormData] = useState({
		title: "",
		company: "",
		duration: "",
		description: "",
	})

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleSave = () => {
		if (formData.title && formData.company && formData.duration) {
			onAddExperience(formData)
			setFormData({ title: "", company: "", duration: "", description: "" })
			onClose()
		}
	}

	if (!isOpen) return null

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
			<div className="bg-card border border-border rounded-xl p-8 max-w-md w-full mx-4">
				<div className="flex items-center justify-between mb-6">
					<h3 className="text-2xl font-bold text-foreground">Add Experience</h3>
					<button
						onClick={onClose}
						className="p-2 hover:bg-white/10 rounded-lg transition-colors"
					>
						<X size={20} className="text-muted-foreground" />
					</button>
				</div>

				<div className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-foreground mb-2">
							Job Title
						</label>
						<input
							type="text"
							name="title"
							value={formData.title}
							onChange={handleInputChange}
							placeholder="e.g., Senior Developer"
							className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:border-primary focus:outline-none transition-colors text-foreground placeholder-muted-foreground"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-foreground mb-2">
							Company
						</label>
						<input
							type="text"
							name="company"
							value={formData.company}
							onChange={handleInputChange}
							placeholder="Company name"
							className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:border-primary focus:outline-none transition-colors text-foreground placeholder-muted-foreground"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-foreground mb-2">
							Duration
						</label>
						<input
							type="text"
							name="duration"
							value={formData.duration}
							onChange={handleInputChange}
							placeholder="e.g., 2022 - Present"
							className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:border-primary focus:outline-none transition-colors text-foreground placeholder-muted-foreground"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-foreground mb-2">
							Description
						</label>
						<textarea
							name="description"
							value={formData.description}
							onChange={handleInputChange}
							placeholder="Describe your role and achievements"
							className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:border-primary focus:outline-none transition-colors text-foreground placeholder-muted-foreground resize-none h-24"
						/>
					</div>
				</div>

				{/* Action Buttons */}
				<div className="flex gap-3 mt-6 pt-6 border-t border-border">
					<button
						onClick={handleSave}
						className="flex-1 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors font-medium"
					>
						Add
					</button>
					<button
						onClick={onClose}
						className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 border border-border rounded-lg transition-colors font-medium text-foreground"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	)
}
