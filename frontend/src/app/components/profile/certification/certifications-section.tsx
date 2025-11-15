"use client"

import { useState } from "react"
import { Plus, X, Star } from 'lucide-react'
import CertificationModal from "./certification-modal"

interface Certification {
	id: string
	name: string
	issuer: string
	issueDate: string
	credentialUrl?: string
}

export default function CertificationsSection() {
	const [certifications, setCertifications] = useState<Certification[]>([
		{
			id: "1",
			name: "AWS Certified Solutions Architect",
			issuer: "Amazon Web Services",
			issueDate: "2023",
		},
		{
			id: "2",
			name: "Google Cloud Professional",
			issuer: "Google Cloud",
			issueDate: "2022",
		},
	])
	const [isModalOpen, setIsModalOpen] = useState(false)
	const averageRating = 4.8

	const removeCertification = (id: string) => {
		setCertifications(certifications.filter((cert) => cert.id !== id))
	}

	const addCertification = (newCertification: Omit<Certification, "id">) => {
		const certification: Certification = {
			id: Date.now().toString(),
			...newCertification,
		}
		setCertifications([...certifications, certification])
	}

	return (
		<>
			<div className="bg-gradient-to-br from-violet-600/10 to-violet-600/5 rounded-lg p-6">
				<div className="flex items-center justify-between mb-6">
					<div className="flex items-center gap-2">
						<h2 className="text-xl font-bold text-white">Certifications</h2>
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

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{certifications.map((cert) => (
						<div
							key={cert.id}
							className="p-4 bg-black/20 rounded-lg hover:bg-black/30 transition-colors"
						>
							<div className="flex items-start justify-between mb-2">
								<h3 className="font-semibold text-white text-sm flex-1">
									{cert.name}
								</h3>
								<button
									onClick={() => removeCertification(cert.id)}
									className="ml-2 p-1 hover:bg-violet-500/20 rounded transition-colors text-white/60 hover:text-white"
								>
									<X size={14} />
								</button>
							</div>
							<p className="text-xs text-white/60 mb-1">{cert.issuer}</p>
							<p className="text-xs text-white/60">Issued: {cert.issueDate}</p>
							{cert.credentialUrl && (
								<a
									href={cert.credentialUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="text-xs text-violet-400 hover:text-violet-300 mt-2 inline-block"
								>
									View Credential
								</a>
							)}
						</div>
					))}
				</div>
			</div>

			{/* Certification Modal */}
			<CertificationModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onAddCertification={addCertification}
			/>
		</>
	)
}
