"use client"

import { useState } from "react"
import { X } from 'lucide-react'

interface EducationModalProps {
	isOpen: boolean
	onClose: () => void
	onAddEducation: (education: {
		school: string
		degree: string
		field: string
		graduationYear: string
	}) => void
}

export default function EducationModal({
	isOpen,
	onClose,
	onAddEducation,
}: EducationModalProps) {
	const [formData, setFormData] = useState({
		school: "",
		degree: "",
		field: "",
		graduationYear: "",
	})

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleSave = () => {
		if (formData.school && formData.degree && formData.field) {
			onAddEducation(formData)
			setFormData({ school: "", degree: "", field: "", graduationYear: "" })
			onClose()
		}
	}

	if (!isOpen) return null

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
			<div className="bg-card border border-border rounded-xl p-8 max-w-md w-full mx-4">
				<div className="flex items-center justify-between mb-6">
					<h3 className="text-2xl font-bold text-foreground">Add Education</h3>
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
							School / University
						</label>
						<input
							type="text"
							name="school"
							value={formData.school}
							onChange={handleInputChange}
							placeholder="e.g., State University"
							className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:border-primary focus:outline-none transition-colors text-foreground placeholder-muted-foreground"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-foreground mb-2">
							Degree
						</label>
						<select
							name="degree"
							value={formData.degree}
							onChange={handleInputChange}
							className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:border-primary focus:outline-none transition-colors text-foreground"
						>
							<option value="">Select degree</option>
							<option value="Associate's">Associate's</option>
							<option value="Bachelor's">Bachelor's</option>
							<option value="Master's">Master's</option>
							<option value="PhD">PhD</option>
							<option value="Diploma">Diploma</option>
						</select>
					</div>

					<div>
						<label className="block text-sm font-medium text-foreground mb-2">
							Field of Study
						</label>
						<input
							type="text"
							name="field"
							value={formData.field}
							onChange={handleInputChange}
							placeholder="e.g., Computer Science"
							className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:border-primary focus:outline-none transition-colors text-foreground placeholder-muted-foreground"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-foreground mb-2">
							Graduation Year
						</label>
						<input
							type="text"
							name="graduationYear"
							value={formData.graduationYear}
							onChange={handleInputChange}
							placeholder="e.g., 2020"
							className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:border-primary focus:outline-none transition-colors text-foreground placeholder-muted-foreground"
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
