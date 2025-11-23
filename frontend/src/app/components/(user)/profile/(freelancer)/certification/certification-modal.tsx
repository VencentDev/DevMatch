"use client"

import { useState } from "react"
import { X } from 'lucide-react'

interface CertificationModalProps {
	isOpen: boolean
	onClose: () => void
	onAddCertification: (certification: {
		name: string
		issuer: string
		issueDate: string
		credentialUrl?: string
	}) => void
}

export default function CertificationModal({
	isOpen,
	onClose,
	onAddCertification,
}: CertificationModalProps) {
	const [formData, setFormData] = useState({
		name: "",
		issuer: "",
		issueDate: "",
		credentialUrl: "",
	})

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleSave = () => {
		if (formData.name && formData.issuer && formData.issueDate) {
			onAddCertification({
				name: formData.name,
				issuer: formData.issuer,
				issueDate: formData.issueDate,
				credentialUrl: formData.credentialUrl || undefined,
			})
			setFormData({ name: "", issuer: "", issueDate: "", credentialUrl: "" })
			onClose()
		}
	}

	if (!isOpen) return null

	return (
		<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
			<div className="bg-black/95 border border-violet-500/20 rounded-lg p-8 max-w-md w-full mx-4">
				<div className="flex items-center justify-between mb-6">
					<h3 className="text-2xl font-bold text-white">Add Certification</h3>
					<button
						onClick={onClose}
						className="p-2 hover:bg-violet-500/20 rounded-lg transition-colors"
					>
						<X size={20} className="text-white/60" />
					</button>
				</div>

				<div className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-white mb-2">
							Certification Name
						</label>
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleInputChange}
							placeholder="e.g., AWS Certified Solutions Architect"
							className="w-full px-4 py-2 bg-black/60 border border-violet-500/20 rounded-lg focus:border-violet-500/50 focus:outline-none transition-colors text-white placeholder-white/40"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-white mb-2">
							Issuer
						</label>
						<input
							type="text"
							name="issuer"
							value={formData.issuer}
							onChange={handleInputChange}
							placeholder="e.g., Amazon Web Services"
							className="w-full px-4 py-2 bg-black/60 border border-violet-500/20 rounded-lg focus:border-violet-500/50 focus:outline-none transition-colors text-white placeholder-white/40"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-white mb-2">
							Issue Date
						</label>
						<input
							type="text"
							name="issueDate"
							value={formData.issueDate}
							onChange={handleInputChange}
							placeholder="e.g., 2023 or Jan 2023"
							className="w-full px-4 py-2 bg-black/60 border border-violet-500/20 rounded-lg focus:border-violet-500/50 focus:outline-none transition-colors text-white placeholder-white/40"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-white mb-2">
							Credential URL (Optional)
						</label>
						<input
							type="url"
							name="credentialUrl"
							value={formData.credentialUrl}
							onChange={handleInputChange}
							placeholder="https://..."
							className="w-full px-4 py-2 bg-black/60 border border-violet-500/20 rounded-lg focus:border-violet-500/50 focus:outline-none transition-colors text-white placeholder-white/40"
						/>
					</div>
				</div>

				{/* Action Buttons */}
				<div className="flex gap-3 mt-6 pt-6 border-t border-violet-500/20">
					<button
						onClick={handleSave}
						className="flex-1 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors font-medium"
					>
						Add
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
