"use client"

import { useState } from "react"
import { Plus, X } from 'lucide-react'
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
			<div className="bg-card border border-border rounded-xl p-6">
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-xl font-bold text-foreground">Certifications</h2>
					<button
						onClick={() => setIsModalOpen(true)}
						className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-lg transition-colors text-muted-foreground hover:text-foreground"
					>
						<Plus size={18} />
					</button>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{certifications.map((cert) => (
						<div
							key={cert.id}
							className="p-4 bg-background border border-border rounded-lg hover:border-primary/50 transition-colors"
						>
							<div className="flex items-start justify-between mb-2">
								<h3 className="font-semibold text-foreground text-sm flex-1">
									{cert.name}
								</h3>
								<button
									onClick={() => removeCertification(cert.id)}
									className="ml-2 p-1 hover:bg-white/10 rounded transition-colors text-muted-foreground hover:text-foreground"
								>
									<X size={14} />
								</button>
							</div>
							<p className="text-xs text-muted-foreground mb-1">{cert.issuer}</p>
							<p className="text-xs text-muted-foreground">Issued: {cert.issueDate}</p>
							{cert.credentialUrl && (
								<a
									href={cert.credentialUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="text-xs text-primary hover:underline mt-2 inline-block"
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
